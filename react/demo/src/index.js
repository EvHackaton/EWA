import React, { Component, useState } from "react";
import { render } from "react-dom";
import axios from 'axios';
import { ScanSettings, Barcode } from "scandit-sdk";
import { Button, ButtonToolbar, InputGroup, FormControl } from 'react-bootstrap';

import BarcodePicker from "../../src";
import { DisplayResults } from './DisplayResults';
import ecovadisLogo from './images/Ecovadis_logo.png';
import ewaLogo from './images/ewa_logo2.png';

const Demo = () => {
  const [barCode, setBarCode] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSearch = event => {
    const searchText = event.target.form[0].value;

    //https://ewa20191211060235.azurewebsites.net/api/name/milk

    axios(
      `https://ewa20191211060235.azurewebsites.net/api/name/${searchText}`,
    ).then(
        response => {
          setBarCode(response.data.code);
          setQueryResult(response.data)
          setIsError(false);
        },
        error => setIsError(true),
    );
  };

  return (
    <div className="Container">
      <div className="Header">
        <img className="Ewa" src={ewaLogo} />
      </div>
      <form>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Product name"
            aria-label="Product name"
          />
          <InputGroup.Append>
            <Button
              className="ActionButton"
              onClick={handleSearch}
              variant="outline-secondary"
            >
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </form>
      {!barCode && (
        <BarcodePicker
          playSoundOnScan={true}
          vibrateOnScan={true}
          scanSettings={
            new ScanSettings({
              enabledSymbologies: ["qr", "ean8", "ean13", "upca", "upce", "code128", "code39", "code93", "itf"],
              codeDuplicateFilter: 1000
            })
          }
          onScan={async scanResult => {
            const parsedBarCode = scanResult.barcodes[0].data;
            setBarCode(parsedBarCode);
            axios(
              `https://ewa20191211060235.azurewebsites.net/api/barcode/${parsedBarCode}`,
            ).then(
                response => {
                  setQueryResult(response.data);
                  setIsError(false);
                },
                error => setIsError(true),
            );
          }}
          onError={error => {
            setIsError(true);
          }}
        />
      )}
      {barCode && (
        <DisplayResults
          barCode={barCode}
          queryResult={queryResult}
          isError={isError}
        />
      )}
      {barCode && (
        <ButtonToolbar>
          {isError && (
            <Button
              className="ActionButtonBig"
              variant="primary"
              size="lg"
            >
              Add
            </Button>
          )}
          <Button
            className="ActionButtonBig"
            variant="primary"
            size="lg"
            onClick={() => setBarCode('')}
          >
            Scan again
          </Button>
        </ButtonToolbar>
      )}
    </div>
  );
}

render(<Demo />, document.querySelector("#demo"));

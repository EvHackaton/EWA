import React, { Component, useState } from "react";
import { render } from "react-dom";
import axios from 'axios';
import { ScanSettings, Barcode } from "scandit-sdk";

import BarcodePicker from "../../src";
import { DisplayResults } from './DisplayResults';
import ecovadisLogo from './images/Ecovadis_logo.png';
import ewaLogo from './images/ewa_logo.png';

const Demo = () => {
  const [barCode, setBarCode] = useState('');
  const [queryResult, setQueryResult] = useState(null);

  return (
    <div className="Container">
      <div className="Header">
        <img className="Ewa" src={ewaLogo} />
        <img className="Logo" src={ecovadisLogo} />        
      </div>
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
            const result = await axios(
              `https://ewaevhackaton.azurewebsites.net/api/barcode/${parsedBarCode}`,
            );
            setQueryResult(result.data);
          }}
          onError={error => {
            console.error(error.message);
          }}
        />
      )}
      {barCode && (
        <DisplayResults barCode={barCode} queryResult={queryResult} />
      )}
      {barCode && (
        <button onClick={() => setBarCode('')}>Scan again</button>
      )}
    </div>
  );
}

render(<Demo />, document.querySelector("#demo"));

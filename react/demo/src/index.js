import React, { Component, Fragment, useState } from "react";
import { render } from "react-dom";
import { ScanSettings, Barcode } from "scandit-sdk";

import BarcodePicker from "../../src";
import { DisplayResults } from './DisplayResults';

const Demo = () => {
  const [barCode, setBarCode] = useState('');

  return (
    <Fragment>
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
          onScan={scanResult => {
            console.log(scanResult); // eslint-disable-line
            setBarCode(scanResult.barcodes[0].data);
          }}
          onError={error => {
            console.error(error.message);
          }}
        />
      )}
      {barCode && (
        <DisplayResults barCode={barCode} />
      )}
      {barCode && (
        <button onClick={() => setBarCode('')}>Scan again</button>
      )}
    </Fragment>
  );
}

render(<Demo />, document.querySelector("#demo"));

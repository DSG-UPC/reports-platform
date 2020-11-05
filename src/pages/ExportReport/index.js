import React, { useState } from "react";
import { useFetchApi } from "hooks";
import { ProofsTable } from "components";
const IP = "localhost",
  PORT = "3001";

export default function ExportReport() {
  const [input, setInput] = useState("");
  const [deviceAddress, setDeviceAddress] = useState("");
  const url =
    deviceAddress && `http://${IP}:${PORT}/cache/devices/${deviceAddress}`;
  const fetch = useFetchApi(url);
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setDeviceAddress(input);
  };

  return (
    <>
      <h1>Export Report</h1>

      <form onSubmit={handleSubmit}>
        <input
          input={input}
          onChange={(evt) => setInput(evt.target.value)}
          placeholder="Enter a device address"
        ></input>
        <button type="submit">Submit</button>
      </form>
      {fetch.status === "fetched" && (
        <>
          <ProofsTable
            name="Funcion Proofs"
            data={fetch.data.device.proofs.functionproofs}
          />
          <ProofsTable
            name="Recycle Proofs"
            data={fetch.data.device.proofs.recycleproofs}
          />
          <ProofsTable
            name="Data Wipe Proofs"
            data={fetch.data.device.proofs.datawipeproofs}
          />
          <ProofsTable
            name="Reuse Proofs"
            data={fetch.data.device.proofs.reuseproofs}
          />
          <ProofsTable
            name="Transfer Proofs"
            data={fetch.data.device.proofs.transferproofs}
          />
        </>
      )}
      {fetch.status === "error" && <p>{fetch.error}</p>}
    </>
  );
}

// D6B11ddd08B7A96590833C499AA06C47C818A02F

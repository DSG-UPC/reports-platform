import React, { useState } from "react";
import { useFetch } from "hooks";
import { ProofsTable } from "components";
const IP = "localhost",
  PORT = "3000";

export default function ExportReport() {
  const [input, setInput] = useState("");
  const [deviceAddress, setDeviceAddress] = useState("");
  const url =
    deviceAddress && `http://${IP}:${PORT}/cache/devices/${deviceAddress}`;
  const { status, data } = useFetch(url);

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
      {status === "fetched" && (
        <>
          <h6>Function Proofs</h6>
          <ProofsTable data={data.device.proofs.functionproofs} />
          <h6>Recycle Proofs</h6>
          <ProofsTable data={data.device.proofs.recycleproofs} />
          <h6>Data Wipe Proofs</h6>
          <ProofsTable data={data.device.proofs.datawipeproofs} />
          <h6>Reuse Proofs</h6>
          <ProofsTable data={data.device.proofs.reuseproofs} />
          <h6>Transfer Proofs</h6>
          <ProofsTable data={data.device.proofs.transferproofs} />
        </>
      )}
    </>
  );
}

// D6B11ddd08B7A96590833C499AA06C47C818A02F

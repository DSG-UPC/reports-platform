import React, { useState } from "react";
import { useFetch } from "hooks";
import { ProofsTable } from "components";
const IP = "localhost",
  PORT = "3001";

export default function ExportReport() {
  const [input, setInput] = useState("");
  const [deviceAddress, setDeviceAddress] = useState("");
  const url =
    deviceAddress && `http://${IP}:${PORT}/cache/devices/${deviceAddress}`;
  const { state } = useFetch(url);

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
      {state.status === "idle" && <p>Idle</p>}
      {state.status === "fetched" && (
        <>
          <h6>Function Proofs</h6>
          <ProofsTable data={state.data.device.proofs.functionproofs} />
          <h6>Recycle Proofs</h6>
          <ProofsTable data={state.data.device.proofs.recycleproofs} />
          <h6>Data Wipe Proofs</h6>
          <ProofsTable data={state.data.device.proofs.datawipeproofs} />
          <h6>Reuse Proofs</h6>
          <ProofsTable data={state.data.device.proofs.reuseproofs} />
          <h6>Transfer Proofs</h6>
          <ProofsTable data={state.data.device.proofs.transferproofs} />
        </>
      )}
      {state.status === "error" && <p>{state.error}</p>}
    </>
  );
}

// D6B11ddd08B7A96590833C499AA06C47C818A02F

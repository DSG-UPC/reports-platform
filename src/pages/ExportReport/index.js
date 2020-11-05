import React, { useState } from "react";
import { useFetchApi } from "hooks";
import { ProofsTable } from "components";
import { TextField, Button, Box, Typography } from "@material-ui/core";
import ReactToPdf from "react-to-pdf"
const IP = "localhost",
  PORT = "3001";

export default function ExportReport() {
  const [input, setInput] = useState("");
  const [deviceAddress, setDeviceAddress] = useState("");
  const url =
    deviceAddress && `http://${IP}:${PORT}/cache/devices/${deviceAddress}`;
  const fetch = useFetchApi(url);
  const ref = React.createRef()
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setDeviceAddress(input);
  };

  return (
    <>
      <Typography variant="h4">Export Report</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          input={input}
          onChange={(evt) => setInput(evt.target.value)}
          id="outlined-basic"
          label="Device Address"
          variant="outlined"
          ></TextField>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      {fetch.status === "fetched" && (
        <>
          <ReactToPdf targetRef={ref}>
            {({ toPdf }) => (
              <button
                onClick={toPdf}
              >Export pdf report</button>
            )}
          </ReactToPdf>
          <div ref={ref}>

          <Box mt={3}>
            <ProofsTable
              name="Funcion Proofs"
              data={fetch.data.device.proofs.functionproofs}
              />
          </Box>
          <Box mt={3}>
            <ProofsTable
              name="Recycle Proofs"
              data={fetch.data.device.proofs.recycleproofs}
              />
          </Box>
          <Box mt={3}>
            <ProofsTable
              name="Data Wipe Proofs"
              data={fetch.data.device.proofs.datawipeproofs}
              />
          </Box>
          <Box mt={3}>
            <ProofsTable
              name="Reuse Proofs"
              data={fetch.data.device.proofs.reuseproofs}
              />
          </Box>
          <Box mt={3}>
            <ProofsTable
              name="Transfer Proofs"
              data={fetch.data.device.proofs.transferproofs}
              />
          </Box>
      </div>
        </>
      )}
      {fetch.status === "error" && <p>{fetch.error}</p>}
    </>
  );
}

// D6B11ddd08B7A96590833C499AA06C47C818A02F

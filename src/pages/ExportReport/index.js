import React, { useState } from "react";
import { useFetchApi } from "hooks";
import { ProofsTables, DeviceImpact } from "components";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
} from "@material-ui/core";
require("dotenv").config();

export default function ExportReport({ location }) {
  const params = new URLSearchParams(location.search);
  const [input, setInput] = useState(params.get("device") || "");
  const [deviceAddress, setDeviceAddress] = useState("");
  const url =
    deviceAddress &&
    `http://${process.env.REACT_APP_APIURL}:${process.env.REACT_APP_APIPORT}/cache/devices/${deviceAddress}`;
  const fetch = useFetchApi(url);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setDeviceAddress(input);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Export Report</Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            style={{ marginTop: "20px" }}
            fullWidth
            input={input}
            value={input}
            onChange={(evt) => setInput(evt.target.value)}
            id="outlined-basic"
            label="Device Address"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">0x</InputAdornment>
              ),
            }}
          ></TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Submit
          </Button>
        </form>
      </div>
      {fetch.status === "fetched" && (
        <>
          <Button fullWidth variant="outlined" style={{ marginTop: "20px" }}>
            Export pdf report
          </Button>
          <Box mt={3}>
            <DeviceImpact proofs={fetch.data.device.proofs} />
          </Box>
          <Box mt={3}>
            <ProofsTables data={fetch.data.device.proofs} />
          </Box>
        </>
      )}
      {fetch.status === "error" && <p>{fetch.error}</p>}
    </>
  );
}

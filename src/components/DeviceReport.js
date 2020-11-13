import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { useFetchApi } from "hooks";
import { DeviceImpact, ProofsTables } from "components";
import ethers from "ethers";
require("dotenv").config();

export default function DeviceReport() {
  const [input, setInput] = useState("");
  const [helperText, setHelperText] = useState("");
  const [address, setAddress] = useState("");
  const url =
    address &&
    `http://${process.env.REACT_APP_APIURL}:${process.env.REACT_APP_APIPORT}/cache/devices/${address}`;
  const fetch = useFetchApi(url);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (input === "") setHelperText("Required");
    else if (!ethers.utils.isAddress(`0x${input}`)) {
      setHelperText("Invalid address");
    } else {
      setHelperText("");
      setAddress(input);
    }
  };

  return (
    <>
      {fetch.status !== "fetched" && (
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              value={input}
              onChange={(evt) => setInput(evt.target.value)}
              label="Device Address"
              variant="outlined"
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">0x</InputAdornment>
                ),
              }}
              error={helperText !== ""}
              helperText={helperText}
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <Grid container spacing={3} direction="row-reverse">
              <Grid item xs={12} sm={3}>
                <Button type="submit" variant="contained" color="primary">
                  Search
                </Button>
              </Grid>
              {fetch.status === "error" && (
                <Grid item xs={12} sm>
                  {fetch.error}
                </Grid>
              )}
            </Grid>
          </div>
        </form>
      )}
      {fetch.status === "fetched" && (
        <>
          <DeviceImpact device={fetch.data.device} />
          <ProofsTables data={fetch.data.device.proofs} />
          <div style={{ marginTop: 20 }}>
            <Grid container spacing={3}>
              <Grid item>
                <Button variant="outlined">
                  Download Report
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setAddress("");
                  }}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </>
  );
}
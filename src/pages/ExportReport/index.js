import React, { useState } from "react";
import { useFetchApi } from "hooks";
import { ProofsTables, DeviceImpact, UserImpact } from "components";
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
  const [inputDevice, setInputDevice] = useState(params.get("device") || "");
  const [inputUser, setInputUser] = useState(params.get("user") || "");
  const [deviceAddress, setDeviceAddress] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const deviceurl =
    deviceAddress &&
    `http://${process.env.REACT_APP_APIURL}:${process.env.REACT_APP_APIPORT}/cache/devices/${deviceAddress}`;
  const fetchdevice = useFetchApi(deviceurl);
  const userurl =
    userAddress &&
    `http://${process.env.REACT_APP_APIURL}:${process.env.REACT_APP_APIPORT}/cache/users/${userAddress}`;
  const fetchuser = useFetchApi(userurl);

  const handleSubmitDevice = (evt) => {
    evt.preventDefault();
    setDeviceAddress(inputDevice);
  };

  const handleSubmitUser = (evt) => {
    evt.preventDefault();
    setUserAddress(inputUser);
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
        <form onSubmit={handleSubmitDevice} style={{ width: "100%" }}>
          <TextField
            style={{ marginTop: "20px" }}
            fullWidth
            input={inputDevice}
            value={inputDevice}
            onChange={(evt) => setInputDevice(evt.target.value)}
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
            Submit Device
          </Button>
        </form>
        <form onSubmit={handleSubmitUser} style={{ width: "100%" }}>
          <TextField
            style={{ marginTop: "20px" }}
            fullWidth
            input={inputUser}
            value={inputUser}
            onChange={(evt) => setInputUser(evt.target.value)}
            id="outlined-basic"
            label="User Address"
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
            Submit User
          </Button>
        </form>
      </div>
      {fetchdevice.status === "fetched" && (
        <>
          <Button fullWidth variant="outlined" style={{ marginTop: "20px" }}>
            Export pdf report
          </Button>
          <Box mt={3}>
            <DeviceImpact device={fetchdevice.data.device}/>
          </Box>
          <Box mt={3}>
            <ProofsTables data={fetchdevice.data.device.proofs} />
          </Box>
        </>
      )}
      {fetchdevice.status === "error" && <p>{fetchdevice.error}</p>}

      {fetchuser.status === "fetched" && (
        <>
          <Box mt={3}>
            <UserImpact devices={fetchuser.data.user.devices}/>
          </Box>
        </>
      )}
      {fetchuser.status === "error" && <p>{fetchuser.error}</p>}
    </>
  );
}

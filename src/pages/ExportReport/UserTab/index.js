import React, { useState } from "react"
import { useFetchApi } from "hooks"
import UserImpact from "./UserImpact"
import { Grid, TextField, Button, InputAdornment } from "@material-ui/core"
import ethers from "ethers"

export default function UserReport() {
  const [input, setInput] = useState("")
  const [helperText, setHelperText] = useState("")
  const [address, setAddress] = useState("")
  const url =
    address &&
    `http://${process.env.REACT_APP_APIURL}:${process.env.REACT_APP_APIPORT}/cache/users/${address}`
  const fetch = useFetchApi(url)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (input === "") setHelperText("Required")
    else if (!ethers.utils.isAddress(`0x${input}`)) {
      setHelperText("Invalid address")
    } else {
      setHelperText("")
      setAddress(input)
    }
  }

  return (
    <>
      {fetch.status !== "fetched" && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <TextField
                value={input}
                onChange={(evt) => setInput(evt.target.value)}
                label="Device Address"
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">0x</InputAdornment>
                  ),
                }}
                error={helperText !== ""}
                helperText={helperText}
              />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Search
              </Button>
            </Grid>
          </Grid>
          <div style={{ marginTop: 20 }}>
            {fetch.status === "error" && <Grid item>{fetch.error}</Grid>}
          </div>
        </form>
      )}
      {fetch.status === "fetched" && (
        <>
          <UserImpact devices={fetch.data.user.devices} />
          <div style={{ marginTop: 50 }}>
            <Grid container spacing={3}>
              <Grid item>
                <Button variant="contained">Download Report</Button>
              </Grid>
              <Grid item>
                <Button
                  // variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setAddress("")
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
  )
}

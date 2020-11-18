import React, { useState } from "react"
import ethers from "ethers"
import { Grid, TextField, Button, InputAdornment } from "@material-ui/core"
import { useFetchApi } from "hooks"
import { ProofsTables } from "components"
import DeviceImpact from "./DeviceImpact"
require("dotenv").config()

export default function DeviceReport({ location }) {
  const params = new URLSearchParams(location.search)
  const [input, setInput] = useState(params.get("device") || "")
  const [helperText, setHelperText] = useState("")
  const [isView, setIsView] = useState(true)
  const [url, setUrl] = useState("")
  const fetch = useFetchApi(url, isView ? "json" : "pdf")

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (!ethers.utils.isAddress(`0x${input}`)) {
      setHelperText("Invalid address")
    } else {
      setHelperText("")
      setIsView(true)
      setUrl(
        `http://${process.env.REACT_APP_APIURL}:${process.env.REACT_APP_APIPORT}/api/devices/${input}`
      )
    }
  }

  const handleSubmitPdf = () => {
    if (!ethers.utils.isAddress(`0x${input}`)) {
      setHelperText("Invalid address")
    } else {
      setHelperText("")
      setIsView(false)
      setUrl(
        `http://${process.env.REACT_APP_APIURL}:${process.env.REACT_APP_APIPORT}/api/pdfs/devices/${input}`
      )
    }
  }

  console.log(fetch)

  return (
    <>
      {fetch.status === ("idle" || "error") && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item>
              <TextField
                required
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
                View Online
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitPdf}
              >
                Download PDF
              </Button>
            </Grid>
          </Grid>
          <div style={{ marginTop: 20 }}>
            {fetch.status === "error" && <Grid item>{fetch.error}</Grid>}
          </div>
        </form>
      )}
      {fetch.status === "fetching" && <p>Fetching...</p>}
      {fetch.status === "fetched" && isView && (
        <>
          <DeviceImpact device={fetch.data.device} />
          <ProofsTables data={fetch.data.device.proofs} />
        </>
      )}
      {fetch.status === "fetched" && !isView && (
        <p>Your report has been generated</p>
      )}
      {fetch.status === "fetched" && (
        <div style={{ marginTop: 50 }}>
          <Grid container spacing={3}>
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setUrl("")
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  )
}

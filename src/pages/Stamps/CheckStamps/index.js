import { useState } from "react"
import UploadReport from "../CreateStamps/UploadReport"
import { Button, Typography, Box, Divider } from "@material-ui/core"
import { useFetchTriggered } from "hooks"

export default function CheckStamps() {
  const [hash, setHash] = useState("")
  const { fetch, trigger, reset } = useFetchTriggered()

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const options = {
      method: "POST",
      body: JSON.stringify({ hash }),
      headers: {
        "Content-Type": "application/json",
      },
    }
    trigger(`${process.env.REACT_APP_APIURL}/api/stamps/check`, options)
  }

  return (
    <>
      <Typography variant="h5">Check Stamps</Typography>
      <Box m={3}>
        <Typography variant="body1">
          This page allows users to check if a report has been previously
          stamped with a valid pre-paid token. Data will be requested to our
          server&apos;s API, which has permissioned access to the eReuse
          blockchain.
        </Typography>
      </Box>
      <Divider style={{ marginBottom: "30px" }} />

      {(fetch.status === "idle" || fetch.status === "error") && (
        <form onSubmit={handleSubmit}>
          <UploadReport hash={hash} setHash={setHash} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Submit
          </Button>
          {fetch.status === "error" && (
            <p style={{ fontSize: "20px", color: "red" }}>{fetch.error}</p>
          )}
        </form>
      )}
      {fetch.status === "fetching" && <p>fetching...</p>}
      {fetch.status === "fetched" && (
        <>
          <Typography variant="h6" color="primary">
            Stamps found:
          </Typography>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
            }}
          >
            {fetch.data.stamps.map((stamp) => (
              <li
                style={{
                  padding: "10px",
                }}
                key={stamp.date}
              >
                {stamp.date}
              </li>
            ))}
          </ul>
          <Button
            onClick={(evt) => {
              reset()
            }}
            color="secondary"
          >
            Reset
          </Button>
        </>
      )}
    </>
  )
}

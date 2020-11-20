import { useState } from "react"
import UploadReport from "../CreateStamps/UploadReport"
import {
  Button,
  List,
  Typography,
  ListItem,
  Box,
  Divider,
} from "@material-ui/core"
export default function CheckStamps() {
  const [hash, setHash] = useState("")
  const [events, setEvents] = useState([])
  const [error, setError] = useState("")
  const url = `http://${process.env.REACT_APP_APIURL}:${process.env.REACT_APP_APIPORT}/cache/stamp/check`

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ hash }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const res = await response.json()
    if (res.status === "success") setEvents(res.data.events)
    else setError("No stamps found for this document")
  }
  return (
    <div>
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
      {events.length === 0 && (
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
          {error && <p style={{ fontSize: "20px", color: "red" }}>{error}</p>}
        </form>
      )}
      {events.length !== 0 && (
        <div>
          <Typography variant="h6" color="primary">
            Stamps found:
          </Typography>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
            }}
          >
            {events.map((stamp) => (
              <li
                style={{
                  padding: "10px",
                }}
                key={stamp.i}
              >
                {stamp.date}
              </li>
            ))}
          </ul>
          <Button
            onClick={(evt) => {
              setEvents([])
            }}
            color="secondary"
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  )
}

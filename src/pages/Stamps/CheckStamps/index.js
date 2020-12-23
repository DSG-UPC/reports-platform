import { useState } from "react"
import UploadReport from "../CreateStamps/UploadReport"
import { Button, Typography } from "@material-ui/core"
import { useFetchTriggered } from "hooks"
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn"
import { Title } from "components"
import Alert from "@material-ui/lab/Alert"

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
      <Title
        text="Check Stamps"
        subtitle="
          This page allows users to check if a report has been previously
          stamped with a valid pre-paid token. Data will be requested to our
          server's API, which has permissioned access to the eReuse
          blockchain."
        icon={<AssignmentTurnedInIcon style={{ fontSize: "40px" }} />}
      />
      {fetch.status === "idle" && (
        <form onSubmit={handleSubmit}>
          <UploadReport hash={hash} setHash={setHash} />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Submit
            </Button>
          </div>
        </form>
      )}
      {fetch.status === "fetching" && <p>fetching...</p>}
      {fetch.status === "error" && (
        <div style={{ textAlign: "center" }}>
          <Alert style={{ marginBottom: "20px" }} severity="error">
            {fetch.error}
          </Alert>
          <Button
            onClick={(evt) => {
              reset()
            }}
            variant="outlined"
          >
            Reset
          </Button>
        </div>
      )}
      {fetch.status === "fetched" && (
        <div style={{ textAlign: "center" }}>
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
            variant="outlined"
          >
            Reset
          </Button>
        </div>
      )}
    </>
  )
}

import DoneIcon from "@material-ui/icons/Done"
import { Typography } from "@material-ui/core"

export default function ShowResult({ fetch }) {
  return (
    <>
      {fetch.status === "fetching" && <p>Please, wait a second...</p>}
      {fetch.status === "fetched" && (
        <>
          <DoneIcon style={{ color: "#66bb6a", fontSize: "70px" }} />
          <Typography>
            Your report was stamped.
            {fetch.data.emailSent === "success"
              ? " You will receive an email with the transaction details."
              : " However, we could not send you an email."}
          </Typography>
          <Typography style={{ overflowWrap: "break-word" }}>
            Hash: {fetch.data.hash}
          </Typography>
          <Typography>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.unixtimestamp.com/index.php"
            >
              Timestamp: {fetch.data.timestamp}
            </a>
          </Typography>
        </>
      )}
      {fetch.status === "error" && (
        <Typography>Something went wrong. Error: {fetch.error}</Typography>
      )}
    </>
  )
}

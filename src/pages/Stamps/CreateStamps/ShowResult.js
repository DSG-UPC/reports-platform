import DoneIcon from "@material-ui/icons/Done"
import { CircularProgress, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"

export default function ShowResult({ fetch }) {
  return (
    <>
      {fetch.status === "fetching" && <CircularProgress />}
      {fetch.status === "fetched" && (
        <>
          <DoneIcon style={{ color: "#66bb6a", fontSize: "70px" }} />
          <Typography variant="h6">
            Your report was stamped.
            {fetch.data.emailSent === "success" &&
              " You will receive an email with the transaction details."}
          </Typography>
          <Typography style={{ overflowWrap: "break-word", marginTop: "20px" }}>
            Hash: {fetch.data.hash}
          </Typography>
          <Typography>
            Timestamp:{" "}
            <a
              style={{ color: "#3F51B5" }}
              rel="noreferrer"
              target="_blank"
              href="https://www.unixtimestamp.com/index.php"
            >
              {fetch.data.timestamp}
            </a>
            {" " + new Date(fetch.data.timestamp * 1000)}
          </Typography>
          <Typography style={{ marginTop: "20px" }}>
            Check the stamp at{" "}
            <Link to="/stamps/check" style={{ color: "#3F51B5" }}>
              {process.env.REACT_APP_FRONTENDURL}/stamps/check
            </Link>
          </Typography>
        </>
      )}
      {fetch.status === "error" && (
        <Typography>Something went wrong. Error: {fetch.error}</Typography>
      )}
    </>
  )
}

import { PDFDownloadLink } from "@react-pdf/renderer"
import { SearchBox } from "components"
import { Typography, Box, Divider, makeStyles, Button } from "@material-ui/core"
import { useFetchTriggered } from "hooks"
import DeviceImpact from "./DeviceImpact"
import PDF from "../../pdf/device"
import ProofsTables from "./ProofsTables"

const APIURL = process.env.REACT_APP_APIURL

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    maxWidth: 400,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(4),
  },
}))

export default function Devices({ location }) {
  const { fetch, trigger } = useFetchTriggered()
  const classes = useStyles()

  const handleSubmit = (evt, input) => {
    evt.preventDefault()
    trigger(`${APIURL}/api/devices/${input}`)
  }

  return (
    <>
      <Box m={4}>
        <Typography variant="h5">Device Report</Typography>
        <br />
        <Typography variant="body1">
          The eReuse blockchain contains data about electronic devices.
        </Typography>
        <Typography variant="body1">
          Use this form to extract updated device reports.
        </Typography>
      </Box>
      <Divider />
      <Box m={4}>
        <div className={classes.searchContainer}>
          <SearchBox
            handleSubmit={handleSubmit}
            location={location}
            placeholder="Device Address"
          />
        </div>
      </Box>
      <Box m={4}>
        {fetch.status === "fetching" && <p>Fetching...</p>}
        {fetch.status === "error" && <p>{fetch.error}</p>}
        {fetch.status === "fetched" && (
          <>
            <Box m={4}>
              <DeviceImpact device={fetch.data.device} />
            </Box>
            <Box>
              <ProofsTables data={fetch.data.device.proofs} />
            </Box>
            <Box m={4}>
              {/* <PDFViewer width="100%" height="900px">
                <PDF device={fetch.data.device}></PDF>
              </PDFViewer> */}
              <PDFDownloadLink
                document={<PDF device={fetch.data.device} />}
                fileName={`device_report_${fetch.data.device.address}.pdf`}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="primary">
                  Download PDF
                </Button>
              </PDFDownloadLink>
            </Box>
          </>
        )}
      </Box>
    </>
  )
}

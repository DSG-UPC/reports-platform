import { Typography, Box, Divider, makeStyles, Button } from "@material-ui/core"
import { SearchBox } from "components"
import { useFetchApiTriggered } from "hooks"
import DeviceImpact from "./DeviceImpact"
import ProofsTables from "./ProofsTables"
import PDF from "../../PDF"
import { PDFDownloadLink } from "@react-pdf/renderer"

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    maxWidth: 400,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(4),
  },
}))

export default function Devices({ location }) {
  const { state: fetch, fetchData, resetState } = useFetchApiTriggered()

  const classes = useStyles()
  const handleSubmit = (evt, input) => {
    evt.preventDefault()
    fetchData(
      `http://${process.env.REACT_APP_APIURL}:${process.env.REACT_APP_APIPORT}/api/devices/${input}`
    )
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
            {/* <Box>
              <ProofsTables data={fetch.data.device.proofs} />
            </Box> */}
            <Box m={4}>
              <PDFDownloadLink
                document={<PDF title="Device Report" data={fetch.data} />}
                filename="devicereport.pdf"
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
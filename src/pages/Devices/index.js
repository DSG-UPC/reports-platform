import { PDFDownloadLink } from "@react-pdf/renderer"
import { SearchBox, Title } from "components"
import { Box, makeStyles, Button } from "@material-ui/core"
import { useFetchTriggered } from "hooks"
import DeviceImpact from "./DeviceImpact"
import PDF from "../../pdf/device"
import DevicesIcon from "@material-ui/icons/Devices"
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
      <Title
        text="Device Reports"
        subtitle="
          Use this form to extract updated device reports"
        icon={<DevicesIcon style={{ fontSize: "40px" }} />}
      />
      <Box m={4}>
        <div className={classes.searchContainer}>
          <SearchBox
            handleSubmit={handleSubmit}
            location={location}
            placeholder="Device Address"
          />
        </div>
      </Box>
      {fetch.status === "fetching" && <p>Fetching...</p>}
      {fetch.status === "error" && <p>{fetch.error}</p>}
      {fetch.status === "fetched" && (
        <>
          <DeviceImpact device={fetch.data.device} />
          <Box m={4} style={{ textAlign: "center" }}>
            {/* <PDFViewer width="100%" height="900px">
                <PDF device={fetch.data.device}></PDF>
              </PDFViewer> */}
            <PDFDownloadLink
              document={<PDF device={fetch.data.device} />}
              fileName={`device_report_${fetch.data.device.address}.pdf`}
              style={{ textDecoration: "none" }}
            >
              <Button variant="outlined" color="primary">
                Download PDF
              </Button>
            </PDFDownloadLink>
          </Box>
        </>
      )}
    </>
  )
}

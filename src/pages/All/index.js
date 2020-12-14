import { Typography, Box, Divider } from "@material-ui/core"
import { useFetch } from "hooks"
// import { PDFDownloadLink } from "@react-pdf/renderer"
import DLTImpact from "./DLTImpact"

const APIURL = process.env.REACT_APP_APIURL

export default function All() {
  const fetch = useFetch(`${APIURL}/api/devices/`)

  return (
    <>
      <Box m={4}>
        <Typography variant="h5">DLT Report</Typography>
        <br />
        <Typography variant="body1">
          The eReuse blockchain contains data about electronic devices!
        </Typography>
        <Typography variant="body1">
          Use this form to extract updated reports of the blockchain usage.
        </Typography>
      </Box>
      <Divider />
      <Box m={4}>
        {fetch.status === "error" && <p>{fetch.error}</p>}
        {fetch.status === "fetched" && (
          <>
            <Box m={4}>
              <DLTImpact data={fetch.data} />
            </Box>
            <Box m={4}>
              {/* <PDFDownloadLink
                fileName="dlt_report.pdf"
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="primary">
                  Download PDF
                </Button>
              </PDFDownloadLink> */}
            </Box>
          </>
        )}
      </Box>
    </>
  )
}

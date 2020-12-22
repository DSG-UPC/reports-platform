import { Box } from "@material-ui/core"
import { useFetch } from "hooks"
// import { PDFDownloadLink } from "@react-pdf/renderer"
import DLTImpact from "./DLTImpact"
import AssessmentIcon from "@material-ui/icons/Assessment"
import { Title } from "components"

const APIURL = process.env.REACT_APP_APIURL

export default function All() {
  const fetch = useFetch(`${APIURL}/api/devices/`)

  return (
    <>
      <Title
        text="DLT Reports"
        icon={<AssessmentIcon style={{ fontSize: "40px" }} />}
      />
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

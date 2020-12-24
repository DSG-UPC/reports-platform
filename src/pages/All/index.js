import { Box, Button } from "@material-ui/core"
import { useFetch } from "hooks"
import DLTImpact from "./DLTImpact"
import AssessmentIcon from "@material-ui/icons/Assessment"
import { Title } from "components"
import { PDFDownloadLink } from "@react-pdf/renderer"
import PDF from "pdf/all"

const APIURL = process.env.REACT_APP_APIURL

export default function All() {
  const fetch = useFetch(`${APIURL}/api/devices/`)

  return (
    <>
      <Title
        text="DLT Reports"
        icon={
          <AssessmentIcon
            style={{
              fontSize: "calc(30px + 1vw)",
            }}
          />
        }
      />
      {fetch.status === "fetching" && (
        <p style={{ textAlign: "center" }}>Fetching...</p>
      )}
      {fetch.status === "error" && (
        <p style={{ textAlign: "center" }}>{fetch.error}</p>
      )}
      {fetch.status === "fetched" && (
        <>
          <DLTImpact data={fetch.data} />
          <Box m={4} style={{ textAlign: "center" }}>
            <PDFDownloadLink
              document={<PDF all={fetch.data.all} />}
              fileName="dlt_report.pdf"
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

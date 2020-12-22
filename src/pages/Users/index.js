import { PDFDownloadLink } from "@react-pdf/renderer"
import { SearchBox, Title } from "components"
import { Box, makeStyles, Button } from "@material-ui/core"
import { useFetchTriggered } from "hooks"
import PDF from "pdf/user"
import UserImpact from "./UserImpact"
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd"

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
    trigger(`${APIURL}/api/users/${input}`)
  }

  return (
    <>
      <Title
        text="User Reports"
        subtitle="Use this form to extract updated user reports"
        icon={<AssignmentIndIcon style={{ fontSize: "40px" }} />}
      />
      <Box m={4}>
        <div className={classes.searchContainer}>
          <SearchBox
            handleSubmit={handleSubmit}
            location={location}
            placeholder="User Address"
          />
        </div>
      </Box>
      {fetch.status === "fetching" && <p>Fetching...</p>}
      {fetch.status === "error" && <p>{fetch.error}</p>}
      {fetch.status === "fetched" && (
        <>
          <UserImpact user={fetch.data.user} />

          <Box m={4} style={{ textAlign: "center" }}>
            <PDFDownloadLink
              document={<PDF user={fetch.data.user} />}
              fileName={`user_report_${fetch.data.user.address}.pdf`}
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

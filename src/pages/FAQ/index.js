import { Link } from "react-router-dom"
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  Typography,
  withStyles,
  AccordionDetails as MuiAccordionDetails,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import LabelImportantIcon from "@material-ui/icons/LabelImportant"
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined"
import { Title } from "components"

export default function FAQ() {
  return (
    <div>
      <Title
        text="FAQs"
        icon={
          <DescriptionOutlinedIcon
            style={{
              fontSize: "calc(30px + 1vw)",
            }}
          />
        }
      />

      <Question q="Where does the data come from?">
        <p>
          All the data available in this platform is originated in the DSG-UPC
          blockchain. This blockchain, which is based on Ethereum, was made to
          keep track of device data and allow traceability.
        </p>
        <p>
          Since it is a single-purposed blockchain, it was designed to be
          permissioned, meaning that only those with permission can access it.
        </p>
        <p>
          For this reason, an API was built in the middle. This platform queries
          this API, which returns blockchain data in a formatted and
          understandable way.
        </p>
      </Question>
      <Question important q="How is Device impact computed?">
        Computing the real impact of a device is a harsh and frequently
        unaccurate task. We avoid giving final indicators because they would be
        opinionated. Instead, we focus on giving enough device information so
        that anyone can compute indicators on their own.
        <ul>
          <li>
            <h3>Social benefits</h3>
            <p>
              When devices reach a point were they can no longer be used, they
              can be either thrown away or refurbished and reused. We say a
              device has had social benefits when, after being reused, it has
              had a larger life-time than it was originally expected.
            </p>
            <p>
              Proofs are data objects stored in our blockchain and linked to a
              particular device. In particular, reuse proofs give us information
              about when a device has been reused. Also, Function proofs store
              the device usage at a particular time.
            </p>
            <p>Then, if a device has the following proofs:</p>
            <ul>
              <li>Function proof 1 (300 hours of usage) + Reuse Proof</li>
              <li>Function proof 2 (400 hours of usage)</li>
            </ul>
            <p>
              We can tell a device has been used for 100 extra hours thanks to
              being reused.
            </p>
            <p></p>
          </li>
          <li>
            <h3>Environmental benefits</h3>
            <p>
              Life-cycle assessment (LCA) is a methodology for assessing
              environmental impacts associated with all the stages of the
              life-cycle of a device. This platform gives device hardware
              details to facilitate LCA.
            </p>
          </li>
        </ul>
      </Question>
      <Question important q="How is User impact computed?">
        From our point of view, a user&apos;s impact is the impact of every
        device he has participated on. Being a participant of a device means
        that, at some point in its lifetime, the user has generated a proof for
        that device. Thus, we understand that all users that contribute to a
        device will add that device&apos;s impact to their own user impact.
      </Question>
      <Question q="What is the stamping service?">
        <p>
          {
            "Stamping is the process of storing a document's digested hash in a blockchain."
          }
        </p>
        <p>
          {
            "Because blockchain's data is immutable, the document's hash gets linked with a particular timestamp. This hash can only be linked to the original content of the user's document."
          }
        </p>
        <p>
          {
            "As a result, users can proove that documents weren't changed by showing that the current hash is the same as the one stamped in the blockchain."
          }
        </p>
      </Question>
      <Question q="How can I stamp a document?">
        <p>
          Only documents directly provided by some specific external services
          can be stamped in our blockchain. To stamp a document, we will need
          the provider&apos;s <b>verification URL</b>, which will be used to
          check that the document can be stamped.
        </p>
        <p>
          You can stamp a document{" "}
          <Link
            style={{ color: "blue", textDecoration: "none" }}
            to="/stamps/create"
          >
            here
          </Link>
          .
        </p>
      </Question>
    </div>
  )
}

function Question({ q, important, children }) {
  return (
    <Accordion square>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {important && (
          <LabelImportantIcon
            fontSize="small"
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              marginRight: "10px",
              color: "rgba(0, 0, 0, 0.725)",
            }}
          />
        )}
        <Typography variant="h6">{q}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    textAlign: "left",
    display: "block",
  },
}))(MuiAccordionDetails)

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion)

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary)

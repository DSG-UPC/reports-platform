import { useState } from "react"
import {
  makeStyles,
  Step,
  Stepper,
  StepLabel,
  Typography,
  Button,
  Box,
  Divider,
} from "@material-ui/core"
import UploadReport from "./UploadReport"
import EnterURL from "./EnterURL"
import StampReport from "./StampReport"
import ShowResult from "./ShowResult"
import { useFetchTriggered } from "hooks"
require("dotenv").config()

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

function getSteps() {
  return ["Upload a Report", "Enter a Verification URL", "Stamp Report"]
}

export default function ValidateReport() {
  const [hash, setHash] = useState("")
  const [url, setUrl] = useState("")
  const [email, setEmail] = useState("")
  const [activeStep, setActiveStep] = useState(0)
  const classes = useStyles()
  const steps = getSteps()
  const { fetch, trigger } = useFetchTriggered()

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const options = {
      method: "POST",
      body: JSON.stringify({ hash, url, email }),
      headers: {
        "Content-Type": "application/json",
      },
    }
    trigger(`${process.env.REACT_APP_APIURL}/api/stamps/create`, options)
    handleNext()
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <UploadReport hash={hash} setHash={setHash} />
      case 1:
        return <EnterURL url={url} setUrl={setUrl} />
      case 2:
        return (
          <StampReport
            hash={hash}
            url={url}
            email={email}
            setEmail={setEmail}
            handleSubmit={handleSubmit}
          />
        )
      default:
        return "Unknown step"
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    setHash("")
    setUrl("")
  }

  return (
    <>
      <div>
        <Typography variant="h5">Create Stamps</Typography>
        <Box m={3}>
          <Typography variant="body1">
            Stamping is the process of storing the hash of a report in a
            blockchain. In this way the hash is permanently recorded on the
            blockchain and linked to a particular point in time. This hash can
            only be linked to the original content of the user&apos;s electronic
            file, thus also linking that file with the particular timestamp.
          </Typography>
        </Box>
        <Divider style={{ marginBottom: "30px" }} />
        <Stepper style={{ marginTop: "30px" }} activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        <div>
          <div
            style={{
              margin: "20px auto 50px auto",
              textAlign: "center",
            }}
          >
            {activeStep === steps.length ? (
              <ShowResult fetch={fetch} />
            ) : (
              getStepContent(activeStep)
            )}
          </div>
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >
              Back
            </Button>
            {activeStep < 2 ? (
              <Button
                disabled={
                  (activeStep === 0 && hash === "") ||
                  (activeStep === 1 && url === "")
                }
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleReset}
              >
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

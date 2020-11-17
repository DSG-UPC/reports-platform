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
import DoneIcon from "@material-ui/icons/Done"
import UploadReport from "./UploadReport"
import UploadToken from "./UploadToken"
import StampReport from "./StampReport"
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
  return ["Upload a Report", "Upload a Pre-Paid Token", "Stamp Report"]
}

export default function ValidateReport() {
  const [hash, setHash] = useState("")
  const [token, setToken] = useState("")
  const [activeStep, setActiveStep] = useState(0)
  const classes = useStyles()
  const steps = getSteps()

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <UploadReport hash={hash} setHash={setHash} />
      case 1:
        return <UploadToken token={token} setToken={setToken} />
      case 2:
        return <StampReport hash={hash} token={token} handleNext={handleNext} />
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
    setToken("")
  }

  return (
    <>
      <div
        style={{
          margin: "50px auto",
          textAlign: "center",
        }}
      >
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
          {activeStep === steps.length ? (
            <>
              <div
                style={{
                  maxWidth: "70%",
                  margin: "50px auto",
                  textAlign: "center",
                }}
              >
                <DoneIcon style={{ color: "#66bb6a", fontSize: "70px" }} />
                <Typography>
                  All steps completed, you will soon receive an email.
                </Typography>
              </div>
              <div>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            </>
          ) : (
            <div>
              <div
                style={{
                  maxWidth: "70%",
                  margin: "50px auto",
                  textAlign: "center",
                }}
              >
                {getStepContent(activeStep)}
              </div>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  disabled={
                    (activeStep === 0 && hash === "") ||
                    (activeStep === 1 && token === "")
                  }
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

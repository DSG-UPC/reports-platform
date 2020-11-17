import React, { useState } from "react"
import {
  Typography,
  Grid,
  Paper,
  makeStyles,
  Tabs,
  Tab,
} from "@material-ui/core"
import { TabPanel } from "components"
import UserTab from "./UserTab"
import DeviceTab from "./DeviceTab"
require("dotenv").config()

const useStyles = makeStyles({
  paperContainer: {
    marginTop: 50,
    padding: 30,
  },
})

export default function ExportReport({ location }) {
  const classes = useStyles()
  const [tabValue, setTabValue] = useState(0)

  return (
    <>
      <Paper elevation={2} className={classes.paperContainer}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Export DLT Reports</Typography>
            <hr />
            <Tabs
              value={tabValue}
              onChange={(evt, newValue) => {
                setTabValue(newValue)
              }}
            >
              <Tab label="Device" />
              <Tab label="User" />
              <Tab label="General Data" />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            <TabPanel value={tabValue} index={0}>
              <DeviceTab location={location} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <UserTab />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              General Data
            </TabPanel>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

import {
  List,
  ListItem,
  Typography,
  Paper,
  Box,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { getUserImpact } from "utils";
import { GridPaper } from "components";

function Data({ children }) {
  return (
    <Typography variant="body2" style={{ fontWeight: "bold" }}>
      {children}
    </Typography>
  );
}

const useStyles = makeStyles({
  relatedDevices: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderColor: "#FF2D55",
    borderLeftStyle: "solid",
    borderWidth: "5px",
  },
});

export default function UserImpact({ devices }) {
  const classes = useStyles();
  const { totalExtendedUsage } = getUserImpact(devices);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" color="primary">
            User Metrics
          </Typography>
        </Grid>
        <GridPaper>
          <Typography variant="caption">Total Extended Usage</Typography>
          <Data>{totalExtendedUsage} hours</Data>
        </GridPaper>
        <Grid item xs={12}>
          <Paper >

          <div className={classes.relatedDevices}>
            <Typography variant="body2">Related Devices</Typography>
            <List>
              {devices.map((device) => {
                return (
                  <ListItem key={device.address}>
                    <Typography component="div" variant="caption">
                      0x{device.address}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          </div>
              </Paper>
        </Grid>
      </Grid>
    </>
  );
}

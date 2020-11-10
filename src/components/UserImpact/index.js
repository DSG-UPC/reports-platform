import { List, ListItem, Typography, Paper, Box } from "@material-ui/core";
import React from "react";
import { getUserImpact } from "utils";

export default function UserImpact({ devices }) {
  const { totalExtendedUsage } = getUserImpact(devices);
  return (
    <>
      <Typography variant="h6">User Impact</Typography>
      <Box mt={3}>
        <Typography variant="subtitle1">Social impact</Typography>
        <ul>
          <li>Total Extended Usage: {totalExtendedUsage}</li>
        </ul>
      </Box>
      <Paper variant="outlined" square>
        <Box p={3}>
          <Typography variant="body1">Related Devices</Typography>
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
        </Box>
      </Paper>
    </>
  );
}

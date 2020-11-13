import React from "react";
import {Grid, Paper} from "@material-ui/core"

export default function GridPaper({ children }) {
  return (
    <Grid item xs={12} sm={6}>
      <Paper style={{ padding: 10 }}>{children}</Paper>
    </Grid>
  );
}
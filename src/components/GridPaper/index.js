import React from "react"
import { Box, Grid, Paper } from "@material-ui/core"

export default function GridPaper({ children }) {
  return (
    <Grid item xs={12} sm={6}>
      <Paper square elevation={1}>
        <Box p={1}>{children}</Box>
      </Paper>
    </Grid>
  )
}

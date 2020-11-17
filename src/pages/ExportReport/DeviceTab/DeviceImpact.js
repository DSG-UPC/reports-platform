import { Typography, Grid } from "@material-ui/core"
import React from "react"
import { getDeviceImpact } from "utils"
import { GridPaper } from "components"

function Data({ children }) {
  return (
    <Typography variant="body2" style={{ fontWeight: "bold" }}>
      {children}
    </Typography>
  )
}

export default function DeviceImpact({ device }) {
  const proofs = device.proofs
  const { firstUsage, extendedUsage, lastScore } = getDeviceImpact(device)

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" color="primary">
            Device Metrics
          </Typography>
        </Grid>
        <GridPaper>
          <Typography variant="caption">Base Usage</Typography>
          <Data>{firstUsage} hours</Data>
        </GridPaper>
        <GridPaper>
          <Typography variant="caption">Extended Life-Time</Typography>
          <Data>{extendedUsage} hours</Data>
        </GridPaper>
        <GridPaper>
          <Typography variant="caption">Last Score</Typography>
          <Data>{lastScore}/10</Data>
        </GridPaper>
        <GridPaper>
          <Typography variant="caption">Proofs</Typography>
          <Data># Function Proofs: {proofs.functionproofs.length}</Data>
          <Data># Recycle Proofs: {proofs.recycleproofs.length}</Data>
          <Data># Transfer Proofs: {proofs.transferproofs.length}</Data>
          <Data># Reuse Proofs: {proofs.reuseproofs.length}</Data>
          <Data># Data Wipe Proofs: {proofs.datawipeproofs.length}</Data>
        </GridPaper>
      </Grid>
    </>
  )
}

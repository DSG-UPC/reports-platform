import { Box, Typography } from "@material-ui/core";
import React from "react";
import {getDeviceImpact} from "utils"

export default function DeviceImpact({device}) {
  const proofs = device.proofs
  const {firstUsage, extendedUsage, lastScore} = getDeviceImpact(device)

  return (
    <>
      <Typography variant="h6">Device Metrics</Typography>
      <Box mt={3}>
        <Typography variant="subtitle1">Social impact</Typography>
        <ul>
          <li>Device Base Usage: {firstUsage} hours</li>
          <li>Device Extended Life-Time: {extendedUsage} hours</li>
        </ul>
      </Box>
      <Box mt={3}>
        <Typography variant="subtitle1">Score</Typography>
        <ul>
          <li>Device Last Score: {lastScore}/10</li>
        </ul>
      </Box>
      <Box mt={3}>
        <Typography variant="subtitle1">Proofs</Typography>
        <ul>
          <li># Function Proofs: {proofs.functionproofs.length}</li>
          <li># Recycle Proofs: {proofs.recycleproofs.length}</li>
          <li># Transfer Proofs: {proofs.transferproofs.length}</li>
          <li># Reuse Proofs: {proofs.reuseproofs.length}</li>
          <li># Data Wipe Proofs: {proofs.datawipeproofs.length}</li>
          <li>
            <b>
              # Total Proofs:{" "}
              {(() => {
                let count = 0;
                Object.keys(proofs).forEach((key) => {
                  count += proofs[key].length;
                });
                return count;
              })()}
            </b>
          </li>
        </ul>
      </Box>
    </>
  );
}

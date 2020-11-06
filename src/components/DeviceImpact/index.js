import { Box, Typography } from "@material-ui/core";
import React, { useEffect } from "react";

export default function DeviceImpact({ proofs }) {
  const firstUsage = proofs.functionproofs[0].diskusage;
  const extendedUsage =
    proofs.functionproofs[proofs.functionproofs.length - 1].diskusage -
    firstUsage;
  const lastScore =
    proofs.functionproofs[proofs.functionproofs.length - 1].score;

  return (
    <>
      <Typography variant="h6">Device Metrics</Typography>
      <Box mt={3}>
        <Typography variant="subtitle">Social impact</Typography>
        <ul>
          <li>Device Base Usage: {firstUsage} hours</li>
          <li>Device Extended Life-Time: {extendedUsage} hours</li>
        </ul>
      </Box>
      <Box mt={3}>
        <Typography variant="subtitle">Score</Typography>
        <ul>
          <li>Device Last Score: {lastScore}/10</li>
        </ul>
      </Box>
      <Box mt={3}>
        <Typography variant="subtitle">Proofs</Typography>
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

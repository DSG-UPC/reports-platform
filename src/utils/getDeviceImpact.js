export default function getDeviceImpact(device) {
  const functionproofs = device.proofs.functionproofs;
  const firstUsage = functionproofs[0]?.diskusage || 0
  const extendedUsage = 
    functionproofs[functionproofs.length - 1]?.diskusage - firstUsage || 0;
  const lastScore = functionproofs[functionproofs.length - 1]?.score || 0;

  return {
    firstUsage,
    extendedUsage,
    lastScore,
  };
}

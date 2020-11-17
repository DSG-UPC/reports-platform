export default function getShortHex(hex) {
  if (typeof hex !== "string" || hex.length <= 12) return
  const beginning = hex.substring(0, 4)
  const end = hex.substring(hex.length - 5, hex.length - 1)
  return beginning + "..." + end
}

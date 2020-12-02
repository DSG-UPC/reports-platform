import { TextField } from "@material-ui/core"
export default function EnterURL({ url, setUrl }) {
  return (
    <>
      <TextField
        label="Verification URL"
        onChange={(evt) => setUrl(evt.target.value)}
        required
        value={url}
      />
    </>
  )
}

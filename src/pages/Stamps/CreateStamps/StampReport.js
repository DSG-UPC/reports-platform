import { useState } from "react"
import {
  Paper,
  Typography,
  Box,
  Divider,
  TextField,
  Button,
} from "@material-ui/core"
import { getShortHex } from "utils"

export default function StampReport({
  hash,
  url,
  email,
  setEmail,
  handleSubmit,
}) {
  return (
    <Paper
      variant="outlined"
      style={{ padding: "30px", maxWidth: "300px", margin: "auto" }}
    >
      <Typography variant="h6">Stamping Details</Typography>
      <Typography variant="subtitle1">Hash: 0x{getShortHex(hash)}</Typography>
      <Typography variant="subtitle1">Verification URL: {url}</Typography>
      <Divider style={{ margin: "20px 0px" }} />
      <form onSubmit={handleSubmit}>
        <Box m={3}>
          <TextField
            required
            type="email"
            value={email}
            variant="outlined"
            size="small"
            onChange={(evt) => setEmail(evt.target.value)}
            label="Email Address"
          ></TextField>
        </Box>
        <Box m={3}>
          <Typography>
            You will receive an email with the stamping details.
          </Typography>
        </Box>
        <div>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            style={{ backgroundColor: "#66bb6a", color: "#fff" }}
          >
            Stamp
          </Button>
        </div>
      </form>
    </Paper>
  )
}

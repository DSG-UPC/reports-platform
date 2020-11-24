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

export default function StampReport({ hash, token, handleNext }) {
  const [email, setEmail] = useState("")
  const url = `http://${process.env.REACT_APP_APIURL}:${process.env.REACT_APP_APIPORT}/cache/stamp/create`

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ hash, token, email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const res = await response.json()
    if (res.status === "success") {
      handleNext()
    }
  }
  return (
    <Paper
      variant="outlined"
      style={{ padding: "30px", width: "300px", margin: "auto" }}
    >
      <Typography variant="h6">Stamping Details</Typography>
      <Typography variant="subtitle1">Hash: 0x{getShortHex(hash)}</Typography>
      <Typography variant="subtitle1">Token: 0x{getShortHex(token)}</Typography>
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

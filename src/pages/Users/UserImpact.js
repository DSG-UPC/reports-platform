import {
  List,
  ListItem,
  Typography,
  Paper,
  Grid,
  makeStyles,
} from "@material-ui/core"
import React from "react"
import { getUserImpact } from "utils"
import { GridPaper } from "components"
import { Link } from "react-router-dom"
import "./styles.css"

function Data({ children }) {
  return (
    <Typography variant="body2" style={{ fontWeight: "bold" }}>
      {children}
    </Typography>
  )
}

const useStyles = makeStyles({
  relatedDevices: {
    textAlign: "left",
    padding: "20px 20px 10px 20px",
    maxWidth: 500,
    margin: "10px auto",
    backgroundColor: "#FFFFFF",
    borderColor: "#FF2D55",
    borderLeftStyle: "solid",
    borderWidth: "5px",
  },
  addressLink: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
})

export default function UserImpact({ user }) {
  const classes = useStyles()
  return (
    <>
      <Typography variant="h6">Social Impact</Typography>
      <ul className="metrics-list">
        <li>
          Total Extended Life-Time: {user.impact.totalExtendedUsage} hours
        </li>
      </ul>
      <Paper elevation={4} className={classes.relatedDevices}>
        <Typography variant="body2">Related Devices</Typography>
        <List>
          {user.devices.map((device) => {
            return (
              <ListItem key={device.address}>
                <Typography
                  component="div"
                  variant="caption"
                  color="primary"
                  className={classes.addressLink}
                >
                  <Link
                    to={`/devices?search=${device.address}`}
                    style={{
                      color: "inherit",
                      textDecoration: "inherit",
                    }}
                  >
                    0x{device.address}
                  </Link>
                </Typography>
              </ListItem>
            )
          })}
        </List>
      </Paper>
    </>
  )
}

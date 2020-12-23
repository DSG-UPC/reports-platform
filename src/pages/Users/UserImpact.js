import {
  List,
  ListItem,
  Typography,
  Paper,
  makeStyles,
} from "@material-ui/core"
import React from "react"
import { Link } from "react-router-dom"

const useStyles = makeStyles({
  title: {
    marginTop: "30px",
  },
  report: {
    marginTop: "5%",
    maxWidth: 600,
    margin: "auto",
    padding: "40px",
    overflowX: "auto",
  },
  relatedDevices: {
    textAlign: "left",
    padding: "20px 20px 10px 20px",
    maxWidth: 500,
    margin: "10px auto",
    backgroundColor: "#FFFFFF",
    borderColor: "#FF2D55",
    borderLeftStyle: "solid",
    borderWidth: "5px",
    overflow: "hidden",
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
    <Paper variant="outlined" square className={classes.report}>
      <Typography variant="h5">Social Impact</Typography>
      <List>
        <ListItem>
          Total Extended Lifetime: {user.impact.totalExtendedUsage} hours
        </ListItem>
      </List>
      <Typography variant="h5" className={classes.title}>
        Related Devices
      </Typography>
      <List>
        {user.devices.map((device) => {
          return (
            <ListItem key={device.address}>
              <Typography
                component="div"
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
  )
}

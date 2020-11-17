import React from "react"
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function NavBar() {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}></Typography>
        <Button color="inherit">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
        </Button>
        <Button color="inherit">
          <Link
            to="/create-stamps"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Create Stamps
          </Link>
        </Button>
        <Button color="inherit">
          <Link
            to="/check-stamps"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Check Stamps
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

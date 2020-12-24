import React, { useState } from "react"
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
  Button,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import { NavLink, useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: "calc(15px + .5vw)",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  activelink: {
    color: "#1976d2",
  },
  listItem: {
    backgroundColor: "inherit",
  },
}))

function LinkListItem({ to, text, handleDrawerClose }) {
  const classes = useStyles()
  return (
    <NavLink
      to={to}
      activeClassName={classes.activelink}
      className={classes.link}
    >
      <ListItem
        className={classes.listItem}
        button
        onClick={() => {
          handleDrawerClose()
        }}
      >
        <ListItemText primary={text} />
      </ListItem>
    </NavLink>
  )
}

export default function NavBar() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const history = useHistory()
  const handleFAQClick = () => {
    history.push("/faq")
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={handleDrawerOpen}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title}>
            eReuse Reports Platform
          </Typography>
          <Button color="inherit" size="large" onClick={handleFAQClick}>
            FAQ
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
        <List style={{ minWidth: "200px" }}>
          <ListSubheader>
            <Typography variant="h5">eReuse</Typography>
          </ListSubheader>
          <Divider />
          <ListSubheader>Reports</ListSubheader>
          <LinkListItem
            handleDrawerClose={handleDrawerClose}
            to="/devices"
            text="Devices"
          />
          <LinkListItem
            handleDrawerClose={handleDrawerClose}
            to="/users"
            text="Users"
          />
          <LinkListItem
            handleDrawerClose={handleDrawerClose}
            to="/all"
            text="All Data"
          />
          <Divider />
          <ListSubheader>Stamps</ListSubheader>
          <LinkListItem
            handleDrawerClose={handleDrawerClose}
            to="/stamps/create"
            text="Create"
          />
          <LinkListItem
            handleDrawerClose={handleDrawerClose}
            to="/stamps/check"
            text="Check"
          />
        </List>
      </Drawer>
    </>
  )
}

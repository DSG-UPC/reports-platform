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
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import { NavLink } from "react-router-dom"

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
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  activelink: {
    backgroundColor: "#ffc7bd",
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
          <Typography variant="h6" className={classes.title}>
            eReuse Reports Platform
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
        <List style={{ minWidth: "150px" }}>
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

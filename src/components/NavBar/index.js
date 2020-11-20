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

function LinkListItem({ to, text, handleDrawerClose }) {
  return (
    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
      <ListItem
        button
        onClick={() => {
          handleDrawerClose()
        }}
      >
        <ListItemText primary={text} />
      </ListItem>
    </Link>
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

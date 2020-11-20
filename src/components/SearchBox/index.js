import React, { useState } from "react"
import {
  Paper,
  IconButton,
  InputBase,
  InputAdornment,
  makeStyles,
} from "@material-ui/core"

import SearchIcon from "@material-ui/icons/Search"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}))

export default function SearchBox({
  handleSubmit,
  location,
  placeholder = "Address",
}) {
  const params = new URLSearchParams(location.search)
  const classes = useStyles()
  const [input, setInput] = useState(params.get("search") || "")
  return (
    <Paper
      component="form"
      onSubmit={(evt) => {
        handleSubmit(evt, input)
      }}
      className={classes.root}
    >
      <InputBase
        value={input}
        onChange={(evt) => {
          setInput(evt.target.value)
        }}
        required
        placeholder={placeholder}
        startAdornment={<InputAdornment position="start">0x</InputAdornment>}
        autoFocus
        className={classes.input}
      />
      <IconButton type="submit" className={classes.iconButton}>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

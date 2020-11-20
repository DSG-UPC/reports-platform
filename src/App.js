// import logo from "./logo.svg";
import "./App.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import {
  CreateStamps,
  CheckStamps,
  Blocks,
  Devices,
  Users,
  All,
  ExportReport,
} from "pages"
import { Container } from "@material-ui/core"
import { NavBar } from "components"

function App() {
  return (
    <Router>
      <NavBar />
      <Container maxWidth="md" className="main">
        <Switch>
          <Route exact path="/" component={ExportReport} />
          <Route exact path="/devices" component={Devices} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/all" component={All} />
          <Route exact path="/stamps/create" component={CreateStamps} />
          <Route exact path="/stamps/check" component={CheckStamps} />
          <Route path="/b/:blocknum" component={Blocks} />
        </Switch>
      </Container>
    </Router>
  )
}

export default App

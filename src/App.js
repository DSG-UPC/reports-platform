// import logo from "./logo.svg";
import "./App.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Container } from "@material-ui/core"
import { CreateStamps, CheckStamps, Devices, Users, All, FAQ } from "pages"
import { NavBar } from "components"

function App() {
  return (
    <Router>
      <NavBar />
      <Container maxWidth="md" className="main">
        <Switch>
          <Route path="/devices" component={Devices} />
          <Route path="/users" component={Users} />
          <Route path="/all" component={All} />
          <Route path="/faq" component={FAQ} />
          <Route path="/stamps/create" component={CreateStamps} />
          <Route path="/stamps/check" component={CheckStamps} />
          <Route path="/" component={Devices} />
        </Switch>
      </Container>
    </Router>
  )
}

export default App

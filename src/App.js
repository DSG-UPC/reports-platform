// import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home, ExportReport, Stamps, Blocks } from "pages";
import { Container } from "@material-ui/core";
import { NavBar } from "components";

function App() {
  if (typeof web3 === 'undefined') return <div>This webapp needs metamask chrome extension installed in order to work</div>

  return (
    <Router>
      <NavBar></NavBar>
      <Container maxWidth="sm">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/export" component={ExportReport} />
          <Route path="/stamps" component={Stamps} />
          <Route path="/b/:blocknum" component={Blocks} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;

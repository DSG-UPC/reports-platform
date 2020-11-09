// import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { Home, ExportReport, Stamps, Blocks } from "pages";
import { Container, AppBar, Toolbar, Typography } from "@material-ui/core";

function App() {
  if (typeof web3 === 'undefined') return <div>This webapp needs metamask chrome extension installed in order to work</div>

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography color="initial" variant="h6">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Home
            </Link>
          </Typography>
          <Typography color="initial" variant="h6">
            <Link
              to="/export"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Export
            </Link>
          </Typography>
          <Typography color="initial" variant="h6">
            <Link
              to="/stamps"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Stamps
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
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

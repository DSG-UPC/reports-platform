// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { Home, ExportReport, ValidateReport } from "pages";

function App() {
  return (
    <div className="App">
      <section className="App-content">
        <Router>
          <Link to="/" className="App-link">
            Home
          </Link>
          <Link to="/export" className="App-link">
            Export
          </Link>
          <Link to="/validate" className="App-link">
            Validate
          </Link>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/export" component={ExportReport} />
            <Route path="/validate" component={ValidateReport} />
          </Switch>
        </Router>
      </section>
    </div>
  );
}

export default App;

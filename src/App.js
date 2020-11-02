// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { Home, CreateReport, ValidateReport } from "pages";

function App() {
  return (
    <div className="App">
      <section className="App-content">
        <Router>
          <Link to="/" className="App-link">
            Home
          </Link>
          <Link to="/create" className="App-link">
            Create
          </Link>
          <Link to="/validate" className="App-link">
            Validate
          </Link>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/create" component={CreateReport} />
            <Route path="/validate" component={ValidateReport} />
          </Switch>
        </Router>
      </section>
    </div>
  );
}

export default App;

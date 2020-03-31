import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Navbar from "./Share/Navbar";
import Landing from "./Share/Landing";
import Footer from "./Share/Footer";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;

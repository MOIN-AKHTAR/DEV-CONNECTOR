import React from "react";
import Navbar from "./Share/Navbar";
import Landing from "./Share/Landing";
import Footer from "./Share/Footer";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./App.css";

function App() {
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

export default App;

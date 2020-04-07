import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Navbar from "./Share/Navbar";
import Landing from "./Share/Landing";
import Footer from "./Share/Footer";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import DashBoard from "./Components/DashBoard/DashBoard";
import ProfileList from "./Components/DashBoard/ProfileList";
import AddEducation from "./Components/Profile/AddEducation";
import AddExperience from "./Components/Profile/AddExperience";
import EditProfile from "./Components/Profile/Editprofile";
import Profile from "./Components/Profile/Profile";
import ProfileByHandler from "./Components/Profile/Specific_User_Profile/Profile";
import Post from "./Components/Posts/Post";
import SinglePost from "./Components/Posts/SinglePost/Post";
import PrivateRoute from "./Components/Others/PrivateRoute";
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
          <Route path="/profile-list" component={ProfileList} />
          <PrivateRoute path="/feed" component={Post} />
          <PrivateRoute path="/dashboard" component={DashBoard} />
          <PrivateRoute path="/create-profile" component={Profile} />
          <PrivateRoute path="/edit-profile" component={EditProfile} />
          <PrivateRoute path="/add-experience" component={AddExperience} />
          <PrivateRoute path="/add-education" component={AddEducation} />
          <PrivateRoute path="/post/:id" component={SinglePost} />
          <Route path="/profile/:handle" component={ProfileByHandler} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./Utils/setAuthToken";
import { setCurrentUser } from "./Redux/Action/LoginUser";
import { Logout } from "./Redux/Action/LogOut";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
// Keeping User LoggedIn Even We Hard Refresh
if (localStorage.jwt_token) {
  // Decoding/Extracting Info From Token
  const User = jwt_decode(localStorage.jwt_token);
  setAuthToken(localStorage.jwt_token);
  Store.dispatch(setCurrentUser(User));
  //  If Token Get Expired Then
  const CurrentTime = Date.now() / 1000;

  if (User.exp < CurrentTime) {
    Store.dispatch(Logout());
    window.location.href = "/login";
  }
}
ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
if (module.hot) {
  module.hot.accept();
}
serviceWorker.unregister();

import Axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_ERROR
} from "../Types/ActionType";

export const createProfile = (data, history) => Dispatch => {
  Axios.post("/api/profile", data)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      Dispatch({
        type: GET_ERROR,
        Payload: err.response.data.error
      });
    });
};

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  Axios.get("/api/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        Payload: res.data.Profile ? res.data.Profile : res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        Payload: {}
      });
    });
};

export const deleteAccount = () => Dispatch => {
  if (window.confirm("Do You Want To Delete Account?")) {
    Axios.delete("/api/profile")
      .then(res => {
        Dispatch({
          type: SET_CURRENT_USER,
          Payload: {}
        });
        Dispatch(clearCurrentProfile());
      })
      .catch(err => {
        Dispatch({
          type: GET_ERROR,
          Payload: err.response.data.err
        });
      });
  }
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

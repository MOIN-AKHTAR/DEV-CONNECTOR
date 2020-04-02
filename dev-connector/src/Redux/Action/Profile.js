import Axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
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
  Axios.get("/api/profile/")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        Payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        Payload: {}
      });
    });
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

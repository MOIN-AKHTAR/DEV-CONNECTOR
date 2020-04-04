import Axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_ERROR,
} from "../Types/ActionType";

export const createProfile = (data, history) => (Dispatch) => {
  Axios.post("/api/profile", data)
    .then((res) => {
      history.push("/dashboard");
    })
    .catch((err) => {
      Dispatch({
        type: GET_ERROR,
        Payload: err.response.data.error,
      });
    });
};

export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  Axios.get("/api/profile")
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        Payload: res.data.Profile ? res.data.Profile : res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        Payload: {},
      });
    });
};

export const deleteAccount = () => (Dispatch) => {
  if (window.confirm("Do You Want To Delete Account?")) {
    Axios.delete("/api/profile")
      .then((res) => {
        Dispatch({
          type: SET_CURRENT_USER,
          Payload: {},
        });
        Dispatch(clearCurrentProfile());
      })
      .catch((err) => {
        Dispatch({
          type: GET_ERROR,
          Payload: err.response.data.err,
        });
      });
  }
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

export const addExperience = (expData, history) => (Dispatch) => {
  Axios.post("/api/profile/experience", expData)
    .then((res) => {
      history.push("/dashboard");
    })
    .catch((err) => {
      Dispatch({
        type: GET_ERROR,
        Payload: err.response.data.error,
      });
    });
};

export const addEducation = (eduData, history) => (Dispatch) => {
  Axios.post("/api/profile/education", eduData)
    .then((res) => {
      history.push("/dashboard");
    })
    .catch((err) => {
      Dispatch({
        type: GET_ERROR,
        Payload: err.response.data.error,
      });
    });
};

export const deleteExperience = (exp_Id) => (Dispatch) => {
  Axios.delete("/api/profile/experience/" + exp_Id)
    .then((res) => {
      Dispatch({
        type: GET_PROFILE,
        Payload: res.data.Profile,
      });
    })
    .catch((err) => {
      Dispatch({
        type: GET_ERROR,
        Payload: err.response.data.error,
      });
    });
};

export const deleteEducation = (edu_Id) => (Dispatch) => {
  Axios.delete("/api/profile/education/" + edu_Id)
    .then((res) => {
      Dispatch({
        type: GET_PROFILE,
        Payload: res.data.Profile,
      });
    })
    .catch((err) => {
      Dispatch({
        type: GET_ERROR,
        Payload: err.response.data.error,
      });
    });
};

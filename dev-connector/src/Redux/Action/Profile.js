import Axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_PROFILES,
  GET_ERROR,
} from "../Types/ActionType";
import { clearError } from "./Posts";

// Craete Profile With This data
export const createProfile = (data, history) => (Dispatch) => {
  Dispatch(clearError());
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

// Get Currently LoggedIn User's Profile
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

// Delete Account Of Currently Loggedin User
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

// Loading Profile Please Wait....
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// Clear Currently LoggIn Users Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

// Add Experience with expData
export const addExperience = (expData, history) => (Dispatch) => {
  Dispatch(clearError());
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

// Add Education With eduData
export const addEducation = (eduData, history) => (Dispatch) => {
  Dispatch(clearError());
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

// Delete Experience Which Have exp_Id
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

// Delete  Eduaction Which Have edu_Id
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

// Get All Users Profile
export const getProfiles = () => (Dispatch) => {
  Axios.get("/api/profile/all/")
    .then((res) => {
      Dispatch({
        type: GET_PROFILES,
        Payload: res.data.Profiles,
      });
    })
    .catch((err) => {
      Dispatch({
        type: GET_PROFILES,
        Payload: null,
      });
    });
};

// Get Profile By Their Specified Handler
export const getProfileByHandle = (handle) => (dispatch) => {
  dispatch(setProfileLoading());
  Axios.get(`/api/profile/handle/${handle}`)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        Payload: res.data.Profile ? res.data.Profile : res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        Payload: null,
      });
    });
};

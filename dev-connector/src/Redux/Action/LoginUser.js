import Axios from "axios";
import { GET_ERROR, SET_CURRENT_USER } from "../Types/ActionType";
import { setAuthToken } from "../../Utils/setAuthToken";
import JWT_Decode from "jwt-decode";
export const loginUser = Data => Dispatch => {
  Axios.post("/api/user/login", Data)
    .then(res => {
      // Destructuring
      const { Token } = res.data;
      //Once Get Response Save To LocalStorage
      localStorage.setItem("jwt_token", Token);
      //Set Token To Auth Header
      setAuthToken(Token);
      //Decode Data Of User From Token
      const Decode = JWT_Decode(Token);
      Dispatch(setCurrentUser(Decode));
    })
    .catch(err => {
      Dispatch({
        type: GET_ERROR,
        Payload: err.response.data.error
      });
    });
};

export const setCurrentUser = decode => {
  return {
    type: SET_CURRENT_USER,
    Payload: decode
  };
};

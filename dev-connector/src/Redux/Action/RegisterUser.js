import { GET_ERROR } from "../Types/ActionType";
import { clearError } from "./Posts";
import Axios from "axios";

export const RegisterUserAction = (Data, history) => (Dispatch) => {
  Dispatch(clearError());
  Axios.post("/api/user/register", Data)
    // If Signup Successfully Just Take To Login Page
    .then((res) => history.push("/login"))
    .catch((err) =>
      // If Anything Goes Wrong Show Errors
      Dispatch({
        type: GET_ERROR,
        Payload: err.response.data.error,
      })
    );
};

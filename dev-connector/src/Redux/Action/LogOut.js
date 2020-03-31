import { setAuthToken } from "../../Utils/setAuthToken";
import { setCurrentUser } from "../Action/LoginUser";

export const Logout = () => Dispatch => {
  // Remove Token From LocalStorage
  localStorage.removeItem("jwt_token");
  // Removing/Deleing Default Authorization Header
  setAuthToken(false);
  //   Setting Current User To None-
  Dispatch(setCurrentUser({}));
};

import { setAuthToken } from "../../Utils/setAuthToken";
import { clearError } from "./Posts";
import { setCurrentUser } from "../Action/LoginUser";

export const Logout = () => (Dispatch) => {
  Dispatch(clearError());
  // Remove Token From LocalStorage
  localStorage.removeItem("jwt_token");
  // Removing/Deleing Default Authorization Header
  setAuthToken(false);
  //   Setting Current User To None-
  Dispatch(setCurrentUser({}));
};

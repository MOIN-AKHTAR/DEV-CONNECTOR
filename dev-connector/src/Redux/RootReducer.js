import { combineReducers } from "redux";
import { AuthReducer } from "./Reducer/AuthReducer";
import { ErrorReducer } from "./Reducer/ErrorReducer";
export default combineReducers({
  auth: AuthReducer,
  error: ErrorReducer
});

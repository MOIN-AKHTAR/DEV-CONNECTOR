import { combineReducers } from "redux";
import { AuthReducer } from "./Reducer/AuthReducer";
import { ErrorReducer } from "./Reducer/ErrorReducer";
import { ProfileReducer } from "./Reducer/ProfileReducer";
import { PostReducer } from "./Reducer/PostReducer";
export default combineReducers({
  auth: AuthReducer,
  error: ErrorReducer,
  profile: ProfileReducer,
  post: PostReducer,
});

import { createStore, applyMiddleware, compose } from "redux";
import RootReducer from "./RootReducer";
import thunk from "redux-thunk";
const MiddleWare = [thunk];
const initialState = {};
const Store = createStore(
  RootReducer,
  initialState,
  compose(
    applyMiddleware(...MiddleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default Store;

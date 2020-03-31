import { GET_ERROR } from "../Types/ActionType";
const initialState = "";
export const ErrorReducer = (State = initialState, Action) => {
  switch (Action.type) {
    case GET_ERROR: {
      return Action.Payload;
    }
    default: {
      return State;
    }
  }
};

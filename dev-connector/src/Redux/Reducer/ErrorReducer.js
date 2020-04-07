import { GET_ERROR, CLEAR_ERRORS } from "../Types/ActionType";
const initialState = "";
export const ErrorReducer = (State = initialState, Action) => {
  switch (Action.type) {
    case GET_ERROR: {
      return Action.Payload;
    }
    case CLEAR_ERRORS: {
      return {};
    }
    default: {
      return State;
    }
  }
};

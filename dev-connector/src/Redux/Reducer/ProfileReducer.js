import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../Types/ActionType";
const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export const ProfileReducer = (State = initialState, Action) => {
  switch (Action.type) {
    case PROFILE_LOADING: {
      return {
        ...State,
        loading: true
      };
    }
    case GET_PROFILE: {
      return {
        ...State,
        profile: Action.Payload,
        loading: false
      };
    }
    case CLEAR_CURRENT_PROFILE: {
      return {
        ...State,
        profile: null
      };
    }
    default: {
      return State;
    }
  }
};

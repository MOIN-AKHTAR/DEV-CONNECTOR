import {
  ADD_POST,
  GET_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
} from "../Types/ActionType";
const initialState = {
  posts: [],
  post: {},
  loading: false,
};

export const PostReducer = (State = initialState, Action) => {
  switch (Action.type) {
    case POST_LOADING: {
      return {
        ...State,
        loading: true,
      };
    }
    case GET_POST: {
      return {
        ...State,
        post: Action.Payload,
        loading: false,
      };
    }
    case GET_POSTS: {
      return {
        ...State,
        posts: Action.Payload,
        loading: false,
      };
    }
    case ADD_POST: {
      return {
        ...State,
        posts: [Action.Payload, ...State.posts],
      };
    }

    case DELETE_POST: {
      return {
        ...State,
        posts: State.posts.filter((post) => post._id !== Action.Payload),
      };
    }

    default: {
      return State;
    }
  }
};

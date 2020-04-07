import Axios from "axios";
import {
  GET_ERROR,
  ADD_POST,
  GET_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  CLEAR_ERRORS,
} from "../Types/ActionType";

// Add Post
export const addPost = (post) => (Dispatch) => {
  Dispatch(clearError());
  Axios.post("/api/post", post)
    .then((res) => {
      Dispatch({
        type: ADD_POST,
        Payload: res.data.Post,
      });
    })
    .catch((err) => {
      Dispatch({
        type: GET_ERROR,
        Payload: err.response.data.error,
      });
    });
};

// Remove Post
export const deletePost = (Id) => (Dispatch) => {
  Axios.delete(`/api/post/${Id}`)
    .then((res) =>
      Dispatch({
        type: DELETE_POST,
        Payload: Id,
      })
    )
    .catch((err) =>
      Dispatch({
        type: GET_ERROR,
        Payload: err.response.data.error,
      })
    );
};
// Load All Posts
export const loadPosts = (_) => (Dispatch) => {
  Dispatch(setLoadingPost());
  Axios.get("/api/post")
    .then((res) => {
      Dispatch({
        type: GET_POSTS,
        Payload: res.data.Posts,
      });
    })
    .catch((err) => {
      Dispatch({
        type: GET_POSTS,
        Payload: null,
      });
    });
};

// Get A Specific Post With id
export const getPost = (id) => (Dispatch) => {
  Dispatch(setLoadingPost());
  Axios.get(`/api/post/${id}`)
    .then((res) => {
      Dispatch({
        type: GET_POST,
        Payload: res.data.Post,
      });
    })
    .catch((err) => {
      Dispatch({
        type: GET_POST,
        Payload: null,
      });
    });
};

// Like Post Who Have This id
export const likePost = (id) => (Dispatch) => {
  Axios.post(`/api/post/like/${id}`)
    .then((res) => Dispatch(loadPosts()))
    .catch((err) =>
      Dispatch({
        type: GET_ERROR,
        Payload: err.response.data.Message,
      })
    );
};

// Dislike Post Which Have This id
export const dislikePost = (id) => (Dispatch) => {
  Axios.post(`/api/post/unlike/${id}`)
    .then((res) => Dispatch(loadPosts()))
    .catch((err) =>
      Dispatch({
        type: GET_ERROR,
        Payload: err.response.data.Message,
      })
    );
};

// Add A Comment For Post Which Have this postId With Data Of comment
export const addComment = (postId, comment) => (Dispatch) => {
  Dispatch(clearError());
  Axios.post(`/api/post/comment/${postId}`, comment)
    .then((res) => {
      Dispatch({
        type: GET_POST,
        Payload: res.data.post,
      });
    })
    .catch((err) => {
      Dispatch({
        type: GET_ERROR,
        Payload: err.response.data.error,
      });
    });
};

// Delete Comment Which Have this commentId Which Is The Comment Of Post Which Have This postId
export const deleteComment = (postId, commentId) => (Dispatch) => {
  Axios.delete(`/api/post/comment/${postId}/${commentId}`)
    .then((res) => {
      Dispatch({
        type: GET_POST,
        Payload: res.data.post,
      });
    })
    .catch((err) => {
      Dispatch({
        type: GET_ERROR,
        Payload: err.response.data.error,
      });
    });
};

// Post Are Loading....
const setLoadingPost = (_) => ({
  type: POST_LOADING,
});

// Clear Errors
export const clearError = (_) => ({
  type: CLEAR_ERRORS,
});

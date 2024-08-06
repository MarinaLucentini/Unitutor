import { fetchProtectedResource } from ".";
import { GetAllPost } from "./post";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";
export const RESET_COMMENT_STATE = "RESET_COMMENT_STATE";
const addNewCommentRequest = () => ({
  type: ADD_COMMENT_REQUEST,
});

const addNewCommentSuccess = (data) => ({
  type: ADD_COMMENT_SUCCESS,
  payload: data,
});

const addNewCommentFailure = (error) => ({
  type: ADD_COMMENT_FAILURE,
  payload: error,
});

export const resetCommentState = () => ({
  type: RESET_COMMENT_STATE,
});
export const AddNewComment = (commentData, postId) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(addNewCommentRequest());
  try {
    const response = await fetch(`http://localhost:3001/comments/add/${postId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la registrazione");
    }

    dispatch(addNewCommentSuccess(data.message));
    dispatch(GetAllPost());
    dispatch(resetCommentState());
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addNewCommentFailure(error.message));
  }
};

export const UpdateComment = (commentData, commentId) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(addNewCommentRequest());
  try {
    const response = await fetch(`http://localhost:3001/comments/update/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la modifica");
    }

    dispatch(addNewCommentSuccess(data.message));
    dispatch(GetAllPost());
    dispatch(resetCommentState());
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addNewCommentFailure(error.message));
  }
};

export const DeleteComment = (commentId) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(addNewCommentRequest());
  try {
    const response = await fetch(`http://localhost:3001/comments/delete/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la cancellazione");
    }
    dispatch(GetAllPost());
    dispatch(resetCommentState());
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addNewCommentFailure(error.message));
  }
};

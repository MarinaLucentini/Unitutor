import { fetchProtectedResource } from ".";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const RESET_POST_STATE = "RESET_POST_STATE";
export const GET_ALL_POST = "GET_ALL_POST";
const addNewPostRequest = () => ({
  type: ADD_POST_REQUEST,
});

const addNewPostSuccess = (data) => ({
  type: ADD_POST_SUCCESS,
  payload: data,
});

const addNewPostFailure = (error) => ({
  type: ADD_POST_FAILURE,
  payload: error,
});
const getAllPostSuccess = (data) => ({
  type: GET_ALL_POST,
  payload: data,
});
export const resetPostState = () => ({
  type: RESET_POST_STATE,
});
export const AddNewPost = (postData) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(addNewPostRequest());
  try {
    const response = await fetch("http://localhost:3001/post/add", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la registrazione");
    }

    dispatch(addNewPostSuccess(data.message));
    dispatch(resetPostState());
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addNewPostFailure(error.message));
  }
};

export const GetAllPost = () => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(addNewPostRequest());
  try {
    const response = await fetch("http://localhost:3001/post/allPost", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la fetch");
    }
    dispatch(getAllPostSuccess(data));
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addNewPostFailure(error.message));
  }
};

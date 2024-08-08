import { fetchProtectedResource } from ".";

export const ADD_EXAM_REQUEST = "ADD_EXAM_REQUEST";
export const ADD_EXAM_SUCCESS = "ADD_EXAM_SUCCESS";
export const ADD_EXAM_FAILURE = "ADD_EXAM_FAILURE";
export const RESET_EXAM_STATE = "RESET_EXAM_STATE";
const addNewExamRequest = () => ({
  type: ADD_EXAM_REQUEST,
});

const addNewExamSuccess = (data) => ({
  type: ADD_EXAM_SUCCESS,
  payload: data,
});

const addNewExamFailure = (error) => ({
  type: ADD_EXAM_FAILURE,
  payload: error,
});
export const resetExamState = () => ({
  type: RESET_EXAM_STATE,
});
export const AddNewExam = (examData) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(addNewExamRequest());
  try {
    const response = await fetch("http://localhost:3001/exam/add", {
      method: "POST",
      body: JSON.stringify(examData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la registrazione");
    }

    dispatch(addNewExamSuccess(data.message));

    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addNewExamFailure(error.message));
  }
};
export const UpdateExam = (examData) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(addNewExamRequest());
  try {
    const response = await fetch("http://localhost:3001/exam/update", {
      method: "PATCH",
      body: JSON.stringify(examData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la modifica");
    }
    dispatch(addNewExamSuccess(data.message));

    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addNewExamFailure(error.message));
  }
};
export const DeleteExam = (examData) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch("http://localhost:3001/exam/delete", {
      method: "DELETE",
      body: JSON.stringify(examData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la cancellazione");
    }

    dispatch(resetExamState());
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addNewExamFailure(error.message));
  }
};

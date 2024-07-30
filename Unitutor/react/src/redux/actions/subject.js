import { fetchProtectedResource } from ".";

export const ADD_SUBJECT_REQUEST = "ADD_SUBJECT_REQUEST";
export const ADD_SUBJECT_SUCCESS = "ADD_SUBJECT_SUCCESS";
export const ADD_SUBJECT_FAILURE = "ADD_SUBJECT_FAILURE";
export const RESET_SUBJECT_STATE = "RESET_SUBJECT_STATE";
const addNewsubjectsRequest = () => ({
  type: ADD_SUBJECT_REQUEST,
});

const addNewsubjectsSuccess = (data) => ({
  type: ADD_SUBJECT_SUCCESS,
  payload: data,
});

const addNewsubjectsFailure = (error) => ({
  type: ADD_SUBJECT_FAILURE,
  payload: error,
});
export const resetsubjectsState = () => ({
  type: RESET_SUBJECT_STATE,
});
export const AddNewsubject = (subjectData) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(addNewsubjectsRequest());
  try {
    const response = await fetch("http://localhost:3001/subjects/newSubject", {
      method: "POST",
      body: JSON.stringify(subjectData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la registrazione");
    }

    dispatch(addNewsubjectsSuccess(data.message));
    dispatch(resetsubjectsState());
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addNewsubjectsFailure(error.message));
  }
};
export const UpdateSubject = (subjectData) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(addNewsubjectsRequest());
  try {
    const response = await fetch("http://localhost:3001/subjects/updateSubject", {
      method: "PATCH",
      body: JSON.stringify(subjectData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la modifica");
    }
    dispatch(addNewsubjectsSuccess(data.message));
    dispatch(resetsubjectsState());
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addNewsubjectsFailure(error.message));
  }
};

export const DeleteSubject = (name, nameCourse) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch("http://localhost:3001/subjects/deleteSubject", {
      method: "DELETE",
      body: JSON.stringify({ name, nameCourse }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la modifica");
    }

    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addNewsubjectsFailure(error.message));
  }
};

import { fetchProtectedResource } from ".";

export const ADD_PROFESSOR_REQUEST = "ADD_PROFESSOR_REQUEST";
export const ADD_PROFESSOR_SUCCESS = "ADD_PROFESSOR_SUCCESS";
export const ADD_PROFESSOR_FAILURE = "ADD_PROFESSOR_FAILURE";
export const RESET_PROFESSOR_STATE = "RESET_PROFESSOR_STATE";
const addNewProfessorRequest = () => ({
  type: ADD_PROFESSOR_REQUEST,
});

const addNewProfessorSuccess = (data) => ({
  type: ADD_PROFESSOR_SUCCESS,
  payload: data,
});

const addNewProfessorFailure = (error) => ({
  type: ADD_PROFESSOR_FAILURE,
  payload: error,
});
export const resetProfessorState = () => ({
  type: RESET_PROFESSOR_STATE,
});
export const AddNewProfessor = (professorData) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(addNewProfessorRequest());
  try {
    const response = await fetch("http://localhost:3001/professor/add", {
      method: "POST",
      body: JSON.stringify(professorData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la registrazione");
    }

    dispatch(addNewProfessorSuccess(data.message));
    dispatch(resetProfessorState());
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addNewProfessorFailure(error.message));
  }
};
export const UpdateProfessor = (professorData) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(addNewProfessorRequest());
  try {
    const response = await fetch("http://localhost:3001/professor/update", {
      method: "PATCH",
      body: JSON.stringify(professorData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la registrazione");
    }

    dispatch(addNewProfessorSuccess(data.message));
    dispatch(resetProfessorState());
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addNewProfessorFailure(error.message));
  }
};

import { fetchProtectedResource } from ".";

export const ADD_NEW_COURSE_REQUEST = "ADD_NEW_COURSE_REQUEST";
export const ADD_NEW_COURSE_SUCCESS = "ADD_NEW_COURSE_SUCCESS";
export const ADD_NEW_COURSE_FAILURE = "ADD_NEW_COURSE_FAILURE";
export const RESET_COURSE_STATE = "RESET_COURSE_STATE";
const addNewCourseRequest = () => ({
  type: ADD_NEW_COURSE_REQUEST,
});

const addNewCourseSuccess = (data) => ({
  type: ADD_NEW_COURSE_SUCCESS,
  payload: data,
});

const addNewCourseFailure = (error) => ({
  type: ADD_NEW_COURSE_FAILURE,
  payload: error,
});
export const resetCourseState = () => ({
  type: RESET_COURSE_STATE,
});
export const AddNewCourse = (courseData) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(addNewCourseRequest());
  try {
    const response = await fetch("http://localhost:3001/course/create", {
      method: "POST",
      body: JSON.stringify(courseData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la registrazione");
    }

    dispatch(addNewCourseSuccess(data.message));

    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addNewCourseFailure(error.message));
  }
};
export const UpdateCourse = (courseData) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(addNewCourseRequest());
  try {
    const response = await fetch("http://localhost:3001/course/update", {
      method: "PUT",
      body: JSON.stringify(courseData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la modifica");
    }
    dispatch(addNewCourseSuccess(data.message));

    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addNewCourseFailure(error.message));
  }
};

export const DeleteCourse = (name) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch("http://localhost:3001/course/delete", {
      method: "DELETE",
      body: JSON.stringify({ name }),
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
    dispatch(addNewCourseFailure(error.message));
  }
};

import { fetchProtectedResource } from ".";

export const ADD_LESSON_REQUEST = "ADD_LESSON_REQUEST";
export const ADD_LESSON_SUCCESS = "ADD_LESSON_SUCCESS";
export const ADD_LESSON_FAILURE = "ADD_LESSON_FAILURE";
export const RESET_LESSON_STATE = "RESET_LESSON_STATE";
const addNewLessonRequest = () => ({
  type: ADD_LESSON_REQUEST,
});

const addNewLessonSuccess = (data) => ({
  type: ADD_LESSON_SUCCESS,
  payload: data,
});

const addNewLessonFailure = (error) => ({
  type: ADD_LESSON_FAILURE,
  payload: error,
});
export const resetLessonState = () => ({
  type: RESET_LESSON_STATE,
});
export const AddNewLesson = (lessonData) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(addNewLessonRequest());
  try {
    const response = await fetch("http://localhost:3001/lessons/add", {
      method: "POST",
      body: JSON.stringify(lessonData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la registrazione");
    }

    dispatch(addNewLessonSuccess(data.message));
    dispatch(resetLessonState());
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addNewLessonFailure(error.message));
  }
};
export const fetchLessons = (selectedDate) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const response = await fetch(`http://localhost:3001/lessons/lessons-exams?date=${formattedDate}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch(addNewLessonSuccess(data));
  } catch (error) {
    dispatch(addNewLessonFailure(error.message));
  }
};

export const UpdateLesson = (lessonData) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(addNewLessonRequest());
  try {
    const response = await fetch("http://localhost:3001/lessons/update", {
      method: "PATCH",
      body: JSON.stringify(lessonData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la registrazione");
    }

    dispatch(addNewLessonSuccess(data.message));
    dispatch(resetLessonState());
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addNewLessonFailure(error.message));
  }
};
export const DeleteLesson = (lessonData) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch("http://localhost:3001/lessons/delete", {
      method: "DELETE",
      body: JSON.stringify(lessonData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la cancellazione");
    }

    dispatch(resetLessonState());
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addNewLessonFailure(error.message));
  }
};

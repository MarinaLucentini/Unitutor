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

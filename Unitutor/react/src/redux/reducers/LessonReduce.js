import { ADD_LESSON_FAILURE, ADD_LESSON_REQUEST, ADD_LESSON_SUCCESS, RESET_LESSON_STATE } from "../actions/lesson";

const initialState = {
  loading: false,
  success: false,
  error: false,
  content: null,
  errorMsg: null,
};
const LessonReduce = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LESSON_REQUEST:
      return { ...state, loading: true };
    case ADD_LESSON_SUCCESS:
      return { ...state, loading: false, success: true, content: action.payload, errorMsg: null, error: false };
    case ADD_LESSON_FAILURE:
      return { ...state, loading: false, errorMsg: action.payload, success: false, error: true };
    case RESET_LESSON_STATE:
      return initialState;
    default:
      return state;
  }
};
export default LessonReduce;

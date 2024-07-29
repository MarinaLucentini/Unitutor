import { ADD_NEW_COURSE_FAILURE, ADD_NEW_COURSE_REQUEST, ADD_NEW_COURSE_SUCCESS, RESET_COURSE_STATE } from "../actions/course";

const initialState = {
  loading: false,
  success: false,
  error: false,
  content: null,
  errorMsg: null,
};
const CourseReduce = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_COURSE_REQUEST:
      return { ...state, loading: true };
    case ADD_NEW_COURSE_SUCCESS:
      return { ...state, loading: false, success: true, content: action.payload, errorMsg: null, error: false };
    case ADD_NEW_COURSE_FAILURE:
      return { ...state, loading: false, errorMsg: action.payload, success: false, error: true };
    case RESET_COURSE_STATE:
      return initialState;
    default:
      return state;
  }
};
export default CourseReduce;

import { ADD_EXAM_FAILURE, ADD_EXAM_REQUEST, ADD_EXAM_SUCCESS, RESET_EXAM_STATE } from "../actions/exam";

const initialState = {
  loading: false,
  success: false,
  error: false,
  content: null,
  errorMsg: null,
};
const ExamReduce = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXAM_REQUEST:
      return { ...state, loading: true };
    case ADD_EXAM_SUCCESS:
      return { ...state, loading: false, success: true, content: action.payload, errorMsg: null, error: false };
    case ADD_EXAM_FAILURE:
      return { ...state, loading: false, errorMsg: action.payload, success: false, error: true };
    case RESET_EXAM_STATE:
      return initialState;
    default:
      return state;
  }
};
export default ExamReduce;

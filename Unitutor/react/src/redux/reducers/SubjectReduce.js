import { ADD_SUBJECT_FAILURE, ADD_SUBJECT_REQUEST, ADD_SUBJECT_SUCCESS, RESET_SUBJECT_STATE } from "../actions/subject";

const initialState = {
  loading: false,
  success: false,
  error: false,
  content: null,
  errorMsg: null,
};
const SubjectReduce = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUBJECT_REQUEST:
      return { ...state, loading: true };
    case ADD_SUBJECT_SUCCESS:
      return { ...state, loading: false, success: true, content: action.payload, errorMsg: null, error: false };
    case ADD_SUBJECT_FAILURE:
      return { ...state, loading: false, errorMsg: action.payload, success: false, error: true };
    case RESET_SUBJECT_STATE:
      return initialState;
    default:
      return state;
  }
};
export default SubjectReduce;

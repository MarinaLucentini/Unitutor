import { ADD_PROFESSOR_FAILURE, ADD_PROFESSOR_REQUEST, ADD_PROFESSOR_SUCCESS, RESET_PROFESSOR_STATE } from "../actions/professor";

const initialState = {
  loading: false,
  success: false,
  error: false,
  content: null,
  errorMsg: null,
};
const ProfessorReduce = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROFESSOR_REQUEST:
      return { ...state, loading: true };
    case ADD_PROFESSOR_SUCCESS:
      return { ...state, loading: false, success: true, content: action.payload, errorMsg: null, error: false };
    case ADD_PROFESSOR_FAILURE:
      return { ...state, loading: false, errorMsg: action.payload, success: false, error: true };
    case RESET_PROFESSOR_STATE:
      return initialState;
    default:
      return state;
  }
};
export default ProfessorReduce;

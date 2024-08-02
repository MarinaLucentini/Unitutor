import { LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER } from "../actions";

const initialState = {
  loading: false,
  success: false,
  error: false,
  content: null,
  errorMsg: null,
};
const StudentLoginReduce = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, content: action.payload, success: true, errorMsg: null, error: false };
    case LOGIN_USER_FAILURE:
      return { ...state, loading: false, errorMsg: action.payload, success: false, error: true };
    case LOGOUT_USER:
      return { ...state, content: null, success: false, error: false, errorMsg: null };
    default:
      return state;
  }
};
export default StudentLoginReduce;

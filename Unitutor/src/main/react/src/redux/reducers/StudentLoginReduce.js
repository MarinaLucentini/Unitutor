import { LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS } from "../actions";

const initialState = {
  loading: false,
  sucess: false,
  error: false,
  content: null,
  errorMsg: null,
};
const StudentLoginReduce = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, content: action.payload, sucess: true, errorMsg: null, error: false };
    case LOGIN_USER_FAILURE:
      return { ...state, loading: false, errorMsg: action.payload, sucess: false, error: true };
    default:
      return state;
  }
};
export default StudentLoginReduce;

import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, RESET_COMMENT_STATE } from "../actions/comment";

const initialState = {
  loading: false,
  success: false,
  error: false,
  content: null,
  errorMsg: null,
};
const CommentReduce = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_REQUEST:
      return { ...state, loading: true };
    case ADD_COMMENT_SUCCESS:
      return { ...state, loading: false, success: true, content: action.payload, errorMsg: null, error: false };
    case ADD_COMMENT_FAILURE:
      return { ...state, loading: false, errorMsg: action.payload, success: false, error: true };

    case RESET_COMMENT_STATE:
      return initialState;
    default:
      return state;
  }
};
export default CommentReduce;

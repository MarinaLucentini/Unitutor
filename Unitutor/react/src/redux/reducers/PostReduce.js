import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, GET_ALL_POST, RESET_POST_STATE } from "../actions/post";

const initialState = {
  loading: false,
  success: false,
  error: false,
  content: null,
  errorMsg: null,
  posts: [],
};
const PostReduce = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return { ...state, loading: true };
    case ADD_POST_SUCCESS:
      return { ...state, loading: false, success: true, content: action.payload, errorMsg: null, error: false };
    case ADD_POST_FAILURE:
      return { ...state, loading: false, errorMsg: action.payload, success: false, error: true };
    case GET_ALL_POST:
      return { ...state, loading: false, success: true, posts: action.payload };
    case RESET_POST_STATE:
      return initialState;
    default:
      return state;
  }
};
export default PostReduce;

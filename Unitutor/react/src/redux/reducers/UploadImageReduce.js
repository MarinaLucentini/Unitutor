import { RESET_UPLOAD_IMAGE, UPLOAD_IMAGE_FAILURE, UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS } from "../actions/uploadImage";

const initialState = {
  loading: false,
  message: "",
  error: "",
};
export const UploadImageReduce = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: "",
      };
    case UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        message: "",
        error: action.payload,
      };
    case RESET_UPLOAD_IMAGE:
      return initialState;
    default:
      return state;
  }
};

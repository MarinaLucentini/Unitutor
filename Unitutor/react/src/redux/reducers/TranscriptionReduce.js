import { RESET_TRANSCRIPTION, TRANSCRIPTION_FAILURE, TRANSCRIPTION_GET, TRANSCRIPTION_REQUEST, TRANSCRIPTION_SUCCESS } from "../actions/transcription";

const initialState = {
  loading: false,
  message: "",
  error: "",
  content: [],
};
export const TranscriptionReduce = (state = initialState, action) => {
  switch (action.type) {
    case TRANSCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case TRANSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        success: true,

        error: "",
      };
    case TRANSCRIPTION_FAILURE:
      return {
        ...state,
        loading: false,
        message: "",
        success: false,

        error: action.payload,
      };
    case RESET_TRANSCRIPTION:
      return initialState;
    case TRANSCRIPTION_GET:
      return {
        ...state,
        loading: false,
        content: action.payload,
        error: "",
      };
    default:
      return state;
  }
};

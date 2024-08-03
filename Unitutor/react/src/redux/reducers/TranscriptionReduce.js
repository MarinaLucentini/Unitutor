import { RESET_TRANSCRIPTION, TRANSCRIPTION_FAILURE, TRANSCRIPTION_REQUEST, TRANSCRIPTION_SUCCESS } from "../actions/transcription";

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
      };
    case TRANSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: "",
      };
    case TRANSCRIPTION_FAILURE:
      return {
        ...state,
        loading: false,
        message: "",
        error: action.payload,
      };
    case RESET_TRANSCRIPTION:
      return initialState;

    default:
      return state;
  }
};

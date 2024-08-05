import { fetchProtectedResource } from ".";

export const TRANSCRIPTION_REQUEST = "TRANSCRIPTION_REQUEST";
export const TRANSCRIPTION_SUCCESS = "TRANSCRIPTION_SUCCESS";
export const TRANSCRIPTION_FAILURE = "TRANSCRIPTION_FAILURE";
export const RESET_TRANSCRIPTION = "RESET_TRANSCRIPTION";
export const TRANSCRIPTION_GET = "TRANSCRIPTION_GET";
export const TranscriptionRequest = () => ({
  type: TRANSCRIPTION_REQUEST,
});

export const TranscriptionSuccess = (message) => ({
  type: TRANSCRIPTION_SUCCESS,
  payload: message,
});

export const TranscriptionFailure = (error) => ({
  type: TRANSCRIPTION_FAILURE,
  payload: error,
});
export const resetTranscription = () => ({
  type: RESET_TRANSCRIPTION,
});
export const TranscriptionGet = (data) => ({
  type: TRANSCRIPTION_GET,
  payload: data,
});
export const transcriptionNewFile = (file, id) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(TranscriptionRequest());
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`http://localhost:3001/files/${id}/transcription`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    dispatch(TranscriptionSuccess(data.message));
    dispatch(fetchProtectedResource());
    setTimeout(() => {
      dispatch(resetTranscription());
    }, 3000);
  } catch (error) {
    dispatch(TranscriptionFailure(error.message));
  }
};
export const transcriprionGetFile = (id) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(TranscriptionRequest());
  try {
    const response = await fetch(`http://localhost:3001/files/${id}/transcription`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    dispatch(TranscriptionGet(data));
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(TranscriptionFailure(error.message));
  }
};
export const transcriptionUpdateFunction = (formData, subjectId, transcriptionId) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(TranscriptionRequest());
  try {
    const response = await fetch(`http://localhost:3001/files/${subjectId}/${transcriptionId}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la modifica");
    }
    dispatch(TranscriptionSuccess(data.message));
    dispatch(fetchProtectedResource());
    setTimeout(() => {
      dispatch(resetTranscription());
    }, 3000);
  } catch (error) {
    dispatch(TranscriptionFailure(error.message));
  }
};
export const transcriptionDeleteFunction = (subjectId, transcriptionId) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(TranscriptionRequest());
  try {
    const response = await fetch(`http://localhost:3001/files/delete/transcription/${subjectId}/${transcriptionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la cancellazione");
    }
    dispatch(TranscriptionSuccess(data.message));
    dispatch(fetchProtectedResource());
    setTimeout(() => {
      dispatch(resetTranscription());
    }, 3000);
  } catch (error) {
    dispatch(TranscriptionFailure(error.message));
  }
};

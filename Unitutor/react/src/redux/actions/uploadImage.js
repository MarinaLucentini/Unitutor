import { fetchProtectedResource } from ".";

export const UPLOAD_IMAGE_REQUEST = "UPLOAD_IMAGE_REQUEST";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE";
export const RESET_UPLOAD_IMAGE = "RESET_UPLOAD_IMAGE";

export const uploadImageRequest = () => ({
  type: UPLOAD_IMAGE_REQUEST,
});

export const uploadImageSuccess = (message) => ({
  type: UPLOAD_IMAGE_SUCCESS,
  payload: message,
});

export const uploadImageFailure = (error) => ({
  type: UPLOAD_IMAGE_FAILURE,
  payload: error,
});
export const resetUploadImage = () => ({
  type: RESET_UPLOAD_IMAGE,
});
export const uploadImage = (file) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(uploadImageRequest());
  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const response = await fetch("http://localhost:3001/profile/avatar", {
      method: "PATCH",
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
    dispatch(uploadImageSuccess(data.message));
    dispatch(fetchProtectedResource());
    setTimeout(() => {
      dispatch(resetUploadImage());
    }, 3000);
  } catch (error) {
    dispatch(uploadImageFailure(error.message));
  }
};

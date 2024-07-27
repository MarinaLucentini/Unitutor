export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";
// export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
// export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
// export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
const registerUserRequest = () => ({
  type: REGISTER_USER_REQUEST,
});
// const loginUserRequest = () => ({
//   type: LOGIN_USER_REQUEST,
// });
const registerUserSuccess = (data) => ({
  type: REGISTER_USER_SUCCESS,
  payload: data,
});

const registerUserFailure = (error) => ({
  type: REGISTER_USER_FAILURE,
  payload: error,
});
// const fetchResourceSuccess = (data) => ({
//   type: LOGIN_USER_SUCCESS,
//   payload: data,
// });
// const fetchResourceFailure = (error) => ({
//   type: LOGIN_USER_FAILURE,
//   payload: error,
// });
export const registerUser = (userData, setErrors) => async (dispatch) => {
  dispatch(registerUserRequest());
  try {
    const response = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      setErrors(data);
      throw new Error(data.error || "Errore durante la registrazione");
    }

    dispatch(registerUserSuccess(data.message));
  } catch (error) {
    dispatch(registerUserFailure(error.message));
  }
};
// export const loginUser = (userData) => async (dispatch) => {
//   dispatch(loginUserRequest());
//   try {
//     const response = await fetch("http://localhost:3001/auth/login", {
//       method: "POST",
//       body: JSON.stringify(userData),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       const errorData = await response.json();

//       throw new Error(errorData.message);
//     }
//     const data = await response.json();
//     localStorage.setItem("authToken", data.accessToken);
//     dispatch(fetchResourceSuccess(data));
//   } catch (error) {
//     dispatch(fetchResourceFailure(error.message));
//   }
// };

// export const fetchProtectedResource = () => async (dispatch) => {
//   const token = localStorage.getItem("authToken");

//   try {
//     const response = await fetch("http://localhost:3001/students/profile", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message);
//     }

//     const data = await response.json();
//     dispatch(fetchResourceSuccess(data));
//   } catch (error) {
//     dispatch(fetchResourceFailure(error.message));
//   }
// };

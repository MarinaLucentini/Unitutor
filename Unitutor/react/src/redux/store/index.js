import { combineReducers, configureStore } from "@reduxjs/toolkit";
import StudentReduce from "../reducers/StudentReduce";
import StudentLoginReduce from "../reducers/StudentLoginReduce";
import { UploadImageReduce } from "../reducers/UploadImageReduce";

const rootReducer = combineReducers({
  student: StudentReduce,
  authentication: StudentLoginReduce,
  uploadImage: UploadImageReduce,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

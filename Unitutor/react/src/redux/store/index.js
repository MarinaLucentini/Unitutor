import { combineReducers, configureStore } from "@reduxjs/toolkit";
import StudentReduce from "../reducers/StudentReduce";
import StudentLoginReduce from "../reducers/StudentLoginReduce";

const rootReducer = combineReducers({
  student: StudentReduce,
  authentication: StudentLoginReduce,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
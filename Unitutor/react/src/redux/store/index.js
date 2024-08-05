import { combineReducers, configureStore } from "@reduxjs/toolkit";
import StudentReduce from "../reducers/StudentReduce";
import StudentLoginReduce from "../reducers/StudentLoginReduce";
import { UploadImageReduce } from "../reducers/UploadImageReduce";
import CourseReduce from "../reducers/CourseReduce";
import SubjectReduce from "../reducers/SubjectReduce";
import ProfessorReduce from "../reducers/ProfessorReduce";
import LessonReduce from "../reducers/LessonReduce";
import ExamReduce from "../reducers/ExamReduce";
import { TranscriptionReduce } from "../reducers/TranscriptionReduce";

const rootReducer = combineReducers({
  student: StudentReduce,
  authentication: StudentLoginReduce,
  uploadImage: UploadImageReduce,
  course: CourseReduce,
  subject: SubjectReduce,
  professor: ProfessorReduce,
  lesson: LessonReduce,
  exam: ExamReduce,
  transcription: TranscriptionReduce,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

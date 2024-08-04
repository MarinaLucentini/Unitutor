import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ConditionalNav from "./component/Navbar/ConditionalNav";
import MyFooter from "./component/Footer/MyFooter";
import MyHomepage from "./component/Homepage/MyHomepage";
import LoginPage from "./component/Login/LoginPage";
import RegistrationPage from "./component/Registration/RegistrationPage";
import ProfilePage from "./component/Profile/ProfilePage";
import CoursePage from "./component/Course/CoursePage";
import SubjectPage from "./component/Subject/SubjectPage";
import CaledarPage from "./component/Calendar/CalendarPage";
import TransciptionPage from "./component/Transcription/TranscriptionPage";
import TrascriptionDetails from "./component/Transcription/TranscriptionDetails";

function App() {
  return (
    <BrowserRouter>
      <ConditionalNav />
      <Routes>
        <Route path="/" element={<MyHomepage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/registerPage" element={<RegistrationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="/subject/:id" element={<SubjectPage />} />
        <Route path="/calendarPage" element={<CaledarPage />} />
        <Route path="/transcription" element={<TransciptionPage />} />
        <Route path="/transcription/:id" element={<TrascriptionDetails />} />
      </Routes>
      <MyFooter />
    </BrowserRouter>
  );
}

export default App;

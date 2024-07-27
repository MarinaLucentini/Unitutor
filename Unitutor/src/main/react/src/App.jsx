import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ConditionalNav from "./component/Navbar/ConditionalNav";
import MyFooter from "./component/Footer/MyFooter";
import MyHomepage from "./component/Homepage/MyHomepage";
import LoginPage from "./component/Login/LoginPage";
import RegistrationPage from "./component/Registration/RegistrationPage";
import ProfilePage from "./component/Profile/ProfilePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <ConditionalNav />
        <Routes>
          <Route path="/" element={<MyHomepage />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/registerPage" element={<RegistrationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <MyFooter />
      </BrowserRouter>
    </>
  );
}

export default App;

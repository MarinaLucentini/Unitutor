import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ConditionalNav from "./component/Navbar/ConditionalNav";
import MyFooter from "./component/Footer/MyFooter";
import MyHomepage from "./component/Homepage/MyHomepage";

function App() {
  return (
    <>
      <BrowserRouter>
        <ConditionalNav />
        <Routes>
          <Route path="/" element={<MyHomepage />} />
        </Routes>
        <MyFooter />
      </BrowserRouter>
    </>
  );
}

export default App;

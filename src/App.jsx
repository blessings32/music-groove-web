import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/login/Login";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

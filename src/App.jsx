import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/login/Login";
import { Route, Routes } from "react-router-dom";
import { AudioProvider } from "./context/AudioContext";

function App() {
  return (
    <div className="w-full h-full">
      <AudioProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </AudioProvider>
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Home } from "./components/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { useState, createContext } from "react";

export const AppContext = createContext();

function App() {
  const [login, setLogin] = useState(false);
  return (
    <>
      <AppContext.Provider value={{ login, setLogin }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </>
  );
}

export default App;

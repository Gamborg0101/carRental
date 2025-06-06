import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeRender from "./pages/Home";
import CreateRental from "./pages/CreateRental";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRender />} />
          <Route path="/rental" element={<CreateRental />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeRender from "./pages/Home";
import GetBookings from "./pages/GetBookings";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRender />} />
          <Route path="/getbookings" element={<GetBookings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

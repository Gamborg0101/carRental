import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeRender from "./pages/Home";
import GetBookings from "./pages/GetBookings";
import "./App.css";
import CreateBooking from "./pages/CreateBooking";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRender />} />
          <Route path="/getbookings" element={<GetBookings />} />
          <Route path="/createbooking" element={<CreateBooking />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { FrontBody } from "./components/Front-Body";
import "./App.css";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <FrontBody />
        <Footer />
      </div>
    </>
  );
}

export default App;

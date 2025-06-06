import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FrontBody from "../components/Front-Body";


export default function HomeRender() {
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

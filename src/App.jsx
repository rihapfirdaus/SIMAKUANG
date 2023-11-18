import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Carousel from "./components/Carousel.jsx";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupComp.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <section>
          <Routes>
            <Route path="/" element={<Carousel />}></Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;

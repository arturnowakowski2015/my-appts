import React from "react";

import { HashRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Settings/Home";
import "./App.css";

function App() {
  return (
    <>
      <HashRouter>
        {/* main route component */}
        <Routes>
          {/* switch displays only one component that matches */}

          <Route path="*" element={<Home />} />
        </Routes>
      </HashRouter>
    </>
  );
}
export default App;

import React from "react";
import { HashRouter, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Settings/Home";
import "./App.css";

function App() {
  alert(9);
  return (
    <>
      <HashRouter>
        {/* main route component */}
        <Routes>
          {/* switch displays only one component that matches */}

          <Route path="*" element={<Home />} />

          {/* the div below shows when there is no match */}
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
        </Routes>
      </HashRouter>
    </>
  );
}
export default App;

import React from "react";
import { HashRouter, Route, Link, Routes } from "react-router-dom";
import Settings from "./pages/Settings/Settings";
import "./App.css";

function App() {
  alert(9);
  return (
    <>
      <HashRouter>
        {/* main route component */}
        <Routes>
          {/* switch displays only one component that matches */}

          <Route path="settings/*" element={<Settings />} />

          {/* the div below shows when there is no match */}
          <Route
            path="/"
            element={
              <>
                <Link to="/">Go To Steps Page</Link>
                <Link to="/settings">Go To Steps Page</Link>
              </>
            }
          />
        </Routes>
      </HashRouter>
    </>
  );
}
export default App;

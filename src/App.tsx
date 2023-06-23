import Home from "./pages/Home";
import { useState, createContext, useContext } from "react";
import { MyGlobalContext } from "./components/MyGlobalContext";
import "./App.css";

function App() {
  const [sets, setSets] = useState<string[]>(["1", "2", "3"]);
  return (
    <>
      {" "}
      <MyGlobalContext.Provider value={{ sets, setSets }}>
        <Home />{" "}
      </MyGlobalContext.Provider>
    </>
  );
}
export default App;

import Home from "./pages/Home";
import { useState } from "react";
import { MyGlobalContext } from "./ctx/MyGlobalContext";
import "./App.css";

function App() {
  const [sets, setSets] = useState<string[]>(["1", "2", "3"]);
  const [i, setI] = useState(1);
  return (
    <>
      {" "}
      <MyGlobalContext.Provider value={{ sets, setSets, i, setI }}>
        <Home />{" "}
      </MyGlobalContext.Provider>
    </>
  );
}
export default App;

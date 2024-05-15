import { Outlet } from "react-router-dom";
import "./App.css";
// import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      Hello!
      {/* <Navbar /> */}
      <Outlet />
    </>
  );
}

export default App;

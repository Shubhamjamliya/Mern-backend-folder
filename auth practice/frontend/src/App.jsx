import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>MERN Auth UI (Vite + React)</h1>
      <Register />
      <hr />
      <Login />
    </div>
  );
}

export default App;

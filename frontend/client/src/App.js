import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  return (
    <div>
      {token ? (
        <Home />
      ) : (
        <Login setToken={setToken} />
      )}
    </div>
  );
}

export default App;
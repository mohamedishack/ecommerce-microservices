import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import Login from "./Login";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  return (
    <div>
      {token ? (
        <ProductList />
      ) : (
        <Login setToken={setToken} />
      )}
    </div>
  );
}

export default App;
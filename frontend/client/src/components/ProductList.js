import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState([]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // Load once
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Save whenever cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);
  // API call
  useEffect(() => {
    axios
      .get("http://localhost:3000/products", {
        params: {
          search: debouncedSearch,
          category: category,
        },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [debouncedSearch, category]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      const updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );
    setCart(updatedCart);
  };

  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item,
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <h2>E-Commerce</h2>

        <div>🛒 Cart ({cartCount})</div>
        <button onClick={logout}>Logout</button>
      </div>
      <div style={{ padding: "20px" }}>
        <h2>Products</h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", marginBottom: "10px", width: "200px" }}
        />

        {/* Category Filter */}
        <select
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "8px", marginLeft: "10px" }}
        >
          <option value="">All</option>
          <option value="mobile">Mobile</option>
          <option value="laptop">Laptop</option>
        </select>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {products.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <img src={p.image} alt="" width="100%" />
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>
              <p>{p.category}</p>
              <button onClick={() => addToCart(p)}>Add to Cart</button>
            </div>
          ))}
        </div>

        <h2>Cart</h2>

        {cart.map((item) => (
          <div key={item._id}>
            <p>
              {item.name} - ₹{item.price} × {item.quantity}
            </p>

            <button onClick={() => increaseQty(item._id)}>+</button>
            <button onClick={() => decreaseQty(item._id)}>-</button>
          </div>
        ))}
        <p>
          <strong>Total: ₹{total.toFixed(2)}</strong>
        </p>
      </div>
    </div>
  );
}

export default ProductList;

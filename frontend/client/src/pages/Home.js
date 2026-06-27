import React, { useEffect, useState } from "react";
import axios from "axios";
import { getProducts } from "../services/ProductService";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Cart from "../components/Cart";
import ProductCard from "../components/ProductCard";

function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [category, setCategory] = useState("");
    const [cart, setCart] = useState([]);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const loadProducts = async () => {
        try {
            const res = await getProducts({
                search: debouncedSearch,
                category
            });

            setProducts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

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
    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    };

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
            <div style={{ padding: "20px" }}>
                <h2>Products</h2>
                <Header
                    cartCount={cartCount}
                    onLogout={logout}
                />
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    category={category}
                    setCategory={setCategory}
                />

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
                        <ProductCard product={p}
                            onAddToCart={addToCart} />
                    ))}
                </div>

                <Cart
                    cart={cart}
                    total={total}
                    increaseQty={increaseQty}
                    decreaseQty={decreaseQty}
                />
            </div>
        </div>
    );
}

export default Home;

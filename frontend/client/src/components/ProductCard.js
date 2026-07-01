import React from 'react'

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px",
            }}
        >
            <img src={product.image} alt="" width="100%" />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <p>{product.category}</p>
            <button onClick={() => onAddToCart(product)}>
                Add to Cart
            </button>
        </div>
    )
}

export default ProductCard
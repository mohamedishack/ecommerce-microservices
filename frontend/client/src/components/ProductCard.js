import React from 'react'

const ProductCard = ({ product, addToCart }) => {
    return (
        <div
            key={product._id}
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
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    )
}

export default ProductCard
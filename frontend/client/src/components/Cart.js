import React from 'react'

const Cart = ({ cart, total, increaseQty, decreaseQty }) => {
    return (
        <div>
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
    )
}

export default Cart
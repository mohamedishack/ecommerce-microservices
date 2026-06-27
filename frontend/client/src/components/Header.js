import React from 'react'

const Header = ({ cartCount, onLogout }) => {
  return (
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
        <button onClick={onLogout}>Logout</button>
      </div>
  )
}

export default Header
function AuthLayout({ children }) {
  return (
    <div
      style={{
        width: "400px",
        margin: "80px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>E-Commerce</h2>

      {children}
    </div>
  );
}

export default AuthLayout;
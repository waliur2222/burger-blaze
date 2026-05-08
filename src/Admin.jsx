import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase/config";

function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      (snapshot) => {
        const orderData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(orderData);
      }
    );

    return () => unsubscribe();
  }, []);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "orange" }}>
          Admin Dashboard 👑
        </h1>

        <button
          onClick={() => {
            window.location.href = "/";
          }}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            background: "#1e1e1e",
            padding: "25px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <h2>Total Orders 📦</h2>

          <h1 style={{ color: "orange" }}>
            {orders.length}
          </h1>
        </div>

        <div
          style={{
            background: "#1e1e1e",
            padding: "25px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <h2>Total Revenue 💰</h2>

          <h1 style={{ color: "lime" }}>
            ₹{totalRevenue}
          </h1>
        </div>
      </div>

      {/* Orders */}
      <div style={{ marginTop: "40px" }}>
        <h2>Customer Orders 🍔</h2>

        {orders.length === 0 ? (
          <div
            style={{
              background: "#1e1e1e",
              padding: "20px",
              borderRadius: "15px",
              marginTop: "15px",
              textAlign: "center",
            }}
          >
            No Orders Yet 😔
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: "#1e1e1e",
                padding: "20px",
                borderRadius: "15px",
                marginTop: "15px",
              }}
            >
              <h3>🧾 Order Items:</h3>

              {order.items.map((item, index) => (
                <p key={index}>
                  🍔 {item.name} - ₹{item.price}
                </p>
              ))}

              <h3
                style={{
                  color: "lime",
                  marginTop: "10px",
                }}
              >
                Total: ₹{order.total}
              </h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Admin;

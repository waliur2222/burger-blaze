import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase/config";

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Cheese Burger 🍔",
      price: 149,
      qty: 1,
    },
    {
      id: 2,
      name: "Pizza 🍕",
      price: 199,
      qty: 1,
    },
  ]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(
      cartItems.filter((item) => item.id !== id)
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.qty,
    0
  );

  const placeOrder = async () => {
    if (!name || !phone || !address) {
      alert("সব তথ্য পূরণ করুন ⚠️");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        customerName: name,
        phone,
        address,
        items: cartItems,
        total: totalPrice,
        createdAt: new Date(),
      });

      alert("Order Placed Successfully ✅");

      setCartItems([]);
      setName("");
      setPhone("");
      setAddress("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        background: "#111",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ color: "orange" }}>
        Cart Page 🛒
      </h1>

      {cartItems.length === 0 ? (
        <div
          style={{
            marginTop: "30px",
            background: "#1e1e1e",
            padding: "20px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          No Items In Cart 😔
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#1e1e1e",
                padding: "20px",
                borderRadius: "20px",
                marginTop: "20px",
              }}
            >
              <h2>{item.name}</h2>

              <h3 style={{ color: "orange" }}>
                ₹{item.price}
              </h3>

              <h3>
                Quantity: {item.qty}
              </h3>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <button
                  onClick={() =>
                    increaseQty(item.id)
                  }
                  style={{
                    background: "green",
                    border: "none",
                    color: "white",
                    padding: "10px 15px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                  }}
                >
                  +
                </button>

                <button
                  onClick={() =>
                    decreaseQty(item.id)
                  }
                  style={{
                    background: "orange",
                    border: "none",
                    color: "white",
                    padding: "10px 15px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                  }}
                >
                  -
                </button>

                <button
                  onClick={() =>
                    removeItem(item.id)
                  }
                  style={{
                    background: "red",
                    border: "none",
                    color: "white",
                    padding: "10px 15px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Customer Form */}
          <div
            style={{
              background: "#1e1e1e",
              padding: "20px",
              borderRadius: "20px",
              marginTop: "30px",
            }}
          >
            <h2>Customer Details 👤</h2>

            <input
              type="text"
              placeholder="Your Name"
              value={name}
onChange={(e) => setName(e.target.value)}
              onChange={(e) =>
                setName(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "15px",
                borderRadius: "10px",
                border: "none",
              }}
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
onChange={(e) => setPhone(e.target.value)}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "15px",
                borderRadius: "10px",
                border: "none",
              }}
            />

            <textarea
              placeholder="Delivery Address"
              value={address}
onChange={(e) => setAddress(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "15px",
                borderRadius: "10px",
                border: "none",
                minHeight: "100px",
              }}
            />

            <h1
              style={{
                color: "lime",
                marginTop: "20px",
              }}
            >
              Total: ₹{totalPrice}
            </h1>

            <button
              onClick={placeOrder}
              style={{
                width: "100%",
                background: "orange",
                color: "white",
                border: "none",
                padding: "15px",
                borderRadius: "12px",
                fontWeight: "bold",
                marginTop: "20px",
                fontSize: "18px",
              }}
            >
              Place Order 🚀
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

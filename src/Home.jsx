import { useState, useEffect } from "react";

function Home() {

const [cartCount, setCartCount] = useState(
  JSON.parse(localStorage.getItem("cart"))?.length || 0
);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  }, []);

  const foods = [
    {
      name: "Cheese Burger",
      emoji: "🍔",
      desc: "Delicious beef burger with cheese",
      price: 149,
    },
    {
      name: "French Fries",
      emoji: "🍟",
      desc: "Crispy and tasty fries",
      price: 99,
    },
    {
      name: "Cold Drink",
      emoji: "🥤",
      desc: "Ice cold refreshing drink",
      price: 59,
    },
    {
      name: "Pizza",
      emoji: "🍕",
      desc: "Hot and cheesy pizza",
      price: 199,
    },
    {
      name: "Hot Dog",
      emoji: "🌭",
      desc: "Tasty sausage hot dog",
      price: 129,
    },
    {
      name: "Chicken Wings",
      emoji: "🍗",
      desc: "Crispy spicy chicken wings",
      price: 179,
    },
    {
      name: "Sandwich",
      emoji: "🥪",
      desc: "Fresh grilled sandwich",
      price: 119,
    },
    {
      name: "Chicken Roll",
      emoji: "🌯",
      desc: "Spicy chicken roll",
      price: 139,
    },
    {
      name: "Ice Cream",
      emoji: "🍨",
      desc: "Cold creamy ice cream",
      price: 89,
    },
    {
      name: "Coffee",
      emoji: "☕",
      desc: "Hot premium coffee",
      price: 79,
    },
    {
      name: "Momos",
      emoji: "🥟",
      desc: "Steamed spicy momos",
      price: 109,
    },
    {
      name: "Noodles",
      emoji: "🍜",
      desc: "Chinese style noodles",
      price: 159,
    },
    {
      name: "Fried Chicken",
      emoji: "🍗",
      desc: "Crunchy fried chicken",
      price: 229,
    },
    {
      name: "Popcorn",
      emoji: "🍿",
      desc: "Butter crispy popcorn",
      price: 69,
    },
    {
      name: "Cake",
      emoji: "🍰",
      desc: "Soft chocolate cake",
      price: 149,
    },
  ];

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
      (cartItem) => cartItem.name === item.name
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...item,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setCartCount(cart.length);

    alert(item.name + " Added To Cart ✅");
  };

  return (
    <div
      style={{
        background: "#111",
        minHeight: "100vh",
        color: "white",
        fontFamily: "sans-serif",
        padding: "20px",
      }}
    >

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >

        <h1
          style={{
            color: "orange",
            fontSize: "40px",
          }}
        >
          Burger Blaze 🍔🔥
        </h1>

        <button
          onClick={() => window.location.href = "/cart"}
          style={{
            background: "#1e1e1e",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          🛒 Cart: {cartCount}
        </button>

      </div>

      {/* Food Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >

        {foods.map((item, index) => (

          <div
            key={index}
            style={{
              background: "#1e1e1e",
              padding: "20px",
              borderRadius: "20px",
              textAlign: "center",
              boxShadow: "0 0 15px rgba(255,165,0,0.3)",
            }}
          >

            <h2>
              {item.emoji} {item.name}
            </h2>

            <p
              style={{
                color: "#aaa",
                minHeight: "40px",
              }}
            >
              {item.desc}
            </p>

            <h3
              style={{
                color: "orange",
                fontSize: "30px",
              }}
            >
              ₹{item.price}
            </h3>

            <button
              onClick={() => addToCart(item)}
              style={{
                background: "orange",
                border: "none",
                padding: "14px",
                width: "100%",
                borderRadius: "12px",
                fontWeight: "bold",
                marginTop: "12px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Add To Cart
            </button>

          </div>

        ))}

      </div>

      {/* Bottom Buttons */}
      <div
        style={{
          marginTop: "40px",
          textAlign: "center",
        }}
      >

        <button
          onClick={() => window.location.href = "/cart"}
          style={{
            background: "green",
            color: "white",
            border: "none",
            padding: "15px 25px",
            borderRadius: "12px",
            fontWeight: "bold",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Place Order 🚀
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("cart");
            window.location.href = "/";
          }}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "15px 25px",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Home;

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "./firebase/config";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import Cart from "./Cart";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account Created ✅");
    } catch (error) {
      alert(error.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Success ✅")
      window.location.href = "/home"
    } catch (error) {
      alert(error.message);
    }
  };

return (
  <BrowserRouter>
    <Routes>

      <Route
        path="/"
        element={
          <div style={{
            background: "#111",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <div style={{
              background: "#222",
              padding: "30px",
              borderRadius: "15px",
              width: "300px"
            }}>

              <h1>Burger Blaze 🍔🔥</h1>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "10px"
                }}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "10px"
                }}
              />

              <button
                onClick={register}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "15px",
                  background: "orange",
                  border: "none"
                }}
              >
                Register
              </button>

              <button
                onClick={login}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "10px",
                  background: "green",
                  border: "none",
                  color: "white"
                }}
              >
                Login
              </button>

            </div>
          </div>
        }
      />

      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </BrowserRouter>
);   
}
export default App;

import "./App.css";
import { useEffect } from "react";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import { Route, Routes } from "react-router-dom";
import UserContext from "./context/userContext";
import { useState } from "react";
import Play from "./play.jsx";
import { Link } from "react-router-dom";

import axios from "axios";

function App() {
  const inputM = {
    conversation_id: "e9074291-a487-43da-a064-bf1cf52ce84f",
    input: "hi",
    message_id: "6d18c546-da21-4d68-82b9-0805016842b4",
    model: "text-moderation-playground",
  };
  useEffect(() => {
    console.log("hi");

    const getRef = async () => {
      try {
        const result = await axios.get(
          "https://chat.openai.com/backend-api/moderations",
          inputM
        );
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    getRef();
  }, []);
  console.log("ji")
  
  const [user, setUser] = useState();
  return (
    // <Play />

    <UserContext.Provider value={{ user, setUser }}>
      <div
        style={{
          height: "60px",
          backgroundColor: "wheat",
          alignItems: "center",
          display: "flex",
          fontWeight: "bold",
          paddingLeft: "15px",
        }}
      >
        {!user && <p style={{ display: "flex", flex: 1 }}>Sign in</p>}
        {user && (
          <div
            style={{
              width: "30%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <p>Home</p>
            <p>Contact</p>
            <p>About</p>
          </div>
        )}
      </div>
      <Routes>
        {/* <Route path="/" element={<WelcomeScreen />} /> */}
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;

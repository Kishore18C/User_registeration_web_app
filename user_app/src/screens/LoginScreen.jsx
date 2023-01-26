import React, { useState, useContext } from "react";
import Joi from "joi";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import { loginUser } from "../api/registerApi";

import { Box, Button, TextField } from "@mui/material";

function LoginScreen(props) {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apierror, setApierror] = useState("");

  const apiUser = useContext(UserContext);
  const navigate = useNavigate();

  const handleRegister = async () => {
    navigate("./register");
  };
  const handleClick = async () => {
    const user = { email, password };
    const { error } = validateUser(user);

    if (error) return setError(error.message);
    setError("");

    try {
      const register = await loginUser(user);
      const decoded = jwt_decode(register.data);

      apiUser.setUser(decoded);

      navigate("/home");
    } catch (error) {
      setApierror(error.response.data);
      console.log(error.response.data);
    }
  };
  return (
  

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        autoComplete="off"
      >
        <h1>Login</h1>
        <TextField
          error={error.includes("E-Mail") ? true : false}
          id="outlined-error-helper-text"
          label="E-Mail"
          helperText={error.includes("E-Mail") ? error : ""}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          type="password"
          error={error.includes("Password") ? true : false}
          id="outlined-error-helper-text"
          label="Password"
          helperText={error.includes("Password") ? error : ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p style={{ color: "red" }}>{apierror}</p>
        <div style={{ display: "flex" }}>
          <Button
            variant="contained"
            onClick={handleClick}
            style={{ marginRight: "10px" }}
          >
            Login
          </Button>
          <Button variant="contained" onClick={handleRegister}>
            Register
          </Button>
        </div>
      </Box>
   
  );
}

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .required()
      .messages({
        "object.trim":
          "E-Mail may not contain any spaces at the beginning or end",
      })
      .label("E-Mail"),
    password: Joi.string().min(7).required().label("Password"),
  });
  return schema.validate(user);
}

export default LoginScreen;

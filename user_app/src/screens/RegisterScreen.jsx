import React, { useContext, useState } from "react";
import Joi from "joi";
import jwt_decode from "jwt-decode";

import { Box, Button, TextField } from "@mui/material";
import { registerUser } from "../api/registerApi";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";

function RegisterScreen(props) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [apierror, setApierror] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const apiUser = useContext(UserContext);

  const handleClick = async () => {
    const user = { name, email, phone, address, password };
    const { error } = validateUser(user);

    if (error) return setError(error.message);
    setError("");

    try {
      const register = await registerUser(user);
      const decoded = jwt_decode(register.data);

      apiUser.setUser(decoded);

      navigate("/");
    } catch (error) {
      setApierror(error.response.data.error);
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
      <h1>Register</h1>
      <TextField
        error={error.includes("Name") ? true : false}
        id="outlined-error-helper-text"
        label="Name"
        helperText={error.includes("Name") ? error : ""}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        error={error.includes("E-Mail") ? true : false}
        id="outlined-error-helper-text"
        label="E-Mail"
        helperText={error.includes("E-Mail") ? error : ""}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        error={error.includes("Phone") ? true : false}
        id="outlined-error-helper-text"
        label="Phone"
        helperText={error.includes("Phone") ? error : ""}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        error={error.includes("Address") ? true : false}
        id="outlined-error-helper-text"
        label="Address"
        helperText={error.includes("Address") ? error : ""}
        onChange={(e) => setAddress(e.target.value)}
      />

      <TextField
        error={error.includes("Password") ? true : false}
        id="outlined-error-helper-text"
        label="Password"
        helperText={error.includes("Password") ? error : ""}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p style={{ color: "red" }}>{apierror}</p>
      <Button variant="contained" onClick={handleClick}>
        Register
      </Button>
    </Box>
  );
}

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)

      .trim()
      .required()
      .label("Name"),

    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("E-Mail"),
    phone: Joi.string()
      .regex(/[0-9]/)
      .min(10)
      .max(10)
      .required()
      .messages({
        "string.pattern.base": "Phone number must be number ",
        "string.min": "Phone number should contain atleast 10 numbers",
        "string.max": "Phone number should not be more than 10 numbers",
      })
      .label("Phone"),
    address: Joi.string().min(10).required().label("Address"),
    password: Joi.string()
      .min(7)
      .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])+/)
      .required()
      .messages({
        "string.pattern.base":
          "Password should have 1 uppercase, lowercase, number and a special character.",
      })
      .label("Password"),
  });
  return schema.validate(user);
}

export default RegisterScreen;

import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function WelcomeScreen(props) {
  const navigate = useNavigate();
  console.log()
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "wheat",
      }}
    >
      <h1>Welcome</h1>

      <Button
        variant="contained"
        onClick={() => navigate("/login")}
        sx={{ m: 2 }}
      >
        Login
      </Button>
      <Button variant="contained" onClick={() => navigate("/register")}>
        Register
      </Button>
    </Box>
  );
}

export default WelcomeScreen;

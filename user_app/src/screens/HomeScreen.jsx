import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";

function HomeScreen(props) {
  const apiUser = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = () => {
    apiUser.setUser(null);
    navigate("/");
  };

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
      <h1>Home</h1>
      {apiUser.user && (
        <div>
          <p>name : {apiUser.user.name}</p>
          <p>email : {apiUser.user.email}</p>
        </div>
      )}
      <Button variant="contained" onClick={handleClick}>
        Logout
      </Button>
    </Box>
  );
}

export default HomeScreen;

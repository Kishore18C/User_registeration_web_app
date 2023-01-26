import express from "express";
import Jwt from "jsonwebtoken";

import { getUserByEmail } from "../queries/mysqlquery.js";

const route = express.Router();

route.post("/", async (req, res) => {
  const { email, password } = req.body;
  const [user] = await getUserByEmail(email);

  if (!user)
    return res.status(400).send("There is no user with a given E-Mail id...");

  if (user.password !== password) {
    console.log(user);
    return res.status(400).send("Incorrect email and password");
  }

  const token = Jwt.sign(
    { id: user.user_id, name: user.name, email: user.email },
    "123"
  );

  return res.header("x-auth-token", token).send(token);
});

export default route;

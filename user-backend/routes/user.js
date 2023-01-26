import express from "express";
import db from "../index.js";
import Jwt from "jsonwebtoken";
import { getUser, getUserByEmail } from "../queries/mysqlquery.js";

const route = express.Router();

route.get("/", async (req, res) => {
  const users = await getUser();
  if (users.length === 0)
    return res.status(400).send({ error: "No users available..." });
  return res.status(200).send(users);
});

route.get("/:id", async (req, res) => {
  const users = await getUser(req.params.id);
  if (users.length === 0)
    return res.status(400).send({ error: "There is no user with given id..." });
  return res.status(200).send(users);
});

route.post("/", async (req, res) => {
  const { name, email, phone, address, password } = req.body;

  const oldUser = await getUserByEmail(email);

  if (oldUser.length !== 0)
    return res
      .status(400)
      .send({ error: "User with this email already exist..." });

  const insertQuery = `INSERT INTO customers.users VALUE (DEFAULT,?,?,?,?,?)`;
  try {
    const [user] = await db.query(insertQuery, [
      name,
      email,
      phone,
      address,
      password,
    ]);

    const [newUser] = await getUser(user.insertId);

    const token = Jwt.sign(
      { id: newUser.user_id, name: newUser.name, email: newUser.email },
      "123"
    );
    console.log(token);

    return res.header("x-auth-token", token).send(token);
  } catch (error) {
    console.log(error);
  }
});

export default route;

import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";

import user from "./routes/user.js";
import login from "./routes/login.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "password",
    // database: "customers",
  })
  .promise();

app.use("/register", user);
app.use("/login", login);

// createDb();

const port = process.env.port || 9000;

app.listen(port, () => console.log(`Listening to port ${port}`));

export default db;

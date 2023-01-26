import db from "../index.js";

async function getUser(id) {
  if (!id) {
    const query = `SELECT * FROM customers.users`;
    try {
      const [data] = await db.query(query);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const query1 = `SELECT * FROM customers.users WHERE user_id = ?`;
  try {
    const [data] = await db.query(query1, id);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getUserByEmail(email) {
  const findQuery = `SELECT * FROM customers.users WHERE email = ?`;
  try {
    const [data] = await db.query(findQuery, email);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function createDb(email) {
  const Query = `CREATE DATABASE customer; 
  CREATE TABLE user( user_id int NOT NULL,
    name varchar(255) NOT NULL
    email varchar(255) NOT NULL,
    password varchar(255),
    phone varchar(255),
    address varchar(255),
     
    PRIMARY KEY (user_id))`;
  try {
    const [data] = await db.query(Query);
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export { getUser, getUserByEmail, createDb };

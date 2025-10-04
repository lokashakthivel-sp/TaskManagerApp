//web framework, sits on nodes http module and provides clean requests and response
//contains middleware - fn that process req before reaching routes, routing - url paths, http methods (GET POST PUT..)
//express = node + routing + middleware + apis
import express, { json, urlencoded } from "express";

import dotenv from "dotenv";

//connection pool from postgres
import { Pool } from "pg";

////serverless and light weight relational db, no installation just include library
////can use std SQL cmds
////.verbose() for extensive error msgs in log, only for dev purpose

/* import sqlite3 from "sqlite3";
sqlite3.verbose(); */

//Cross Origin Resource Sharing - cros
//used to allow cross origin (diff domain) accessing eg: react runs in PORT:5137(Vite) but if express server runs in PORT:3000 then the requests are blocked by browser
import cors from "cors";

//creating application instance of the express to access .get() , .post()...
//express - blueprint, app - actual server
const app = express();

//this middleware tells browser that "anyone can call me". can also be used to restrict allowed origins
app.use(cors());
//this middleware allows json parsing
app.use(json());

//
/*global process */

const envFile =
  process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";
dotenv.config({ path: envFile });

console.log(process.env.POSTGRES_URL, process.env.PORT, process.env.NODE_ENV);

//to parse url encoded data ie data submitted thro forms into req.body, node/express cant directly understand raw request bodies as they come as stream of bytes
//extended : true to access nested objects and arrays, uses  qs lib
//if false cant access them, uses built in query string lib
app.use(urlencoded({ extended: true }));

////setting up the database
/* const db = new sqlite3.Database("./users.db");
db.run(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
    )
    `); */

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// Create users table if it doesn't exist (run this once or use migrations)
pool
  .query(
    `CREATE TABLE IF NOT EXISTS tmausers (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
    )`
  )
  .catch((err) => console.error("Error creating table:", err));

pool.query("SELECT NOW()", (err, res) => {
  if (err) console.log("DB not running", err);
  else console.log("DB is running:", res.rows);
});

// Signup route
app.post("/api/signup", async (req, res) => {
  console.log("in app.post for signup");

  const { username, password, email } = req.body;
  try {
    await pool.query(
      "INSERT INTO tmausers (username, password, email) VALUES ($1, $2, $3)",
      [username, password, email]
    );
    res.json({ username });
  } catch (err) {
    console.log("Signup error:", err);
    res.status(400).json({ error: "Username or email already exists" });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  console.log("in app.post for login");

  const { username, password, email } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM tmausers WHERE username=$1 AND password=$2 AND email=$3",
      [username, password, email]
    );
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    res.json({ username });
  } catch (err) {
    console.log("Login error:", err);
    res.status(400).json({ error: "Error retrieving db" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running at ", PORT);
});

////for sqlite3 db - used initially
/* app.post("/api/signup", (req, res) => {
  const { username, password, email } = req.body;
  db.run(
    `INSERT INTO users (username,password,email) VALUES (?,?,?)`,
    [username, password, email],
    function (err) {
      *dont use arrow fn, if so we cant use this.id bcoz arrow fn dont have this keyword
      if (err) {
        console.log("Already signed up");
        return res
          .status(400)
          .json({ error: "Username or email already exists" });
      }
      res.json({ username });
    }
  );
});

app.post("/api/login", (req, res) => {
  const { username, password, email } = req.body;
  db.get(
    `SELECT * FROM users WHERE username=(?) AND password=(?) AND email=(?)`,
    [username, password, email],
    (err, row) => {
      console.log(row);

      if (!row) {
        console.log("Invalid credentials");
        return res.status(400).json({ error: "Invalid credentials" });
        } else if (err) {
        console.log("Error retrieving db");
        return res.status(400).json({ error: "Error retrieving db" });
      }
      res.json({ username });
      }
      );
      }); */

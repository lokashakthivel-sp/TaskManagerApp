//web framework, sits on nodes http module and provides clean requests and response
//contains middleware - fn that process req before reaching routes, routing - url paths, http methods (GET POST PUT..)
//express = node + routing + middleware + apis
import express, { json, urlencoded } from "express";

//serverless and light weight relational db, no installation just include library
//can use std SQL cmds
//.verbose() for extensive error msgs in log, only for dev purpose

import sqlite3 from "sqlite3";
sqlite3.verbose();
//Cross Origin Resource Sharing - cros
//used to allow cross origin (diff domain) accessing eg: react runs in PORT:5137(Vite) but if express server runs in PORT:3000 then the requests are blocked by browser
import cors from "cors";

//creating application instance of the express to access .get() , .post()...
//express - blueprint app - actual server
const app = express();

//this middleware tells browser that "anyone can call me". can also be used to restrict allowed origins
app.use(cors());
app.use(json());

//to parse url encoded data ie data submitted thro forms into req.body, node/express cant directly understand raw request bodies as they come as stream of bytes
//extended : true to access nested objects and arrays, uses  qs lib
//if false cant access them, uses built in query string lib
app.use(urlencoded({ extended: true }));

//setting up the database
const db = new sqlite3.Database("./users.db");
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )
`);

app.post("/api/signup", (req, res) => {
  const { username, password, email } = req.body;
  db.run(
    `INSERT INTO users (username,password,email) VALUES (?,?,?)`,
    [username, password, email],
    function (err) {
      //dont use arrow fn, if so i cant use this.id bcoz arrow fn dont have this
      if (err) {
        console.log("Already signed up");
        return res
          .status(400)
          .json({ error: "Username or email already exists" });
      }
      res.json({ id: this.lastID, username });
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
});

app.listen(3000, () => {
  console.log("Server running");
});

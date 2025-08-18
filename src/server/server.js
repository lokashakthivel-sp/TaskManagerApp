//web framework, sits on nodes http module and provides clean requests and response
//contains middleware - fn that process req before reaching routes, routing - url paths, http methods (GET POST PUT..)
//express = node + routing + middleware + apis
const express = require("express");

//serverless and light weight relational db, no installation just include library
//can use std SQL cmds
//.verbose() for extensive error msgs in log, only for dev purpose
const sqlite3 = require("sqlite3").verbose();

//Cross Origin Resource Sharing - cros
//used to allow cross origin (diff domain) accessing eg: react runs in PORT:5137(Vite) but if express server runs in PORT:3000 then the requests are blocked by browser
const cors = require("cors");

//creating application instance of the express to access .get() , .post()...
//express - blueprint app - actual server
const app = express();

//this middleware tells browser that "anyone can call me". can also be used to restrict allowed origins
app.use(cors());

//to parse url encoded data ie data submitted thro forms into req.body, node/express cant directly understand raw request bodies as they come as stream of bytes
//extended : true to access nested objects and arrays, uses  qs lib
//if false cant access them, uses built in query string lib
app.use(express.urlencoded({ extended: true }));

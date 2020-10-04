const functions = require("firebase-functions");
const express = require("express");

const app = express();

// /messages, /users

app.get("/users", (req, res) => {
  res.send("Is the API working?");
});

exports.api = functions.https.onRequest(app);

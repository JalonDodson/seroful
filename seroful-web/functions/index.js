const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://seroful.firebaseio.com",
});

const db = admin.firestore();

const express = require("express");

const app = express();

// /messages, /users

app.get("/users", async (req, res) => {
  const results = await db.collection("users").get();
  res.send(results);
});
app.get('/profile', (req, res) => {
  //TODO: nav to user profile
});
app.get('/messages', (req, res) => {
  //TODO: nav to messages for current user 
});
app.post('/messages', (req, res) => {
  //TODO: post new message for logged in user
});


exports.api = functions.https.onRequest(app);

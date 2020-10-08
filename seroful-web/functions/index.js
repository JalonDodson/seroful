// DON'T TOUCH BELOW THIS LINE
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const credential = require("./seroful-firebase-adminsdk-ry93d-5b49e47b83.json");
/* WHEN IN DEV MODE ASSIGN CREDENTIAL TO admin.credential.cert(credential) 
  AND GET THE FILE FROM DISCORD
  when deploying to firebase (firebase deploy). set it to admin.credential.applicationDefault()
*/
admin.initializeApp({
  credential: admin.credential.cert(credential),
  databaseURL: "https://seroful.firebaseio.com",
});

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

const nanoid = require("nanoid");
// DON'T TOUCH ABOVE THIS LINE

const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

const decodeIDToken = async (req, res, next) => {
  if (req.headers.authorization) {
    if (req.headers.authorization.startsWith("Bearer ")) {
      const idToken = req.headers.authorization.split("Bearer ")[1];

      try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req["currentUser"] = decodedToken;
      } catch (err) {
        console.log(err);
      }
    }
  }
  next();
};

app.use(decodeIDToken);

app.post("/users", async (req, res) => {
  try {
    await db.collection("users").doc(req.body.email).set({
      displayName: req.body.displayName,
      email: req.body.email,
      username: req.body.username,
    });
    res.status(201).send("User created.");
  } catch (err) {
    res.status(400).send("Request failed: ", err);
  }
});

app.patch("/users", async (req, res) => {
  try {
    await db.collection("users").doc(req.body.email).update({
      username: req.body.username,
      email: req.body.email,
      displayName: req.body.displayName,
      photoURL: req.body.photo,
      medicines: req.body.medicines,
      illnesses: req.body.illnesses,
      plans: req.body.plans,
    });
    res.status(201).send("Request successful!");
  } catch (err) {
    console.log(err);
    res.status(400).send("Request failed.");
  }
});

app.get("/profile", (req, res) => {
  //TODO: nav to user profile
});
app.get('/profile', (req, res) => {
  //TODO: nav to user profile
});
app.post('/profile', (req, res) => {
  //TODO: nav to user profile
});
app.get('/friends', (req, res) => {
  //TODO: nav to user friend list
});
app.post('/friends', (req, res) => {
  //TODO: nav to user friend list
});
app.get('/planner', (req, res) => {
  //TODO: nav to planner for current user 
});
app.post('/planner', (req, res) => {
  //TODO: post new planner content for current user
});
app.get('/journal', (req, res) => {
  //TODO: nav to user journal
});
app.post('/journal', (req, res) => {
  //TODO: add content to user journal
});
app.get('/settings', (req, res) => {
  //TODO: nav to user settings
});
app.post('/settings', (req, res) => {
  //TODO: make changes to user settings
});
app.get("/video-chat", (req, res) => {
  res.redirect(`/video-chat/:${nanoid()}`);
});
app.get("/video-chat/:room", (req, res) => {
  res.status(200).send("", { roomId: req.params.room });
  console.log(req.params.room);
});

// DO NOT TOUCH THIS LINE
exports.api = functions.https.onRequest(app);

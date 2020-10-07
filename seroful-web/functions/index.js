// DON'T TOUCH BELOW THIS LINE
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const credential = require("./seroful-firebase-adminsdk-ry93d-5b49e47b83.json")
/* WHEN IN DEV MODE ASSIGN CREDENTIAL TO admin.credential.cert(credential) 
  AND GET THE FILE FROM DISCORD
  when deploying to firebase (firebase deploy). set it to admin.credential.applicationDefault()
*/
admin.initializeApp({
  credential: admin.credential.cert(credential),
  databaseURL: "https://seroful.firebaseio.com",
});

const db = admin.firestore();
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

// app.get("/users", async (req, res) => {
//   const user = req["currentUser"];

//   if (!user) {
//     res.status(403).send("Must be logged in to do this!");
//   } else {
//     const results = await db.collection("users").get();
//     res.status(200).send(results);
//   }
// });

app.post("/users", async (req, res) => {
  await db
    .collection("users")
    .doc(req.body.username)
    .set({
      displayName: req.body.displayName,
      email: req.body.email,
      username: req.body.username,
    })
    .then(console.log("User attempting to create account..."))
    .catch((err) => console.log(err));

  res.status(200).send("User created.");
});

app.get("/profile", (req, res) => {
  //TODO: nav to user profile
});
app.get("/messages", (req, res) => {
  //TODO: nav to messages for current user
});
app.post("/messages", (req, res) => {
  //TODO: post new message for logged in user
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

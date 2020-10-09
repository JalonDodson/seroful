// DON'T TOUCH BELOW THIS LINE
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const credential = require("./seroful-firebase-adminsdk-ry93d-5b49e47b83.json");

/* WHEN IN DEV MODE ASSIGN CREDENTIAL TO admin.credential.cert(credential) 
  AND GET THE FILE FROM DISCORD
  when deploying to firebase (firebase deploy). set it to admin.credential.applicationDefault()
*/
admin.initializeApp({
  // credential: admin.credential.cert(credential),
  credential: admin.credential.applicationDefault(),
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
      console.log(idToken);
      try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log(decodedToken);
        req["currentUser"] = decodedToken;
      } catch (err) {
        console.log(err);
      }
    }
  }
  next();
};

app.use(decodeIDToken);

app.get("/users", async (req, res) => {
  const emailQuery = req.url.split("email=")[1];
  const user = req["currentUser"];

  if (user) {
    try {
      await db
        .collection("users")
        .doc(emailQuery)
        .get()
        .then((snapshot) => res.status(200).send(snapshot.data()));
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  } else {
    res.status(403).send("Unauthorized!");
  }
});

app.post("/users", async (req, res) => {
  try {
    await db.collection("users").doc(req.body.email).set({
      displayName: req.body.displayName,
      email: req.body.email,
      username: req.body.username,
      photoURL: {},
      medicines: [],
      illnesses: [],
      plans: [],
      journals: [],
    });
    res.status(201).send("User created.");
  } catch (err) {
    res.status(400).send("Request failed: ", err);
  }
});

app.patch("/users", async (req, res) => {
  const emailQuery = req.url.split("email=")[1];
  const user = req["currentUser"];
  console.log(emailQuery);
  console.log(user, "test");

  const userData = await db
    .collection("users")
    .doc(emailQuery)
    .get()
    .then((doc) => {
      doc.data();
      console.log(doc.data());
    })
    .catch((err) => console.log(err));

  if (user) {
    await db
      .collection("users")
      .doc(emailQuery)
      .update({
        username: req.body.username ? req.body.username : userData.username,
        email: req.body.email ? req.body.email : userData.email,
        displayName: req.body.displayName
          ? req.body.displayName
          : userData.displayName,
        medicines: req.body.medicines ? req.body.medicines : userData.medicines,
        illnesses: req.body.illnesses ? req.body.illnesses : userData.illnesses,
        plans: req.body.plans ? req.body.plans : userData.plans,
        journals: req.body.journals ? req.body.journals : userData.journals,
      })
      .then(() => res.status(201).send("Request successful!"))
      .catch((err) => res.status(400).send(err));
  } else {
    res.status(403).send("User not authenticated.");
  }
});

app.get("/journal", async (req, res) => {
  try {
    await db.collection("users").get({ displayName: res.body.displayName });
    res.status(200);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
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

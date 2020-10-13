// DON'T TOUCH BELOW THIS LINE
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const credential = require("./seroful-firebase-adminsdk-ry93d-5b49e47b83.json");

const url = require("url");
/* WHEN IN DEV MODE ASSIGN CREDENTIAL TO admin.credential.cert(credential)
  AND GET THE FILE FROM DISCORD
  when deploying to firebase (firebase deploy). set it to admin.credential.applicationDefault()
*/
admin.initializeApp({
  // credential: admin.credential.cert(credential),
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

app.get("/users", async (req, res) => {
  const emailQuery = req.url.split("?email=")[1];
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
      friends: {},
    });
    res.status(201).send("User created.");
  } catch (err) {
    res.status(400).send("Request failed: ", err);
  }
});

app.patch("/users", async (req, res) => {
  const user = req["currentUser"];
  if (user) {
    try {
      const userData = await db
        .collection("users")
        .doc(req.body.email)
        .get()
        .then((query) => query.data());

      await db
        .collection("users")
        .doc(req.body.email)
        .update({
          username: req.body.username
            ? req.body.username
            : userData.username
            ? userData.username
            : "",
          email: req.body.email
            ? req.body.email
            : userData.email
            ? userData.email
            : "",
          displayName: req.body.displayName
            ? req.body.displayName
            : userData.displayName
            ? userData.displayName
            : "",
          photoURL: req.body.photoURL
            ? req.body.photoURL
            : userData.photoURL
            ? userData.photoURL
            : {},
          medicines: req.body.medicines
            ? req.body.medicines
            : userData.medicines
            ? userData.medicines
            : [],
          illnesses: req.body.illnesses
            ? req.body.illnesses
            : userData.illnesses
            ? userData.illnesses
            : [],
        })
        .then(res.status(201).send("Request successful!"));
    } catch (err) {
      console.log(err);
      res.status(400).send("Request failed.");
    }
  } else {
    res.status(403).send("Unauthorized.");
  }
});

app.patch("/users/journal/entries", async (req, res) => {
  const emailQuery = req.url.split("?email=")[1];

  const user = req["currentUser"];
  if (user) {
    try {
      await db
        .collection("users")
        .doc(emailQuery)
        .update({
          journals: admin.firestore.FieldValue.arrayUnion({
            entry: req.body.entry,
            timestamp: req.body.timestamp,
          }),
        })
        .then(res.status(201).send("Journal entry added successfully."));
    } catch (err) {
      console.log(err);
      res.status(400).send("Failed to update journal entries.");
    }
  } else {
    res.status(403).send("Unauthorized.");
  }
});

app.get("/users/journal/entries", async (req, res) => {
  const emailQuery = req.url.split("?email=")[1];

  const user = req["currentUser"];
  if (user) {
    try {
      await db
        .collection("users")
        .doc(emailQuery)
        .get()
        .then((resp) => {
          const { journals } = resp.data();
          console.log(journals);
          res.status(200).send(journals);
        });
    } catch (err) {
      console.log(err);
      res.status(400).send("Error retrieving information.");
    }
  } else {
    res.status(403).send("Unauthorized.");
  }
});

app.get("/users/planner/plans", async (req, res) => {
  const emailQuery = req.url.split("?email=")[1];

  const user = req["currentUser"];
  if (user) {
    try {
      await db
        .collection("users")
        .doc(emailQuery)
        .get()
        .then((resp) => {
          const { plans } = resp.data();

          res.status(200).send(plans);
        });
    } catch (err) {
      console.log(err);
      res.status(400).send("Error retrieving information.");
    }
  } else {
    res.status(403).send("Unauthorized");
  }
});

app.patch("/users/planner/plans", async (req, res) => {
  const emailQuery = req.url.split("?email=")[1];

  const user = req["currentUser"];
  if (user) {
    try {
      await db
        .collection("users")
        .doc(emailQuery)
        .update({
          plans: admin.firestore.FieldValue.arrayUnion({
            dayLength: req.body.dayLength,
            homework: req.body.homework,
            mealtimes: req.body.mealtimes,
            breaks: req.body.breaks,
            appt: req.body.appt,
            goals: req.body.goals,
            timestamp: req.body.timestamp,
          }),
        })
        .then(res.status(200).send("Updated plans successfully."));
    } catch (err) {
      console.log(err);
      res.status(400).send("Error retrieving information.");
    }
  } else {
    res.status(403).send("Unauthorized");
  }
});
/*
 */
app.post("/users/friends", async (req, res) => {
  const emailQuery = req.url.split("?email=")[1].split("&isPending=")[0];
  let isPending = req.url.split("?email=")[1].split("&isPending=")[1];
  isPending = isPending === "true";
  const user = req["currentUser"];
  if (user) {
    if (isPending) {
      try {
        await db
          .collection("users")
          .where("username", "==", req.body.username)
          .get()
          .then((query) => {
            query.docs.forEach((doc) => {
              const docRef = db.collection("users").doc(doc.id);
              docRef.update({
                friends: {
                  pending: admin.firestore.FieldValue.arrayUnion({
                    username: req.body.requestee,
                    requestDate: Date.now(),
                  }),
                },
              });
            });
          });
        await db
          .collection("users")
          .doc(emailQuery)
          .update({
            friends: {
              sent: admin.firestore.FieldValue.arrayUnion({
                username: req.body.username,
                requestDate: Date.now(),
              }),
            },
          });
        res.status(201).send("Successfully sent friend request.");
      } catch (err) {
        console.log(err);
        res.status(400).send("Unable to send friend request.");
      }
    } else {
      try {
        db.collection("users")
          .where("username", "==", req.body.username)
          .get()
          .then((query) => {
            query.docs.forEach((doc) => {
              const docRef = db.collection("users").doc(doc.id);
              docRef.update({
                friends: {
                  pending: admin.firestore.FieldValue.arrayRemove({
                    username: req.body.requestee,
                  }),
                  current: admin.firestore.FieldValue.arrayUnion({
                    username: req.body.requestee,
                    friendSince: Date.now(),
                  }),
                },
              });
            });
          });
        await db
          .collection("users")
          .doc(emailQuery)
          .update({
            friends: {
              sent: admin.firestore.FieldValue.arrayRemove({
                username: req.body.username,
                requested: Date.now(),
              }),
              current: admin.firestore.FieldValue.arrayUnion({
                username: req.body.username,
                friendSince: Date.now(),
              }),
            },
          })
          .then(res.status(201).send("Friend successfully added."));
      } catch (err) {
        console.log(err);
        res.status(400).send("Unable to accept friend request.");
      }
    }
  } else {
    res.status(403).send("Unauthorized!");
  }
});

// app.get("/profile", (req, res) => {
//   //TODO: nav to user profile
// });
// app.get('/profile', (req, res) => {
//   //TODO: nav to user profile
// });
// app.post('/profile', (req, res) => {
//   //TODO: nav to user profile
// });
// app.get('/friends', (req, res) => {
//   //TODO: nav to user friend list
// });
// app.post('/friends', (req, res) => {
//   //TODO: nav to user friend list
// });
// app.get('/planner', (req, res) => {
//   //TODO: nav to planner for current user
// });
// app.post('/planner', (req, res) => {
//   //TODO: post new planner content for current user
// });
app.get("/journal", async (req, res) => {
  try {
    await db.collection("users").get({ displayName: res.body.displayName });
    res.status(200);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
});
// app.post('/journal', (req, res) => {
//   //TODO: add content to user journal
// });
// app.get('/settings', (req, res) => {
//   //TODO: nav to user settings
// });
// app.post('/settings', (req, res) => {
//   //TODO: make changes to user settings
// });
app.get("/video-chat", (req, res) => {
  res.redirect(`/video-chat/:${nanoid()}`);
});

app.get("/video-chat/:room", (req, res) => {
  res.status(200).send("", { roomId: req.params.room });
  console.log(req.params.room);
});

// DO NOT TOUCH THIS LINE
exports.api = functions.https.onRequest(app);

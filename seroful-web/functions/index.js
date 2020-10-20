//  DON'T TOUCH BELOW THIS LINE

const functions = require("firebase-functions");
const logMe = functions.logger;
const admin = require("firebase-admin");
// const credential = require("./seroful-firebase-adminsdk-ry93d-5b49e47b83.json");

const accountSid = functions.config().twilio.account_sid;
const authToken = functions.config().twilio.auth_token;
const apiKey = functions.config().twilio.api_key;
const apiSecret = functions.config().twilio.api_secret;
const client = require("twilio")(accountSid, authToken);
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const uploadMiddleware = require("busboy-firebase");

/* WHEN IN DEV MODE ASSIGN CREDENTIAL TO admin.credential.cert(credential)
  AND GET THE FILE FROM DISCORD
  when deploying to firebase (firebase deploy). set it to admin.credential.applicationDefault()
*/
admin.initializeApp({
  //  credential: admin.credential.cert(credential),
  credential: admin.credential.applicationDefault(),
  databaseURL: "https:seroful.firebaseio.com",
  storageBucket: "gs://seroful.appspot.com",
});
const db = admin.firestore();
const storage = admin.storage().bucket();
db.settings({ ignoreUndefinedProperties: true });

//  const nanoid = require("nanoid");
//  DON'T TOUCH ABOVE THIS LINE

const express = require("express");
const cors = require("cors");

const app = express();
const server = require("http").Server(app);
//  const io = require("socket.io")(server);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const decodeIDToken = async (req, res, next) => {
  if (req.headers.authorization) {
    if (req.headers.authorization.startsWith("Bearer ")) {
      const idToken = req.headers.authorization.split("Bearer ")[1];
      try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req["currentUser"] = decodedToken;
      } catch (err) {
        console.log(err);
        logMe.log(err);
      }
    }
  }
  next();
};

const videoToken = (id, room) => {
  let videoGrant;
  if (typeof room !== "undefined") videoGrant = new VideoGrant({ room });
  else videoGrant = new VideoGrant();

  const token = new AccessToken(accountSid, apiKey, apiSecret);

  token.addGrant(videoGrant);
  token.identity = id;
  return token;
};

app.use(decodeIDToken);

app.get("/users", async (req, res) => {
  const user = req["currentUser"];
  const filterAll = req.query.filterAll === "true";
  if (filterAll) {
    try {
      await db
        .collection("users")
        .get()
        .then((allUsers) => {
          let data = [];
          allUsers.forEach((doc) => {
            let docData = doc.data();
            data.push(docData);
          });
          console.log(data);
          logMe.log(data);
          res.status(200).send(data);
          return null;
        });
    } catch (err) {
      console.log(err);
      logMe.log(err);
      res.status(400).send(err);
    }
  } else {
    if (user) {
      try {
        await db
          .collection("users")
          .doc(req.query.email)
          .get()
          .then((snapshot) => res.status(200).send(snapshot.data()));
      } catch (err) {
        console.log(err);
        logMe.log(err);
        res.status(400).send(err);
      }
    } else {
      res.status(401).send("Unauthorized!");
    }
  }
});

app.post("/users/photo/upload", uploadMiddleware, (req, res) => {
  console.log(req.files[0]);
  const user = req["currentUser"];
  if (user) {
    console.log(req.body, req.files[0]);
    try {
      if (!req.files[0]) {
        console.log("suck a dick chip");
        res.status(400).send("No file uploaded!");
        return;
      }
      const blob = storage.file(req.files[0].originalname);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.files[0].mimetype,
        },
      });
      blobStream.on("error", (err) => next(err));
      blobStream.on("finish", () => {
        const photoUrl = `https://firebasestorage.googleapis.com/v0/b/${
          storage.name
        }/o/${encodeURI(blob.name)}?alt=media`;
        res.status(200).send({
          fileName: req.files[0].originalname,
          fileLocation: photoUrl,
        });
      });
      blobStream.end(req.files[0].buffer);
    } catch (err) {
      console.log(err);
      res.status(400).send(`Failed to upload the image: ${err}`);
      return;
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.post("/users", async (req, res) => {
  try {
    await db.collection("users").doc(req.body.email).set({
      displayName: req.body.displayName,
      email: req.body.email,
      username: req.body.username,
      photoURL: "",
      medicines: [],
      illnesses: [],
      plans: [],
      journals: [],
      friends: {},
    });
    res.status(201).send("User created.");
  } catch (err) {
    logMe.log(err);
    res.status(400).send("Request failed: ", err);
  }
});

app.patch("/users", async (req, res) => {
  const user = req["currentUser"];
  if (user) {
    try {
      const userData = await db
        .collection("users")
        .doc(req.query.email)
        .get()
        .then((query) => query.data());

      await db
        .collection("users")
        .doc(req.query.email)
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
            : "",
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
      logMe.log(err);
      res.status(400).send("Request failed.");
    }
  } else {
    res.status(401).send("Unauthorized.");
  }
});

app.patch("/users/journal/entries", async (req, res) => {
  const user = req["currentUser"];
  if (user) {
    try {
      await db
        .collection("users")
        .doc(req.query.email)
        .update({
          journals: admin.firestore.FieldValue.arrayUnion({
            entry: req.body.entry,
            timestamp: req.body.timestamp,
          }),
        })
        .then(res.status(201).send("Journal entry added successfully."));
    } catch (err) {
      console.log(err);
      logMe.log(err);
      res.status(400).send("Failed to update journal entries.");
    }
  } else {
    res.status(401).send("Unauthorized.");
  }
});

app.get("/users/journal/entries", async (req, res) => {
  const user = req["currentUser"];
  if (user) {
    try {
      await db
        .collection("users")
        .doc(req.query.email)
        .get()
        .then((resp) => {
          const { journals } = resp.data();
          console.log(journals);
          res.status(200).send(journals);
          return null;
        });
    } catch (err) {
      console.log(err);
      logMe.log(err);
      res.status(400).send("Error retrieving information.");
    }
  } else {
    res.status(401).send("Unauthorized.");
  }
});

app.get("/users/planner/plans", async (req, res) => {
  const user = req["currentUser"];
  if (user) {
    try {
      await db
        .collection("users")
        .doc(req.query.email)
        .get()
        .then((resp) => {
          const { plans } = resp.data();

          res.status(200).send(plans);
          return null;
        });
    } catch (err) {
      logMe.log(err);
      console.log(err);
      res.status(400).send("Error retrieving information.");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.patch("/users/planner/plans", async (req, res) => {
  const user = req["currentUser"];
  if (user) {
    try {
      await db
        .collection("users")
        .doc(req.query.email)
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
      logMe.log(err);
      console.log(err);
      res.status(400).send("Error retrieving information.");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});
/*
 */
app.post("/users/friends", async (req, res) => {
  const isPending = req.query.isPending === "true";
  const email = req.query.email;
  const user = req["currentUser"];
  const newUser = req.query.newUser === "true";

  if (newUser) {
    try {
      let mittensData;
      await db
        .collection("users")
        .doc("seroful@seroful.tech")
        .get()
        .then((snapshot) => {
          mittensData = snapshot.data();
          return null;
        });

      let newUserData;
      await db
      .collection("users")
      .doc(email)
      .get()
      .then((snapshot) => {
        newUserData = snapshot.data();
        return null;
      });

      const mittensRef = db.collection("users").doc("seroful@seroful.tech");
      const mittensBatch = db.batch();
      mittensBatch.update(mittensRef, {
        "friends.current": admin.firestore.FieldValue.arrayUnion({
          username: req.body.username,
          photoURL: "",
          displayName: newUserData.displayName,
          friendSince: Date.now(),
        }),
      });
      mittensBatch.commit();

      await db
        .collection("users")
        .doc(req.query.email)
        .update({
          "friends.current": admin.firestore.FieldValue.arrayUnion({
            username: "Mittens",
            photoURL: mittensData.photoURL,
            displayName: mittensData.displayName,
            friendSince: Date.now(),
          }),
        });
      res.status(201).send("Added mittens!");
    } catch (e) {
      console.log(e);
      res.status(400).send("This shouldn't throw an error but it is.");
    }
  }

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
                "friends.pending": admin.firestore.FieldValue.arrayUnion({
                  username: req.body.requestee,
                  requestDate: Date.now(),
                }),
              });
            });

            return null;
          });
        await db
          .collection("users")
          .doc(req.query.email)
          .update({
            "friends.sent": admin.firestore.FieldValue.arrayUnion({
              username: req.body.username,
              requestDate: Date.now(),
            }),
          });
        res.status(201).send("Successfully sent friend request.");
      } catch (err) {
        logMe.log(err);
        console.log(err);
        res.status(400).send("Unable to send friend request.");
      }
    } else {
      try {
        let accepteeData;
        await db
          .collection("users")
          .doc(email)
          .get()
          .then((snapshot) => {
            accepteeData = snapshot.data();
            return null;
          });

        let addedData;
        await db
          .collection("users")
          .where("username", "==", req.body.username)
          .get()
          .then((querySnapshot) => {
            querySnapshot.docs.forEach((x) => (addedData = x.data()));
            return null;
          });

        const accepteeRef = db.collection("users").doc(email);
        const accepteeBatch = db.batch();
        accepteeBatch.update(accepteeRef, {
          "friends.current": admin.firestore.FieldValue.arrayUnion({
            username: req.body.acceptee,
            photoURL: accepteeData.photoURL,
            displayName: accepteeData.displayName,
            friendSince: Date.now(),
          }),
        });
        accepteeBatch.update(accepteeRef, {
          "friends.pending": admin.firestore.FieldValue.arrayRemove(
            accepteeData.friends.pending.find(
              (x) => (x.username = addedData.username)
            )
          ),
        });
        accepteeBatch.commit();

        await db
          .collection("users")
          .where("username", "==", req.body.username)
          .get()
          .then((query) => {
            query.docs.forEach((doc) => {
              const docRef = db.collection("users").doc(doc.id);
              const addedBatch = db.batch();
              addedBatch.update(docRef, {
                "friends.current": admin.firestore.FieldValue.arrayUnion({
                  username: req.body.acceptee,
                  photoURL: addedData.photoURL,
                  displayName: addedData.displayName,
                  friendSince: Date.now(),
                }),
              });
              addedBatch.update(docRef, {
                "friends.sent": admin.firestore.FieldValue.arrayRemove(
                  addedData.friends.sent.find(
                    (x) => (x.username = accepteeData.username)
                  )
                ),
              });
              addedBatch.commit();
            });
            return null;
          });

        res.status(201).send("Successfully added user.");
      } catch (err) {
        logMe.log(err);
        console.log(err);
        res.status(400).send("Unable to accept friend request.");
      }
    }
  } else {
    res.status(401).send("Unauthorized!");
  }
});

app.post("/users/messages", async (req, res) => {
  const user = req["currentUser"];
  const sender = req.body.sender;
  const recipient = req.body.recipient;
  const message = req.body.message;
  const email = req.query.email;

  if (user) {
    try {
      let recipientData;
      await db
        .collection("users")
        .where("username", "==", recipient)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((x) => (recipientData = x.data()));
          return null;
        });
      console.log(recipient);
      const senderData = await db.collection("messages").doc(email);
      senderData.update({
        sent: admin.firestore.FieldValue.arrayUnion({
          message: message,
          recipient: recipient,
          sender: sender,
          photoURL: recipientData.photoURL,
          sentAt: Date.now(),
        }),
      });
      console.log(senderData, "this is the sender data");
      console.log(recipientData, "this is the recipient data");

      const recipientUpdate =
        recipientData &&
        (await db.collection("messages").doc(recipientData.email));
      recipientUpdate.update({
        received: admin.firestore.FieldValue.arrayUnion({
          message: message,
          recipient: recipient,
          sender: sender,
          photoURL: senderData.photoURL,
          sentAt: Date.now(),
        }),
      });
      res.status(201).send("Successfully sent message.");
    } catch (e) {
      console.log(e);
      res.status(400).send("Unable to send message.");
    }
  } else {
    res.status(401).send("Unauthorized.");
  }
});

// .collection("users")
// .where("username", "==", req.body.username)
// .get()
// .then((query) => {
//   query.docs.forEach((doc) => {
//     const docRef = db.collection("users").doc(doc.id);
//     docRef.update({
//       "friends.pending": admin.firestore.FieldValue.arrayUnion({
//         username: req.body.requestee,
//         requestDate: Date.now(),
//       }),
//     });
//   });

app.post("/video", async (req, res) => {
  const newConnection = req.query.newConnection === "true";
  const user = req["currentUser"];
  if (user) {
    if (newConnection) {
      const token = videoToken(req.body.identity, req.query.room);
      res.contentType("application/json");
      console.log(token);
      res.status(201).send(
        JSON.stringify({
          token: token.toJwt(),
        })
      );
    } else {
      try {
        client.video.rooms
          .create({
            recordParticipantsOnConnect: true,
            uniqueName: req.body.roomName,
            type: "group",
          })
          .then((room) => {
            console.log(room);
            const token = videoToken(req.body.identity, req.body.roomName);
            console.log(token);
            res.contentType("application/json");
            res.status(201).send(
              JSON.stringify({
                token: token.toJwt(),
              })
            );
            return null;
          })
          .catch((err) => {
            logMe.log(err);
            console.log(err);
            res.status(400).send("Error grabbing video room.");
          });
      } catch (err) {
        logMe.log(err);
        console.log(err);
        res.status(400).send("Error grabbing video room.");
      }
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.get("/video", async (req, res) => {
  const user = req["currentUser"];

  if (user) {
    try {
      return client.video.rooms
        .list({ status: "in-progress", limit: 15 })
        .then((rooms) => {
          const roomList = [];
          rooms.forEach((r) => roomList.push(r));
          res.status(201).send(roomList);
          return null;
        });
    } catch (e) {
      console.log(e);
      res.status(400).send("Error grabbing room lists.");
    }
  } else {
    res.status(401).send("Unauthorized.");
  }
});

//  DO NOT TOUCH THIS LINE
exports.api = functions.https.onRequest(app);

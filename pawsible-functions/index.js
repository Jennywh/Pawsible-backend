const functions = require("firebase-functions");
const admin = require('firebase-admin');
var serviceAccount = require("./adminSdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// http://127.0.0.1:5001/pawsible-47dfd/us-central1/helloWorld
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


// https://us-central1-pawsible-33335.cloudfunctions.net/users
exports.users = functions.https.onRequest(async (request, response) => {
  functions.logger.info("Fetching users from Firestore", {structuredData: true});

  try {
    const usersSnapshot = await admin.firestore().collection('users').get();
    const users = [];
    usersSnapshot.forEach(doc => {
      users.push({id: doc.id, ...doc.data()});
    });
    response.json(users);
  } catch (error) {
    functions.logger.error("Error fetching users", error);
    response.status(500).send("Error fetching users");
  }
});
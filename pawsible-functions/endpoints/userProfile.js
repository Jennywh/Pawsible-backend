const functions = require("firebase-functions");
const admin = require("../utils/firebaseAdmin");
const logger = functions.logger;

exports.getProfile = functions.https.onRequest(async (request, response) => {
  if (request.method !== "GET") {
    response.status(405).send("Method Not Allowed");
    return;
  } else if (!request.query.uid) {
    response.status(400).send("Missing user ID");
    return;
  }
  logger.info("Getting user profile");

  try {
    const snapshot = await admin
      .firestore()
      .collection("users")
      .doc(request.query.uid)
      .get();

    if (snapshot.exists) {
      response.json(snapshot.data());
    } else {
      response.status(404).send("User not found");
    }
  } catch (error) {
    logger.error("Error while getting user profile", error);
    response.status(500).send("Error fetching user profile");
  }
});

exports.createOrUpdateProfile = functions.https.onRequest(
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).send("Method Not Allowed");
      return;
    } else if (!request.query.uid) {
      response.status(400).send("Missing user ID");
      return;
    }
    logger.info("Creating or updating user profile");

    try {
      const userProfile = request.body;
      if (!userProfile || Object.keys(userProfile).length === 0) {
        response.status(400).send("Missing profile data");
        return;
      }

      const userRef = admin
        .firestore()
        .collection("users")
        .doc(request.query.uid);
      await userRef.set(userProfile, { merge: true });
      response.status(200).send("Profile updated successfully");
    } catch (error) {
      logger.error("Error while creating or updating user profile", error);
      response.status(500).send("Error processing user profile");
    }
  }
);

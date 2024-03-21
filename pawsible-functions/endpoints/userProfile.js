const functions = require("firebase-functions");
const admin = require("../utils/firebaseAdmin");

exports.getProfile = functions.https.onRequest(async (request, response) => {
  if (request.method !== "GET") {
    response.status(405).send("Method Not Allowed");
    return;
  }

  functions.logger.info("Getting user profile", { structuredData: true });

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
    functions.logger.error("Error while getting user profile", error);
    response.status(500).send("Error fetching user profile");
  }
});

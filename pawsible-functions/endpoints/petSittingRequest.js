const functions = require("firebase-functions");
const admin = require("../utils/firebaseAdmin");

async function fetchRequests(collection, queryField, uid) {
  const snapshot = await admin
    .firestore()
    .collection(collection)
    .where(queryField, "==", uid)
    .get();

  return snapshot.docs.map((doc) => doc.id);
}

exports.getRequests = functions.https.onRequest(async (request, response) => {
  if (request.method !== "GET") {
    response.status(405).send("Method Not Allowed");
    return;
  }

  functions.logger.info("Getting requests associated to the user", {
    structuredData: true,
  });

  try {
    const uid = request.query.uid;
    const [receivedRequests, createdRequests] = await Promise.all([
      fetchRequests("requests", "targetUser", uid),
      fetchRequests("requests", "createUser", uid),
    ]);

    response.json({ receivedRequests, createdRequests });
  } catch (error) {
    functions.logger.error("Error while getting requests", error);
    response.status(500).send("Error fetching requests");
  }
});

async function addRequestToFirestore(requestData) {
  const documentReference = await admin
    .firestore()
    .collection("requests")
    .add(requestData);
  return documentReference.id;
}

exports.addRequest = functions.https.onRequest(async (request, response) => {
  functions.logger.info("Adding a new request", { structuredData: true });

  if (request.method !== "POST") {
    response.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const requestData = request.body;

    if (
      !requestData.targetUser ||
      !requestData.createUser ||
      !requestData.details
    ) {
      response.status(400).send("Missing required request data");
      return;
    }

    const documentId = await addRequestToFirestore(requestData);
    response.json({ success: true, id: documentId });
  } catch (error) {
    functions.logger.error("Error while adding new request", error);
    response.status(500).send("Error adding new request");
  }
});

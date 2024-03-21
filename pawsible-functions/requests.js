const functions = require("firebase-functions");
const admin = require('firebase-admin');
var serviceAccount = require("./adminSdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.getRequests = functions.https.onRequest(async (request, response) => {
  functions.logger.info("Getting requests associated to the user", {structuredData: true});

  try {
    admin.auth().verifyIdToken(request.query.token).then((decodedToken) => {
      const uid = decodedToken.uid;
      const requestsSnapshot = admin.firestore().collection('requests').where("target", "==", uid).get();
      const requestResponse = [];
      requestsSnapshot.forEach(request => {
        requestResponse.push({id: doc.id, ...doc.data()});
    });
    response.json(requestResponse);
    })
  } catch(error) {
    functions.logger.info("error while getting requests: ", error);
  }

});
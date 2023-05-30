import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const FIREBASE_COLLECTION_NAME = "<ADD_YOUR_COLLECTION_NAME_HERE>";

exports.hekaWebhook = functions.https.onRequest(async (req, res) => {
  const uuid = req.body.uuid;
  const data = req.body.data;

  if (!uuid || !data) {
    // This is an error case, as "message" is required.
    res.status(400).send("Invalid request");
    return;
  }

  for (const key of Object.keys(data)) {
    const value = JSON.parse(JSON.stringify(data[key]));
    for (const val of value) {
      val["start_time"] = admin.firestore.Timestamp.fromDate(
        new Date(val["start_time"])
      );
      val["end_time"] = admin.firestore.Timestamp.fromDate(
        new Date(val["end_time"])
      );
      await admin
        .firestore()
        .collection(FIREBASE_COLLECTION_NAME)
        .doc(uuid)
        .collection(key)
        .add(val);
    }
  }

  // Return a success response.
  await res.status(200).send("Success");
});

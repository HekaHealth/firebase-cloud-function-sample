var functions = require("firebase-functions");
var admin = require("firebase-admin");

admin.initializeApp();
var FIREBASE_COLLECTION_NAME = "<ADD_YOUR_COLLECTION_NAME_HERE>";

exports.hekaWebhook = functions.https.onRequest(function (req, res) {
  var uuid = req.body.uuid;
  var data = req.body.data;

  if (!uuid || !data) {
    // This is an error case, as "message" is required.
    res.status(400).send("Invalid request");
    return;
  }

  var keys = Object.keys(data);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = JSON.parse(JSON.stringify(data[key]));
    for (var j = 0; j < value.length; j++) {
      var val = value[j];
      val["start_time"] = admin.firestore.Timestamp.fromDate(
        new Date(val["start_time"])
      );
      val["end_time"] = admin.firestore.Timestamp.fromDate(
        new Date(val["end_time"])
      );
      admin
        .firestore()
        .collection(FIREBASE_COLLECTION_NAME)
        .doc(uuid)
        .collection(key)
        .add(val);
    }
  }

  // Return a success response.
  res.status(200).send("Success");
});

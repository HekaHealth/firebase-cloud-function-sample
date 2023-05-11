# Example firebase cloud function

If you are using Firebase as your backend for Heka integration, you can use Firebase Cloud Functions to handle webhook requests. Firebase Cloud Functions are a serverless solution that automatically scales to meet traffic demands, making them an ideal solution for handling webhook requests.

## Usage

To use the example function provided in this repository, follow these steps:

### First time setup

If you have not yet set up Firebase Cloud Functions for your project, follow these steps:

- Enable billing for your Firebase project, since Cloud Functions require a billing account.
- Enable Firebase Cloud Functions in your project from the Firebase console.
- Set up Firebase Cloud Function code using `firebase init functions`.

### Using the function

This repository provides TypeScript and JavaScript files that demonstrate how to use Firebase Cloud Functions to integrate Heka with your Firebase backend. Follow these steps to use the function:

- Copy the code from either the TypeScript or JavaScript file and paste it into the `index.js` or `index.ts` file in the `src/` folder of your Firebase Cloud Functions project.
- In the `index.js` or `index.ts` file, update the value of `FIREBASE_COLLECTION_NAME` to match the name of the collection in which you want to store Heka data.
- Deploy the function using either `npm run deploy` or `firebase deploy --only functions`.
- In the Firebase console, note the URL mentioned under the function name.
- In the Heka dashboard, go to the webhook section and add the URL you noted in the previous step.

## How it works

The Cloud Function creates a Firebase document for each user and a subcollection for each data type. Individual entries gathered from various data sources are stored inside the subcollections.

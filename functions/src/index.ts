// import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const express = require('express');
const { Nuxt } = require('nuxt');

const app = express();
const nuxt = new Nuxt({
    dev: false,
    buildDir: 'nuxt',
    build: {
        publicPath: '/assets/'
    }
});

function handleRequest(req: any, res: any) {
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
  return new Promise((resolve, reject) => {
      nuxt.ready().then(() => {
        nuxt.render(req, res, (promise: any) => {
          promise.then(resolve).catch(reject);
        });
      });
  });
}

app.use(handleRequest);
exports.ssrapp = functions.https.onRequest(app);

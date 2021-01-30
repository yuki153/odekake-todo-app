import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
const config = {
  // apikey は ci で build 前に置換する
  apiKey: "XXXXXXXXXX",
  authDomain: "first-project-42ca3.firebaseapp.com",
  databaseURL: "https://first-project-42ca3.firebaseio.com",
  projectId: "first-project-42ca3",
  storageBucket: "first-project-42ca3.appspot.com",
  messagingSenderId: "506191762133",
  appId: "1:506191762133:web:3fe97fab95e0c2637c085c",
  measurementId: "G-JB72MW44WX"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;


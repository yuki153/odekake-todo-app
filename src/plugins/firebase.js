import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "XXXXXXXXXX",
  authDomain: "XXXXXXXXXXX.firebaseapp.com",
  databaseURL: "https://XXXXXXXXXX.firebaseio.com",
  projectId: "XXXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXX.appspot.com",
  messagingSenderId: "XXXXXXXXXXXXXX"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;


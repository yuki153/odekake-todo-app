import firebase from "~/plugins/firebase";

export default class {
  constructor() {
  }
  async getAuthState() {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((result) => {
        if (result) {
          console.log(result);
          resolve(result);
        } else {
          resolve(false);
        }
      });
    });
  }
  async getStoreData(collection ,docName) {
    const docRef = await firebase.firestore().collection(collection).doc(docName);
    const res = await docRef.get().catch((err) => console.log(err));
    return res.data();
  }
  async updateStoreData(collectionName, docName) {
    const target = firebase.firestore().collection(collectionName).doc(docName);
    await target.update({ test: true }).catch((err) => console.log(err))
    await console.log('update success');
  }
  async setStoreData(docName) {
    const docRef = await firebase.firestore().collection('test').doc(docName).set({
      first: 'hello',
      last: 'world',
      born: 1815
    }).catch((err) => console.log("Error adding document: ", err));
    await console.log("Document written with ID: ", docRef.id);
  }
}
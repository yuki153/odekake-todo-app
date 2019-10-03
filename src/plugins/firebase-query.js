import firebase from "~/plugins/firebase";

export default class {
  constructor() {
  }
  async getAuthState() {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((result) => {
        if (result) {
          // console.log(result);
          resolve(result);
        } else {
          resolve(false);
        }
      });
    });
  }
  async createNewUser(collection, docName) {
    const docRef = await firebase.firestore().collection(collection);
    // console.log(docRef);
    await docRef.doc(docName).set({
      list: [{
        name: 'ExampleTODO',
        value: 'example',
      }]
    });
    await docRef.doc(docName).collection('data').doc('example').set({}).catch((err) => {
      // console.log('ERROR::createNewUser');
      // console.log(err);
    });
  }
  async getStoreData(collection ,docName, subCollection, subDocName) {
    const docRef = await firebase.firestore().collection(collection).doc(docName)
      .collection(subCollection).doc(subDocName);
    const res = await docRef.get().catch((err) => console.log(err));
    return res.data();
  }
  async updateStoreData(collection ,docName, subCollection, subDocName, field) {
    const docRef = await firebase.firestore().collection(collection).doc(docName)
      .collection(subCollection).doc(subDocName);
    await docRef.update(field).catch((err) => console.log(err));
    // await console.log('update success');
  }
  async setStoreData(collection ,docName, subCollection, subDocName, data) {
    const docRef = await firebase.firestore().collection(collection).doc(docName)
      .collection(subCollection).doc(subDocName);
    await docRef.set(data, {merge: true}).catch((err) => console.log("Error adding document: ", err));
    // await console.log("Document written with ID: ", docRef.id);
  }
  async delStoreData(collection ,docName, subCollection, subDocName, fieldName) {
    const docRef = await firebase.firestore().collection(collection).doc(docName)
      .collection(subCollection).doc(subDocName);
    const delData = {};
    const key = fieldName;
    delData[key] = (() => firebase.firestore.FieldValue.delete())();
    await docRef.update(delData).catch((err) => console.log("Error delete field: ", err));
  }
  async addNewDoc(collection ,docName, subCollection, todoname) {
    let docRef = await firebase.firestore().collection(collection).doc(docName)
      .collection(subCollection);
    const newDoc = await docRef.add({});
    // console.log(newDoc);
    docRef = await firebase.firestore().collection('todoItem').doc(docName);
    await docRef.update({
      list: firebase.firestore.FieldValue.arrayUnion({
        name: todoname,
        value: newDoc.id,
      })
    }).catch((err) => console.log("Error adding document: ", err));
    return newDoc.id;
  }
}

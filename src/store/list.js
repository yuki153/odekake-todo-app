import firebase from "~/plugins/firebase";

export const state = () => ({
  data: [],
});

export const mutations = {
  setList(state, data) {
    // console.log('MUTATIONS::setList');
    // console.log(data);
    state.data = data;
  }
}

export const actions = {
  async getList(context, payload) {
    // console.log('ACTIONS::getList');
    const docRef = await firebase.firestore().collection('todoItem').doc(payload.uid);
    const docSnapShot = await docRef.get().catch((err) => console.log(err));
    // https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentSnapshot
    // console.log(docSnapShot.get('list'));
    context.commit('setList', docSnapShot.get('list'));
  }
}

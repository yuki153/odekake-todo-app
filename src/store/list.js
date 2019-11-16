import fb from "~/plugins/firebase";

export const state = () => ({
  data: [],
  isDeletable: false,
  deletionData: [],
});

export const mutations = {
  setList(state, data) {
    // console.log('MUTATIONS::setList');
    state.data = data;
  },
  appendList(state, data) {
    state.data.push(data)
  },
  removeList(state, indices) {
    for (const idx of indices) {
      state.data.splice(idx, 1);
    }
  },
  isDeletable(state) {
    state.isDeletable = !state.isDeletable;
  },
  appendDeletionData(state, data) {
    state.deletionData.push(data)
  },
  removeDeletionData(state, idx) {
    state.deletionData.splice(idx, 1);
  },
  resetDeletionData(state) {
    state.deletionData = [];
  }
}

export const actions = {
  async getList(context, payload) {
    const docRef = await fb.firestore().collection('todoItem').doc(payload.uid);
    const docSnapShot = await docRef.get().catch((err) => console.log(err));
    // https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentSnapshot
    // console.log(docSnapShot.get('list'));
    context.commit('setList', docSnapShot.get('list'));
  },
  async deleteList(context, payload) {
    const { uid, data } = payload;
    const batch = await fb.firestore().batch();
    const listRef = await fb.firestore().collection('todoItem').doc(uid);
    const curDisplayList = context.state.data;
    let indices = [];
    try {
      for (const datum of data) {
        batch.update(listRef, {
          'list': fb.firestore.FieldValue.arrayRemove(datum)
        });
        const docRef = await fb.firestore().collection('todoItem').doc(uid).collection('data').doc(datum.value);
        batch.delete(docRef);
        const idx = curDisplayList.findIndex(item => item.value === datum.value);
        indices.push(idx);
      }
      await batch.commit();
      context.commit('removeList', indices);
    } catch (err) {
      console.log(err);
    }
  }
}

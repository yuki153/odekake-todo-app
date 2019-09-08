export const state = () => ({
  isUser: false,
  uid: '',
});

export const mutations = {
  setUser(state, payload) {
    state.isUser = payload.bool;
  },
  setUid(state, payload) {
    state.uid = payload.uid;
  }
};

export const getters = {
  isUser(state) {
    console.log('getters');
    return state.isUser; //!!Object.keys(state.user).length;
  },
  uid(state) {
    return state.uid;
  }
};

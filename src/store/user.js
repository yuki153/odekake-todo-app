export const state = () => ({
  isUser: false,
});

export const mutations = {
  setUser(state, payload) {
    state.isUser = payload.bool;
  },
};

export const getters = {
  isUser(state) {
    console.log('getters');
    return state.isUser; //!!Object.keys(state.user).length;
  },
};

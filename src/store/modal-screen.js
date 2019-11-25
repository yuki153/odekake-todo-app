
export const state = () => ({
  isShown: false,
});

export const mutations = {
  enableState(state) {
    state.isShown = true;
  },
  disableState(state) {
    state.isShown = false;
  }
};

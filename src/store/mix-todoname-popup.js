
export const state = () => ({
  isShown: false,
});

export const mutations = {
  show(state) {
    state.isShown = true;
  },
  hide(state) {
    state.isShown = false;
  }
};

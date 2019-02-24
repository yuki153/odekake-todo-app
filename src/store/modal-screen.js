
export const state = () => ({
  isShow: false,
});

export const mutations = {
  enableState(state) {
    state.isShow = true;
  },
  disableState(state) {
    state.isShow = false;
  }
};

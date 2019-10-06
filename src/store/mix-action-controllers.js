export const state = () => ({
  isActived: false,
  buttons: {
    add: true,
    del: false,
  }
});

export const mutations = {
  isActived(state) {
    state.isActived = !state.isActived;
  },
  enableAddbutton(state) {
    state.buttons.add = true;
    state.buttons.del = false;
  },
  enableDelbutton(state) {
    state.buttons.add = false;
    state.buttons.del = true;
    state.isActived = false;
  },
  initializeState(state) {
    state.isActived = false;
    state.buttons.add = true;
    state.buttons.del = false;
  },
}

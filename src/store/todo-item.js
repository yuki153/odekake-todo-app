export const state = () => ({
  id: 0,
  data: [],
  isDeletable: false,
  deletionIds: [],
});

export const mutations = {
  incrementToId(state) {
    state.id++;
  },
  setData(state, payload) {
    const data = {
      id: state.id++,
      hexCode: payload.hexCode,
      svgName: payload.svgName,
      text: payload.text || '',
      time: payload.time || '',
    }
    console.log('setData', data.time);
    state.data.push(data);
  },
  isDeletable(state) {
    state.isDeletable = !state.isDeletable;
  },
  addDeletionIds(state, payload) {
    state.deletionIds.push(payload.id);
  },
  removeDeletionIds(state, payload) {
    const idx = state.deletionIds.indexOf(payload.id);
    if (idx >= 0) state.deletionIds.splice(idx, 1);
    console.log(state.deletionIds);
  },
  deleteData(state) {
    state.isDeletable = false;
    const itemLen = state.data.length;
    const items = state.data;
    let indices = [];
    for (let i = 0; i < itemLen; i++) {
      for (const deleteId of state.deletionIds) {
        if (items[i].id == deleteId) indices.push(i);
      }
    }
    for (let i = 0; i < indices.length; i++) {
      indices[i] -= i; // 配列のズレ補正
      state.data.splice(indices[i], 1);
    }
  }
}


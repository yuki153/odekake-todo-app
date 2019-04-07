import FirebaseQuery from "~/plugins/firebase-query.js";
const fb = new FirebaseQuery();

export const state = () => ({
  id: 0,
  data: [],
  isDeletable: false,
  deletionIds: [],
});

export const mutations = {
  init(state, payload) {
    state.id = payload.id; // TODO: 並び順問題
    const data = {
      id: state.id++,
      hexCode: payload.hexCode,
      svgName: payload.svgName,
      text: payload.text || '',
      time: payload.time || { h: '00', m: '00' },
    };
    state.data.push(data);
  },
  setData(state, payload) {
    const data = {
      id: state.id++, // state.id は data.id に格納された後 +1 される
      hexCode: payload.hexCode,
      svgName: payload.svgName,
      text: payload.text || '',
      time: payload.time || { h: '00', m: '00' },
    }
    const fbData = {};
    const key = `item${data.id}`;
    fbData[key] = data;
    fb.setStoreData('todoItem', 'devUser1', 'data', 'plan1', fbData);
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
        // delete 対象の ID を持つ item の配列番号を取得
        if (items[i].id == deleteId) indices.push(i);
        // db の場合は直接 ID 名で field から特定できるため削除
        fb.delStoreData('todoItem', 'devUser1', 'data', 'plan1', `item${deleteId}`);
      }
    }
    for (let i = 0; i < indices.length; i++) {
      indices[i] -= i; // 配列のズレ補正
      state.data.splice(indices[i], 1);
    }
  }
}


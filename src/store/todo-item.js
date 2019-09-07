import FirebaseQuery from "~/plugins/firebase-query.js";
const fb = new FirebaseQuery();

export const state = () => ({
  id: 0,
  currentDataKeyName: 'plan1',
  data: [],
  isDeletable: false,
  deletionIds: [],
});

export const mutations = {
  init(state, payload) {
    const { todo } = payload;
    for (const key of Object.keys(todo)) {
      state.data.push({
        id: todo[key].id,
        hexCode: todo[key].hexCode,
        svgName: todo[key].svgName,
        text: todo[key].text || '',
        time: todo[key].time || { h: '00', m: '00' },
      });
    }
    const lastIndex = state.data.length - 1;
    state.id = state.data[lastIndex].id + 1;
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
    fb.setStoreData('todoItem', 'devUser1', 'data', state.currentDataKeyName, fbData);
    state.data.push(data);
  },
  updateData(state, payload) {
    const itemLen = state.data.length;
    const items = state.data;
    for (let i = 0; i < itemLen; i++) {
      if (items[i].id == payload.id) {
        console.log(items[i]);
        items[i].text = payload.text;
        items[i].time = payload.time;
        items[i].hexCode = payload.hexCode;
        items[i].svgName = payload.svgName;
        const field = {};
        const key = `item${payload.id}`;
        field[key] = payload;
        fb.updateStoreData('todoItem', 'devUser1', 'data', state.currentDataKeyName, field);
      }
    }
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
        fb.delStoreData('todoItem', 'devUser1', 'data', state.currentDataKeyName, `item${deleteId}`);
      }
    }
    for (let i = 0; i < indices.length; i++) {
      indices[i] -= i; // 配列のズレ補正
      state.data.splice(indices[i], 1);
    }
  },
  switchToDo(state, payload) {
    console.log('Mutations::switchToDo');
    state.currentDataKeyName = payload.key;
    state.id = 0;
    state.data = [];
    console.log('Mutations::end switchToDo');
  }
}

export const actions = {
  async createNewData(context, payload) {
    console.log('actions::createNewDate');
    const key = await fb.addNewDoc('todoItem', 'devUser1', 'data', payload.todoname);
    context.commit('switchToDo', { key });
  },
  async getTodo(context, payload) {
    console.log('actions::getTodo');
    const todo = await fb.getStoreData('todoItem','devUser1', 'data', payload.uid);
    if (todo) context.commit('init' ,{ todo });
  },
}

export const getters = {
  uid(state) {
    console.log('getters');
    return state.currentDataKeyName;
  },
};


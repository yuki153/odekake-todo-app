import FirebaseQuery from "~/plugins/firebase-query.js";
const fb = new FirebaseQuery();

export const state = () => ({
  id: 0,
  currentDataKeyName: 'example',
  currentTodoname: 'ExampleTODO',
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
    if (state.data.length) {
      const lastIndex = state.data.length - 1;
      state.id = state.data[lastIndex].id + 1;
    }
  },
  setData(state, payload) {
    const { todoData, uid } = payload;
    const data = {
      id: state.id++, // state.id は data.id に格納された後 +1 される
      hexCode: todoData.hexCode,
      svgName: todoData.svgName,
      text: todoData.text || '',
      time: todoData.time || { h: '00', m: '00' },
    }
    const fbData = {};
    const key = `item${data.id}`;
    fbData[key] = data;
    fb.setStoreData('todoItem', uid, 'data', state.currentDataKeyName, fbData);
    state.data.push(data);
  },
  updateData(state, payload) {
    const { todoData, uid } = payload;
    const itemLen = state.data.length;
    const items = state.data;
    for (let i = 0; i < itemLen; i++) {
      if (items[i].id == todoData.id) {
        items[i].text = todoData.text;
        items[i].time = todoData.time;
        items[i].hexCode = todoData.hexCode;
        items[i].svgName = todoData.svgName;
        const field = {};
        const key = `item${todoData.id}`;
        field[key] = todoData;
        fb.updateStoreData('todoItem', uid, 'data', state.currentDataKeyName, field);
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
  },
  deleteData(state, payload) {
    state.isDeletable = false;
    const itemLen = state.data.length;
    const items = state.data;
    let indices = [];
    for (let i = 0; i < itemLen; i++) {
      for (const deleteId of state.deletionIds) {
        // delete 対象の ID を持つ item の配列番号を取得
        if (items[i].id == deleteId) indices.push(i);
        // db の場合は直接 ID 名で field から特定できるため削除
        fb.delStoreData('todoItem', payload.uid, 'data', state.currentDataKeyName, `item${deleteId}`);
      }
    }
    for (let i = 0; i < indices.length; i++) {
      indices[i] -= i; // 配列のズレ補正
      state.data.splice(indices[i], 1);
    }
  },
  switchToDo(state, payload) {
    state.currentDataKeyName = payload.key;
    state.currentTodoname = payload.name;
    state.id = 0;
    state.data = [];
  }
}

export const actions = {
  async createNewData(context, payload) {
    const key = await fb.addNewDoc('todoItem', payload.uid, 'data', payload.todoname);
    context.commit('switchToDo', { key, name: payload.todoname });
  },
  async getTodo(context, payload) {
    const todo = await fb.getStoreData('todoItem',payload.uid, 'data', payload.docId);
    if (todo) {
      context.commit('init' ,{ todo });
    } else {
      await fb.createNewUser('todoItem', payload.uid);
    }
  },
}

export const getters = {
  docId(state) {
    return state.currentDataKeyName;
  },
};


// [nuxt] Error while initializing app Error:
// [vuex] must call Vue.use(Vuex) before creating a store instance.
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// vuex basic usage
// https://qiita.com/nasum/items/d17c0a628e6c32616b85
const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      counter: 0,
      isShowModal: false,
      isUser: false,
      todoItemId: 0,
      todoItem: [],
      isDeletable: false,
      deleteIdList: [],
    }),
    mutations: {
      incrementToId(state) {
        state.todoItemId++;
      },
      changeModalState(state) {
        state.isShowModal = !state.isShowModal;
      },
      setUser(state, payload) {
        state.isUser = payload.bool;
      },
      setTodoItem(state, payload) {
        const data = {
          id: state.todoItemId++,
          hexCode: payload.hexCode,
          svgPath: payload.svgPath,
        }
        state.todoItem.push(data);
      },
      isDeletable(state) {
        state.isDeletable = !state.isDeletable;
      },
      addDeleteIdList(state, payload) {
        state.deleteIdList.push(payload.id);
      },
      removeDeleteIdList(state, payload) {
        const idx = state.deleteIdList.indexOf(payload.id);
        if (idx >= 0) state.deleteIdList.splice(idx, 1);
        console.log(state.deleteIdList);
      },
      deleteTodoItem(state) {
        state.isDeletable = false;
        const itemLen = state.todoItem.length;
        const items = state.todoItem;
        let indices = [];
        for (let i = 0; i < itemLen; i++) {
          for (const deleteId of state.deleteIdList) {
            if (items[i].id == deleteId) indices.push(i);
          }
        }
        for (let i = 0; i < indices.length; i++) {
          indices[i] -= i; // 配列のズレ補正
          state.todoItem.splice(indices[i], 1);
        }
      }
    },
    actions: {
      setUser(context, payload) {
        console.log('actions');
        context.commit({
          type: 'setUser',
          bool: payload.bool,
        });
      },
    },
    getters:{
      isUser(state) {
        console.log('getters');
        return state.isUser; //!!Object.keys(state.user).length;
      },
    }
  })
}

export default createStore

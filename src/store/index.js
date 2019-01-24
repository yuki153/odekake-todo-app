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
      isUser: false,
    }),
    mutations: {
      increment(state) {
        state.counter++
      },
      setUser(state, payload) {
        state.isUser = payload.bool;
        console.log('mutations');
      }
    },
    actions: {
      setUser(context, payload) {
        console.log('actions');
        context.commit({
          type: 'setUser',
          bool: payload.bool,
        });
      }
    },
    getters:{
      isUser(state) {
        console.log('getters');
        return state.isUser; //!!Object.keys(state.user).length;
      }
    }
  })
}

export default createStore

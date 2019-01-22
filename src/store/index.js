// [nuxt] Error while initializing app Error:
// [vuex] must call Vue.use(Vuex) before creating a store instance.
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// vuex basic usage
// https://qiita.com/nasum/items/d17c0a628e6c32616b85
const createStore = () => {
  return new Vuex.Store({
    strict: false,
    state: () => ({
      counter: 0,
      user: {},
    }),
    mutations: {
      increment(state) {
        state.counter++
      },
      setUser(state, payload) {
        state.user = payload.obj;
      }
    },
    actions: {
      setUser(context, payload) {
        context.commit({
          type: 'setUser',
          obj: payload.obj,
        });
      }
    },
    getters:{
      isLogin(state) {
        return !!Object.keys(state.user).length;
      }
    }
  })
}

export default createStore

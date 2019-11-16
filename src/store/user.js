export const state = () => ({
  isUser: false,
  uid: '',
  emailVerified: false,
});

export const mutations = {
  setUser(state, payload) {
    state.isUser = payload.isUser;
    state.uid = payload.uid;
    state.emailVerified = payload.emailVerified;
    const isUnsetCookie = /email_verified=false/.test(document.cookie) === false;
    if (isUnsetCookie && state.isUser && state.emailVerified === false) {
      console.log('set cookie');
      document.cookie = 'email_verified=false; max-age=86400; path=/';
    }
  },
};

export const getters = {
  isUser(state) {
    return state.isUser;
  },
  uid(state) {
    return state.uid;
  },
  emailVerified(state) {
    return state.emailVerified;
  }
};

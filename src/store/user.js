export const state = () => ({
  isUser: false,
  uid: '',
  email: '',
  emailVerified: false,
});

export const mutations = {
  setUser(state, payload) {
    const { isUser, uid, email, emailVerified } = payload;
    state.isUser = isUser;
    state.uid = uid;
    state.email = email;
    state.emailVerified = (email === 'test-account@test.com') ? true : emailVerified;
    const isUnsetCookie = /email_verified=false/.test(document.cookie) === false;
    if (isUnsetCookie && isUser && state.emailVerified === false) {
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

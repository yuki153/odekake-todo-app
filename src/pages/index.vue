<template>
  <div class="main">
    <app-loadding :isHide="isUser"/>
    <mix-lock-screen/>
    <section class="main__section">
      <todo-list/>
      <mix-modal-screen/>
      <mix-action-button/>
      <mix-todoname-popup :isShown="isShown"/>
    </section>
  </div>
</template>

<script>
import FirebaseQuery from "~/plugins/firebase-query.js";
import AppLoadding from '~/components/simple/app-loading';
import MixActionButton from '~/components/mix/mix-action-button';
import MixModalScreen from '~/components/mix/mix-modal-screen';
import MixTodonamePopup from "~/components/mix/mix-todoname-popup";
import TodoList from '~/components/mix/todo-list';
import MixLockScreen from '~/components/mix/mix-lock-screen';
import fb from "~/plugins/firebase";
import { mapState } from 'vuex';

export default {
  layout: 'default',
  components: {
    AppLoadding,
    MixActionButton,
    MixModalScreen,
    MixTodonamePopup,
    TodoList,
    MixLockScreen
  },
  computed: {
    ...mapState('user', [
      'isUser',
      'emailVerified'
    ]),
    ...mapState('mix-todoname-popup', [
      'isShown'
    ]),
    ...mapState('list', {
      listData: (state) => state.data,
    }),
    ...mapState('todo-item', [
      'currentDataKeyName'
    ]),
  },
  methods: {
    getAuthState() {
      return new Promise((resolve) => {
        window.unsubscribe = fb.auth().onAuthStateChanged(user => user ? resolve(user) : resolve(false));
      });
    },
    /**
     * メール認証に必要なアクションをユーザーが行った場合、
     * store の user.js にて cookie に email_verified がセットされる。
     * メール認証後は再ログインしないと firestore のユーザデータが更新されないため token refresh を行う
     *
     * @param user {Object} firebase.auth() から取得のユーザデータ
     */
    async refreshFirebaseToken(user) {
      if (/email_verified=false/.test(document.cookie)) {
        await user.getIdToken(true);
        console.log('token refresh ok');
        document.cookie = 'email_verified=; max-age=0; path=/';
      }
    }
  },
  async mounted() {
    if (window.unsubscribe) window.unsubscribe();
    if(this.currentDataKeyName === '') {
      const user = (this.isUser) ? fb.auth().currentUser : await this.getAuthState();
      if (user && user.emailVerified) {
        await this.refreshFirebaseToken(user);
        await this.$store.dispatch('list/getList', { uid: user.uid });
        this.$store.commit('user/setUser', {
          isUser: true,
          uid: user.uid,
          emailVerified: user.emailVerified
        });
        this.$store.commit('todo-item/setTodoState', {
          key: this.listData ? this.listData[0].value : 'example',
          name: this.listData ? this.listData[0].name : 'ExampleTODO',
        });
        this.$store.dispatch('todo-item/getTodo', {
          uid: user.uid,
          docId: this.listData ? this.listData[0].value : 'example',
        });
      } else if (user) {
        this.$store.commit('user/setUser', {
          isUser: true,
          uid: user.uid,
          emailVerified: user.emailVerified
        });
      } else {
        this.$router.push("/sign-in");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  &__section {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    height: calc(100vh - (#{$app-header-height + $app-footer-height}));
    padding: 16px 16px 0;
  }
}
</style>

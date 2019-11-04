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
  },
  methods: {
    getAuthState() {
      return new Promise((resolve) => {
        fb.auth().onAuthStateChanged(result => result ? resolve(result) : resolve(false));
      });
    },
    setUser(user) {
      this.$store.commit('user/setUser', { bool: true });
      this.$store.commit('user/setUid', { uid: user.uid });
      this.$store.commit('user/setEmailVerified', { bool: user.emailVerified });
    },
  },
  async mounted() {
    if (!this.isUser) {
      const user = await this.getAuthState();
      if (user && user.emailVerified) {
        await this.$store.dispatch('list/getList', { uid: user.uid });
        this.setUser(user);
        this.$store.commit('todo-item/setTodoState', {
          key: this.listData ? this.listData[0].value : 'example',
          name: this.listData ? this.listData[0].name : 'ExampleTODO',
        });
        this.$store.dispatch('todo-item/getTodo', {
          uid: user.uid,
          docId: this.listData ? this.listData[0].value : 'example',
        });
      } else if (user) {
        this.setUser(user);
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

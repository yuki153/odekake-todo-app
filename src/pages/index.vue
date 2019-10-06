<template>
  <div class="main">
    <app-loadding :isHide="isUser"/>
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
  },
  computed: {
    ...mapState('user', [
      'isUser'
    ]),
    ...mapState('mix-todoname-popup', [
      'isShown'
    ]),
    ...mapState('list', {
      listData: (state) => state.data,
    }),
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {
    getAuthState() {
      return new Promise((resolve) => {
        fb.auth().onAuthStateChanged(result => result ? resolve(result) : resolve(false));
      });
    }
  },
  async mounted() {
    if (!this.isUser) {
      const user = await this.getAuthState();
      if (user) {
        await this.$store.dispatch('list/getList', { uid: user.uid });
        this.user = user;
        this.$store.commit('user/setUser', { bool: true });
        this.$store.commit('user/setUid', { uid: user.uid });
        this.$store.commit('todo-item/setTodoState', {
          key: this.listData ? this.listData[0].value : 'example',
          name: this.listData ? this.listData[0].name : 'ExampleTODO',
        });
        this.$store.dispatch('todo-item/getTodo', {
          uid: user.uid,
          docId: this.listData ? this.listData[0].value : 'example',
        });
      } else {
        this.$router.push("/sign-in");
      }
    }
  },
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

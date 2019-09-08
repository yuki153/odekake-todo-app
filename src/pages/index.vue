<template>
  <div class="main">
    <app-loadding :isHide="isUser"/>
    <section class="main__section">
      <todo-list/>
      <mix-modal-screen/>
      <mix-action-button/>
    </section>
  </div>
</template>

<script>
import FirebaseQuery from "~/plugins/firebase-query.js";
import AppLoadding from '~/components/simple/app-loading';
import MixActionButton from '~/components/mix/mix-action-button';
import MixModalScreen from '~/components/mix/mix-modal-screen';
import TodoList from '~/components/mix/todo-list';
import { mapState } from 'vuex';
const fb = new FirebaseQuery();

export default {
  layout: 'default',
  components: {
    AppLoadding,
    MixActionButton,
    MixModalScreen,
    TodoList,
  },
  computed: {
    ...mapState('user', [
      'isUser'
    ]),
  },
  data() {
    return {
      user: {}
    };
  },
  async mounted() {
    console.log('mounted::index');
    if (!this.isUser) {
      const user = await fb.getAuthState();
      console.log(user.uid)
      if (user) {
        this.user = user;
        this.$store.commit('user/setUser', { bool: true });
        this.$store.commit('user/setUid', { uid: user.uid });
        this.$store.dispatch('todo-item/getTodo', {
          uid: user.uid,
          docId: 'example',
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

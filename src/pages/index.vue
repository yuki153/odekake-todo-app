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
import firebase from "~/plugins/firebase";
import AppLoadding from '~/components/simple/app-loading';
import MixActionButton from '~/components/mix/mix-action-button';
import MixModalScreen from '~/components/mix/mix-modal-screen';
import TodoList from '~/components/mix/todo-list';

export default {
  layout: 'default',
  components: {
    AppLoadding,
    MixActionButton,
    MixModalScreen,
    TodoList,
  },
  data() {
    return {
      isUser: false,
      user: {}
    };
  },
  mounted() {
    this.isUser = this.$store.getters.isUser;
    if (!this.isUser) {
      firebase.auth().onAuthStateChanged((result) => {
        if (result) {
          this.isUser = true;
          this.user = result;
          this.$store.dispatch({
            type: 'setUser',
            bool: true
          });
        } else {
          this.$router.push("/sign-in");
        }
      });
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

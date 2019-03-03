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
const fb = new FirebaseQuery();

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
  async mounted() {
    this.isUser = this.$store.getters['user/isUser'];
    if (!this.isUser) {
      const user = await fb.getAuthState();
      console.log(user)
      if (user) {
        this.isUser = true;
        this.user = user;
        this.$store.dispatch({
          type: 'user/setUser',
          bool: true
        });
        const { data } = await fb.getStoreData('todoItem','devUser1');
        for (const datum of data) {
          this.$store.commit('todo-item/setData', {
            hexCode: datum.hexCode,
            svgName: datum.svgName,
            text: datum.text,
            time: datum.time,
          });
        }
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

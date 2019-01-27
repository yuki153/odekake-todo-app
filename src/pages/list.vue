<template>
  <div class="list">
    <app-loadding :isHide="isUser"/>
    <section class="list__section">
      <h1>ListPage</h1>
      <add-button/>
    </section>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import AppLoadding from '~/components/app-loading'
import AddButton from '~/components/add-button'

export default {
  layout: "default",
  components: {
    AppLoadding,
    AddButton
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
        } else {
          this.$router.push("/sign-in");
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.list {
  &__section {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: calc(100vh - (#{$app-header-height + $app-footer-height}));
  }
}
</style>

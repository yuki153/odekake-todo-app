<template>
  <div>
    <app-loadding :isHide="isUser"/>
    <section class="container">
      <h1>HelloWorld</h1>
    </section>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import AppLoadding from '~/components/app-loading.vue'

export default {
  layout: "default",
  components: {
    AppLoadding,
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

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

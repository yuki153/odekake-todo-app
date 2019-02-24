<template>
  <div class="signout" v-if="isUser">
    <app-logo/>
    <section class="signout__section">
      <h2 class="signout__title">サービスからログアウトする</h2>
      <app-button :is-actived="true" @click.native="signOut">ログアウト</app-button>
    </section>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import AppButton from '~/components/simple/app-button';
import AppLogo from '~/components/simple/app-logo.vue'

export default {
  layout: "default",
  components: {
    AppButton,
    AppLogo
  },
  data() {
    return {
      isUser: false,
      user: {},
    }
  },
  mounted() {
      this.isUser = this.$store.getters['user/isUser'];
      this.user = firebase.auth().currentUser
    if (!this.isUser) {
      alert('自動ログインの有効期限が切れました。\nもう一度ログインし直してください');
      this.$router.push('/sign-in');
    } else {
      // console.log(firebase.auth().currentUser);
    }
  },
  methods: {
    signOut: function() {
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert('logout successful');
        this.$router.push('/sign-in');
      }).catch((error) => {
        // An error happened.
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.signout {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

  &__section {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }
  &__title {
    font-size: 14px;
    color: #333;
    margin-bottom: 10px;
  }
}
</style>

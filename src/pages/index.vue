<template>
  <section class="container">
    <div v-if="isLogin">
      <h1>HelloWorld</h1>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data() {
    return {
      isLogin: this.$store.getters.isLogin,
      user: this.$store.state.user,
    }
  },
  mounted() {
    if (!this.isLogin) {
      alert('自動ログインの有効期限が切れました。\nもう一度ログインし直してください');
      this.$router.push('/sign-in');
    } else {
      console.log(this.$store.state.user);
      console.log(this.isLogin);
      console.log(this.user.email);
    }
  }
}
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
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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

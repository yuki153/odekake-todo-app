<template>
  <div class="signin">
    <login-logo/>
    <section class="signin__section">
      <h2 class="signin__title">メールとパスワードで新規登録する</h2>
      <form>
        <input type="text" placeholder="Email" v-model="username">
        <input type="password" placeholder="Password" v-model="password">
      </form>
      <button class="signin_button" @click="signUp">登録</button>
    </section>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import LoginLogo from "~/components/login-logo.vue";

export default {
  components: {
    LoginLogo
  },
  layout: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    signUp: function() {
      console.log("signup");
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.username, this.password)
        .then(user => {
          alert("Successful account creation");
        })
        .catch(err => {
          alert(err.message);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.signin__section {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.signin__title {
  font-size: 14px;
  color: #333;
  margin-bottom: 14px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  margin-bottom: 14px;
}

input {
  width: 68%;
  height: 44px;
  padding: 0 10px;
  border: 1px solid #fc471e;
  border-radius: 8px;
}

.signin_button {
  width: 120px;
  height: 44px;
  background-color: #ccc;
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  box-shadow: #ddd 0 3px 6px 0px;
}
</style>


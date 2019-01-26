<template>
  <div class="signup">
    <app-logo/>
    <section class="signup__section">
      <h2 class="signup__title">メールとパスワードで新規登録する</h2>
      <form class="signup__form">
        <input class="signup__input" type="text" placeholder="Email" v-model="email">
        <input class="signup__input" type="password" placeholder="Password" v-model="password">
      </form>
      <button :class="`signup__button${validation ? ' isActive' : ''}`" @click="signUp">登録</button>
    </section>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import AppLogo from "~/components/app-logo.vue";

export default {
  components: {
    AppLogo
  },
  layout: 'login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  computed: {
    validation: function() {
      if (this.password && this.email) {
        return true;
      } else {
        return false;
      }
    }
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
.signup {

  &__section {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  &__title {
    font-size: 14px;
    color: #333;
    margin-bottom: 10px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 90px;
    margin-bottom: 14px;
  }

  &__input {
    width: 68%;
    height: 40px;
    padding: 0 10px;
    border: 1px solid #fc471e;
    border-radius: 8px;
    outline-color: transparent
  }

  &__button {
    width: 100px;
    height: 40px;
    background-color: #ccc;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    border-radius: 8px;
    box-shadow: #ddd 0 3px 6px 0px;

    &.isActive {
      background-color: #fc471e;
      box-shadow: #bbb 0 3px 6px 0px;
    }
  }
}
</style>


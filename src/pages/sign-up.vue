<template>
  <div class="signup">
    <app-logo/>
    <section class="signup__section">
      <h2 class="signup__title">メールとパスワードで新規登録する</h2>
      <form class="signup__form">
        <input class="signup__input" type="text" placeholder="Email" autocomplete="off" v-model="email">
        <input class="signup__input" type="password" placeholder="Password" autocomplete="off" v-model="password">
      </form>
      <app-button :isActived="validation" @click.native="signUp">登録</app-button>
    </section>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import AppLogo from "~/components/simple/app-logo";
import AppButton from '~/components/simple/app-button';

export default {
  components: {
    AppLogo,
    AppButton
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
        .createUserWithEmailAndPassword(this.email, this.password)
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
    border: 1px solid $app-color;
    border-radius: 8px;
    outline-color: transparent
  }

}
</style>


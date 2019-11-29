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
import fb from "~/plugins/firebase";
import AppLogo from "~/components/single/app-logo";
import AppButton from '~/components/single/app-button';
import { mapState } from 'vuex';

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
    ...mapState('user', [
      'isUser',
    ]),
    validation() {
      return (this.password && this.email) ? true : false;
    }
  },
  mounted() {
    if (window.unsubscribe) window.unsubscribe();
    if (this.isUser === false) {
      window.unsubscribe = fb.auth().onAuthStateChanged(user => {
        if (user) {
          this.$store.commit('user/setUser', {
            isUser: true,
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified
          });
          this.$router.push('/');
        }
      });
    } else {
      this.$router.push('/');
    }
  },
  methods: {
    async signUp() {
      try {
        const result = await fb.auth().createUserWithEmailAndPassword(this.email, this.password);
        await result.user.sendEmailVerification();
      } catch (err) {
        alert(err.message);
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.signup {
  width: 100%;
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


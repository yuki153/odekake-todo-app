<template>
  <div class="signin">
    <app-loading :isHide="isLoginChecked"/>
    <app-logo/>
    <section class="signin__section">
      <h2 class="signin__title">メールとパスワードでログインする</h2>
      <form class="signin__form">
        <input class="signin__input" type="text" placeholder="Email" autocomplete="on" v-model="email">
        <input class="signin__input" type="password" placeholder="Password" autocomplete="on" v-model="password">
      </form>
      <app-button :isActived="validation" @click.native="signIn">ログイン</app-button>
    </section>
    <section class="signin__section">
      <h2 class="signin__title">Google アカウントでログインする</h2>
      <app-button :isActived="true" @click.native="signInByGoogle">ログイン</app-button>
    </section>
  </div>
</template>

<script>
import fb from '~/plugins/firebase';
import AppLogo from '~/components/simple/app-logo'
import AppButton from '~/components/simple/app-button';
import AppLoading from '~/components/simple/app-loading';
import { mapState } from 'vuex';

export default {
  components: {
    AppLogo,
    AppButton,
    AppLoading
  },
  layout: 'login',
  data () {
    return {
      email: '',
      password: '',
      isLoginChecked: false,
    }
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
        } else {
          // ローティングを状態を解除する
          this.isLoginChecked = true;
        }
      });
    } else {
      this.$router.push('/');
    }
  },
  methods: {
    signIn() {
      fb.auth().signInWithEmailAndPassword(this.email, this.password).then(
        result => {},
        err => {
          alert(err.message)
        }
      )
    },
    signInByGoogle() {
      const provider = new fb.auth.GoogleAuthProvider();
      fb.auth().signInWithRedirect(provider);
    },
  }
}
</script>

<style lang="scss" scoped>

.signin {
    width: 100%;
  &__section {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin-bottom: 24px;

    &:last-child {
      margin: 0;
    }
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

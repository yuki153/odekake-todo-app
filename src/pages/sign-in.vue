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
import firebase from '~/plugins/firebase';
import AppLogo from '~/components/app-logo'
import AppButton from '~/components/app-button';
import AppLoading from '~/components/app-loading';

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
    validation: function() {
      if (this.password && this.email) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    // google からのログイン情報取得が遅く、null になる
    // console.log(firebase.auth().currentUser, 'current');
    console.log('mounted');
    firebase.auth().onAuthStateChanged(result => {
      if (result) {
          this.$store.dispatch({
            type: 'setUser',
            bool: true
          });
          return this.$router.push('/');
      } else {
        this.isLoginChecked = true;
        console.log('ログイン情報なし');
      }
    });
    firebase.auth().getRedirectResult().then(
      result => {},
      err => {
        alert(err.message)
      }
    )
  },
  methods: {
    signIn: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        result => {},
        err => {
          alert(err.message)
        }
      )
    },
    signInByGoogle: function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  }
}
</script>

<style lang="scss" scoped>

.signin {

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

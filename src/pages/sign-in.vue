<template>
  <div class="signin">
    <app-logo/>
    <section class="signin__section">
      <h2 class="signin__title">メールとパスワードでログインする</h2>
      <form class="signin__form">
        <input class="signin__input" type="text" placeholder="Email" v-model="email">
        <input class="signin__input" type="password" placeholder="Password" v-model="password">
      </form>
      <button :class="`signin__button${validation ? ' isActive' : ''}`" @click="signIn">ログイン</button>
    </section>
    <section class="signin__section">
      <h2 class="signin__title">Google アカウントでログインする</h2>
      <button class="signin__button isActive" @click="signInByGoogle">ログイン</button>
    </section>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';
import AppLogo from '~/components/app-logo.vue'

export default {
  components: {
    AppLogo
  },
  layout: 'login',
  data () {
    return {
      email: '',
      password: '',
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
    // onAuthStateChanged は結果が返るまで待つっぽい
    firebase.auth().onAuthStateChanged(result => {
      if (result) {
         // const user = result;
            this.$store.dispatch({
            type: 'setUser',
            bool: true // user
          });
          return this.$router.push('/');
      } else {
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
}
</style>

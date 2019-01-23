<template>
  <div class="signin">
    <Login-Logo/>
    <section class="signin__section">
      <h2 class="signin__title">メールとパスワードでログインする</h2>
      <form>
        <input type="text" placeholder="Email" v-model="username">
        <input type="password" placeholder="Password" v-model="password">
      </form>
      <button class="signin__button" @click="signIn">ログイン</button>
    </section>
    <section class="signin__section">
      <h2 class="signin__title">Google アカウントでログインする</h2>
      <button class="signin__button" @click="signInByGoogle">ログイン</button>
    </section>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';
import LoginLogo from '~/components/login-logo.vue'

export default {
  components: {
    LoginLogo
  },
  layout: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  mounted() {
    // google からのログイン情報取得が遅く、null になる
    // console.log(firebase.auth().currentUser, 'current');

    console.log('mounted');
    // onAuthStateChanged は結果が返るまで待つっぽい
    firebase.auth().onAuthStateChanged((result) => {
      if (result) {
          const user = result;
            this.$store.dispatch({
            type: 'setUser',
            obj: user
          });
          this.$router.push('/');
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
  beforeUpdate () {
    console.log('Update');
  },
  methods: {
    signIn: function() {
      firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(
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
.signin__section {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}
.signin__section:last-child {
  margin: 0;
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

.signin__button {
  width: 120px;
  height: 44px;
  background-color: #ccc;
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  box-shadow: #ddd 0 3px 6px 0px;
}
</style>

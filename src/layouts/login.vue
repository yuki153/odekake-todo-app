<template>
  <div>
    <header>
      <h1>{{isSignIn ? 'ログイン画面' : '新規アカウント登録'}}</h1>
    </header>
    <nuxt />
    <ul class="loginMenu">
      <li :class="`loginMenu__item${isSignIn ? ' isSelected' : ''}`"><nuxt-link to="/sign-in">ログイン画面</nuxt-link></li>
      <li :class="`loginMenu__item${isSignIn ? '' : ' isSelected'}`"><nuxt-link to="/sign-up">新規登録</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    isSignIn: function() {
      return this.$route.name === 'sign-in';
    }
  }
}
</script>

<style lang="scss" scoped>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

header {
  width: 100%;
  height: 50px;
  background-color: #fc471e;
  color: #fff;
  h1 {
    font-size: 16px;
    line-height: 50px;
    text-align: center;
  }
}

.loginMenu {
  position: fixed;
  bottom: 0;
  left: 0;
  list-style: none;
  display: flex;
  width: 100%;
  height: 50px;
  box-shadow: #ccc 0 0 8px 2px;

  &__item {
    background-color: #fff;
    color: #fc471e;
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 50px;

    &.isSelected {
      background-color: #fc471e;
      color: #fff;
    }

    a {
      display: block;
      width: 100%;
      height: 100%;
      text-decoration: none;
      color: inherit;
    }
  }
}
</style>

<template>
  <div>
    <header>
      <h1>{{isSignIn ? 'ログイン画面' : '新規アカウント登録'}}</h1>
    </header>
    <main :class="`${isPwa ? 'odekake is-pwa' : 'odekake'}`">
      <nuxt/>
    </main>
    <ul :class="`loginMenu${isHide ? ' isHide' : ''}`">
      <li :class="`loginMenu__item${isSignIn ? ' isSelected' : ''}`"><n-link to="/sign-in">ログイン画面</n-link></li>
      <li :class="`loginMenu__item${isSignIn ? '' : ' isSelected'}`"><n-link to="/sign-up">新規登録</n-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHide: false,
      isPwa: false,
    }
  },
  computed: {
    isSignIn: function() {
      return this.$route.name === 'sign-in';
    }
  },
  mounted() {
    if (window.location.hash === '#pwa') this.isPwa = true;
    this.$el.addEventListener('DOMFocusIn', (e) => {
      if (e.target.tagName === 'INPUT') {
        this.isHide = true;
      }
    })
    this.$el.addEventListener('DOMFocusOut', (e) => {
      if (e.target.tagName === 'INPUT') {
        this.isHide = false;
      }
    })
  }
}
</script>

<style lang="scss" scoped>
header {
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: $app-color;
  color: #fff;
  h1 {
    font-size: 14px;
    line-height: 40px;
    text-align: center;
  }
}

.odekake {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-top: 40px;
  &.is-pwa {
    align-items: center;
    padding: 0 0 10vh 0;
  }
}

.loginMenu {
  position: absolute;
  bottom: 0;
  left: 0;
  list-style: none;
  display: flex;
  width: 100%;
  height: 48px;
  box-shadow: #ccc 0 0 8px 2px;

  &.isHide {
    display: none;
  }

  &__item {
    background-color: #fff;
    color: $app-color;
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 48px;

    &.isSelected {
      background-color: $app-color;
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

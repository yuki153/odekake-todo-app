<template>
  <footer class="appFooter">
    <ul class="appFooter__items">
      <li class="appFooter__item"><nuxt-link to="/">計画内容</nuxt-link></li>
      <li class="appFooter__item"><nuxt-link to="/">計画一覧</nuxt-link></li>
      <li class="appFooter__item"><nuxt-link to="/sign-out">ログアウト</nuxt-link></li>
    </ul>
  </footer>
</template>

<style lang="scss">
.appFooter {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 48px;
  width: 100%;
  background-color: #fc471e;
  color: #fff;
  font-size: 14px;

  &__items {
    display: flex;
    list-style: none;
    height: 100%;
  }
  &__item {
    flex: 1;
    height: 100%;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-decoration: none;
      color: inherit;
      font-size: 1em;
    }

  }
}
</style>

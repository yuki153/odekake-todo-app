<template>
  <footer class="appFooter">
    <ul :class="`appFooter__items ${currentPage}`">
      <li :class="`appFooter__item${isTop ? ' is-selected' : '' }`">
        <n-link to="/">計画内容</n-link>
      </li>
      <li :class="`appFooter__item${isList ? ' is-selected' : '' }`">
        <n-link to="/list">計画一覧</n-link>
      </li>
      <li :class="`appFooter__item${isSignout ? ' is-selected' : '' }`">
        <n-link to="/sign-out">ログアウト</n-link>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  watch: {
    '$route': function (to, from) {
      this.addStateClass(to);
    }
  },
  data() {
    return {
      isTop: true,
      isList: false,
      isSignout: false,
      currentPage: 'is-top',
    }
  },
  mounted() {
    this.addStateClass(this.$route);
  },
  methods: {
    addStateClass: function(path) {
      switch(path.name) {
        case 'index':
          this.isTop = true;
          this.isList = false;
          this.isSignout = false;
          this.currentPage = 'is-top';
          break
        case 'list':
          this.isTop = false;
          this.isList = true;
          this.isSignout = false;
          this.currentPage = 'is-list';
          break
        case 'sign-out':
          this.isTop = false;
          this.isList = false;
          this.isSignout = true;
          this.currentPage = 'is-signout';
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss">
.appFooter {
  position: fixed;
  bottom: 0;
  left: 0;
  height: $app-footer-height;
  width: 100%;
  background-color: #fff;
  color: #aaa;
  font-size: 14px;
  box-shadow: #ccc 0 0 8px 2px;

  &__items {
    position: relative;
    display: flex;
    list-style: none;
    height: 100%;
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 33.3%;
      height: 3px;
      background-color: $app-color;
      transition: .2s transform ease;
      content: '';
    }
    &.is-top::after {
      transform: translate(0);
    }
    &.is-list::after {
      transform: translate(100%);
    }
    &.is-signout::after {
      transform: translate(200%);
    }
  }

  &__item {
    flex: 1;
    height: 100%;

    &.is-selected {
      color: $app-color;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-decoration: none;
      color: inherit;
      font-weight: bold;
      font-size: 1em;
    }

  }
}
</style>

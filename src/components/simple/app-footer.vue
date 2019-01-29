<template>
  <footer class="appFooter">
    <ul class="appFooter__items">
      <li class="appFooter__item"><nuxt-link to="/">計画内容</nuxt-link></li>
      <li class="appFooter__item"><nuxt-link to="/list">計画一覧</nuxt-link></li>
      <li class="appFooter__item"><nuxt-link to="/sign-out">ログアウト</nuxt-link></li>
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
  methods: {
    addStateClass: function(path) {
      const items = this.$el.querySelectorAll('.appFooter__item');
      for (const item of items) {
        item.classList.remove('isSelected');
      }
      switch(path.name) {
        case 'index':
          items[0].classList.add('isSelected');
          break
        case 'list':
          items[1].classList.add('isSelected');
          break
        case 'sign-out':
          items[2].classList.add('isSelected');
          break
        default:
          break
      }
    }
  },
  mounted() {
    this.addStateClass(this.$route);
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
    display: flex;
    list-style: none;
    height: 100%;
  }

  &__item {
    flex: 1;
    height: 100%;

    &.isSelected {
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

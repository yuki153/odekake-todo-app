<template>
  <header class="appHeader">
    <h1 class="appHeader__title">{{ currentTodoname }}</h1>
  </header>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('mix-todo-item', [
      'currentTodoname'
    ]),
  }
}
</script>

<style lang="scss">
.appHeader {
  height: $app-header-height;
  background-color: $app-color;

  &__title {
    font-size: 20px;
    padding: 0 16px;
    text-align: right;
    line-height: 48px;
    color: #fff;
  }
}
</style>

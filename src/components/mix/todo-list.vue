<template>
  <div class="todoList">
    <ul class="todoList__items">
      <li class="todoList__item"><todo-item/></li>
      <li class="todoList__item"><todo-item/></li>
      <li class="todoList__item"><todo-item/></li>
    </ul>
  </div>
</template>
<script>
import TodoItem from '~/components/mix/todo-item';

export default {
  components: {
    TodoItem,
  }
};
</script>
<style lang="scss" scoped>
  .todoList {
      width: 100%;
    &__items {
      list-style: none;
    }
    &__item {
      margin-bottom: 8px;
    }
  }
</style>

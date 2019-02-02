<template>
  <div class="todoList">
    <ul class="todoList__items">
      <li v-for="item of todoItemState" :key="item.id" class="todoList__item">
        <todo-item :iconColor="item.hexCode"/>
      </li>
    </ul>
  </div>
</template>
<script>
import TodoItem from '~/components/mix/todo-item';

export default {
  components: {
    TodoItem,
  },
  data() {
    return {
      todoItemState: this.$store.state.todoItem
    }
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

<template>
  <div class="todoItem">
    <div class="todoItem__content">
      <circle-icon
        :color="iconColor"
        :img="iconImg"
        :size="32"/>
    </div>
    <div class="todoItem__content">
      <todo-time
      :hour="hour"
      :min="min"/>
    </div>
    <div class="todoItem__content">
      <todo-textarea
        :text="text"/>
    </div>
  </div>
</template>
<script>
import TodoTime from "~/components/simple/todo-time";
import TodoTextarea from "~/components/simple/todo-textarea";
import CircleIcon from "~/components/simple/circle-icon";

export default {
  components: {
    TodoTime,
    TodoTextarea,
    CircleIcon
  },
  props: {
    iconColor: String,
    iconImg: String,
    text: String,
    hour: String,
    min: String,
  }
};
</script>
<style lang="scss" scoped>
.todoItem {
  display: flex;

  &__content {
    margin-right: 8px;
    &:last-child {
      width: 100%;
      margin-right: 0;
    }
  }
}
</style>



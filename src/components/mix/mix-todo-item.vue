<template>
  <div class="todoItem">
    <div class="todoItem__content">
      <circle-icon
        :color="iconColor"
        :img="iconImg"
        :size="32"/>
    </div>
    <div class="todoItem__content">
      <div class="todoItem__time">{{ hour }}:{{ min }}</div>
    </div>
    <div class="todoItem__content">
      <p class="todoItem__text">{{ text }}</p>
    </div>
  </div>
</template>
<script>
import CircleIcon from "~/components/single/circle-icon";

export default {
  components: {
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

  &__text {
    background-color: #fff;
    width: 100%;
    min-height: 56px;
    font-size: 14px;
    padding: 4px;
    border: 1px solid #c4c4c4;
    &:empty {
      &::before {
        content: '予定を入力してください';
        color: #999;
      }
    }
  }

  &__time {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 24px;
    background-color: #fff;
    border: 1px solid #c4c4c4;
  }
}
</style>



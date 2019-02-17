<template>
  <div class="todoList">
    <ul class="todoList__items">
      <li
        class="todoList__item"
        v-for="item of todoItemState"
        :key="item.id">
        <div
          v-if="isDeletable"
          class="todoList__deleteOption"
          :data-id="item.id"
          @click="toggleCheckmark">
        </div>
        <todo-item
          :iconColor="item.hexCode"
          :iconImg="item.svgPath"/>
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
      todoItemState: this.$store.state.todoItem,
    }
  },
  computed: {
    isDeletable: function() {
      return this.$store.state.isDeletable;
    }
  },
  methods: {
    toggleCheckmark: function(e) {
      e.target.classList.toggle('isChecked');
      if (e.target.classList.contains('isChecked')) {
        console.log(`commit addDeleteIdList:${e.target.dataset.id}`);
        this.$store.commit('addDeleteIdList', {
          id: e.target.dataset.id
        });
      } else {
        console.log(`commit removeDeleteIdList:${e.target.dataset.id}`);
        this.$store.commit('removeDeleteIdList', {
          id: e.target.dataset.id
        });
      }
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
    &__deleteOption {
      position: relative;
      float: left;
      width: 48px;
      height: 48px;

      &::after {
        content: '';
        position: absolute;
        top: 8px;
        left: 6px;
        width: 20px;
        height: 10px;
        border-left: 4px solid #ccc;
        border-bottom: 4px solid #ccc;
        transform: rotate(-45deg);
      }
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 32px;
        height: 32px;
        border: 2px solid #ccc;
      }

      &.isChecked::after,
      &.isChecked::before {
        border-color: #38c970;
      }
    }
  }
</style>

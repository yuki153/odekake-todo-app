<template>
  <div class="todoList">
    <ul class="todoList__items">
      <li
        class="todoList__item"
        v-for="datum of data"
        :key="datum.id">
        <div
          v-if="isDeletable"
          class="todoList__deleteOption"
          :data-id="datum.id"
          @click="toggleCheckmark">
        </div>
        <todo-item
          :iconColor="datum.hexCode"
          :iconImg="datum.svgName"
          :text="datum.text"
          :hour="datum.time.h"
          :min="datum.time.m"/>
      </li>
    </ul>
  </div>
</template>
<script>
import TodoItem from '~/components/mix/todo-item';
import { mapState } from 'vuex';

export default {
  components: {
    TodoItem,
  },
  computed: {
    ...mapState('todo-item', [
      'isDeletable',
      'data'
    ])
  },
  methods: {
    toggleCheckmark: function(e) {
      e.target.classList.toggle('isChecked');
      if (e.target.classList.contains('isChecked')) {
        console.log(`commit addDeletionIds:${e.target.dataset.id}`);
        this.$store.commit('todo-item/addDeletionIds', {
          id: e.target.dataset.id
        });
      } else {
        console.log(`commit removeDeletionIds:${e.target.dataset.id}`);
        this.$store.commit('todo-item/removeDeletionIds', {
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

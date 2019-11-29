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
        <mix-todo-item
          :iconColor="datum.hexCode"
          :iconImg="datum.svgName"
          :text="datum.text"
          :hour="datum.time.h"
          :min="datum.time.m"
          @click.native="showModal(datum)"/>
      </li>
    </ul>
  </div>
</template>
<script>
import MixTodoItem from '~/components/mix/mix-todo-item';
import { mapState } from 'vuex';

export default {
  components: {
    MixTodoItem,
  },
  computed: {
    ...mapState('mix-todo-item', [
      'isDeletable',
      'data'
    ])
  },
  methods: {
    toggleCheckmark: function(e) {
      e.target.classList.toggle('is-checked');
      if (e.target.classList.contains('is-checked')) {
        this.$store.commit('mix-todo-item/addDeletionIds', {
          id: e.target.dataset.id
        });
      } else {
        this.$store.commit('mix-todo-item/removeDeletionIds', {
          id: e.target.dataset.id
        });
      }
    },
    showModal: function(datum) {
      // console.log(datum);
      this.$store.commit('mix-icon-selection-screen/update', {
        svgName: datum.svgName,
        hexCode: datum.hexCode,
        time: {
          min: datum.time.m,
          hour: datum.time.h,
        },
        text: datum.text,
        id: datum.id,
      });
      this.$store.commit('modal-screen/enableState');
    },
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

      &.is-checked::after,
      &.is-checked::before {
        border-color: #38c970;
      }
    }
  }
</style>

<template>
  <div class="actionButton">
    <div :class="`actionContent${isHide ? ' isHide': ''}`">
      <ul class="actionContent__list">
        <li class="actionContent__item">新規作成</li>
        <li class="actionContent__item" @click="showModal">予定の追加</li>
        <li class="actionContent__item" @click="prepareDelete">予定の削除</li>
      </ul>
    </div>
    <add-button
      :isShow="!isDeletable"
      :isActive="isButtonState"
      @click.native="toggleState"/>
    <delete-button
      :isShow="isDeletable"
      @click.native="confirmDelete"
    />
  </div>
</template>

<script>
import AddButton from "~/components/simple/add-button";
import DeleteButton from "~/components/simple/delete-button";

export default {
  components: {
    AddButton,
    DeleteButton
  },
  data() {
    return {
      isButtonState: false,
      isHide: true,
    };
  },
  computed: {
    isDeletable: function() {
      return this.$store.state.isDeletable;
    }
  },
  methods: {
    toggleState: function() {
      this.isHide = !this.isHide;
      this.isButtonState = this.isHide === false;
    },
    showModal: function() {
      this.toggleState();
      this.$store.commit('changeModalState');
    },
    prepareDelete: function() {
      this.toggleState();
      this.$store.commit('isDeletable'); // true
    },
    confirmDelete: function() {
      console.log('Delete');
      this.$store.commit('deleteTodoItem');
    }
  },
};
</script>

<style lang="scss">
.actionContent {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 80;
    width: 100%;
    height: $app-footer-height;
    background-color: $app-color;
    transform: translate(0, 0);
    transition: .3s;

    &.isHide {
      transform: translate(0, $app-footer-height);
    }

  &__list {
    display: flex;
    flex: 1;
    height: 100%;
    list-style: none;
  }
  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 14px;
    width: 100%;
    height: 100%;
  }
}
</style>

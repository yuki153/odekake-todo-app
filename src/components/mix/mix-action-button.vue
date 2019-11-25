<template>
  <div :class="`actionButton${actionContent.isHidden ? ' is-hidden': ''}`">
    <div class="actionContent">
      <ul class="actionContent__list">
        <li class="actionContent__item" @click="showModal">予定の追加</li>
        <li class="actionContent__item" @click="prepareDelete">予定の削除</li>
        <li class="actionContent__item" @click="showPopup">計画の新規作成</li>
      </ul>
    </div>
    <add-button
      :isShown="!isDeletable"
      :isActived="isButtonState"
      @click.native="toggleState"/>
    <delete-button
      :isShown="isDeletable"
      @click.native="confirmDelete"
    />
  </div>
</template>

<script>
import AddButton from "~/components/simple/add-button";
import AppButton from "~/components/simple/app-button";
import DeleteButton from "~/components/simple/delete-button";
import { mapState } from 'vuex';

export default {
  components: {
    AddButton,
    AppButton,
    DeleteButton,
  },
  data() {
    return {
      isButtonState: false,
      actionContent: {
        isHidden: true,
      },
    };
  },
  computed: {
    ...mapState('todo-item', [
      'isDeletable'
    ]),
  },
  methods: {
    toggleState: function() {
      this.actionContent.isHidden = !this.actionContent.isHidden;
      this.isButtonState = this.actionContent.isHidden === false;
    },
    showModal: function() {
      this.toggleState();
      this.$store.commit('mix-modal-screen/init');
      this.$store.commit('modal-screen/enableState');
    },
    prepareDelete: function() {
      this.toggleState();
      this.$store.commit('todo-item/isDeletable'); // true
    },
    confirmDelete: function() {
      const uid = this.$store.getters['user/uid'];
      this.$store.commit('todo-item/deleteData', {uid});
    },
    showPopup() {
      this.toggleState();
      this.$store.commit('mix-todoname-popup/show');
    }
  },
};
</script>

<style lang="scss" scoped>
.actionButton {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 80;
  width: 100%;
  transform: translate(0, 0);
  transition: .3s;
  &.is-hidden {
    transform: translate(0, 168px);
  }
}
.actionContent {
  background-color: $app-color;

  &__list {
    list-style: none;
  }
  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 14px;
    width: 100%;
    height: 56px;
  }

  &__item + .actionContent__item {
    border-top: 1px solid #ac3318;
  }
}

.actionButton {
  /deep/ .addButton,
  /deep/ .deleteButton {
    position: absolute;
    top: -70px;
    transition: .3s;
  }
  &.is-hidden /deep/ .addButton,
  &.is-hidden /deep/ .deleteButton {
    top: -122px;
  }
}
</style>

<template>
  <div class="actionButton">
    <div :class="`actionContent${actionContent.isHidden ? ' isHidden': ''}`">
      <ul class="actionContent__list">
        <li class="actionContent__item" @click="showPopup">新規作成</li>
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
    <mix-todoname-popup :isShown="isShown"/>
  </div>
</template>

<script>
import AddButton from "~/components/simple/add-button";
import AppButton from "~/components/simple/app-button";
import DeleteButton from "~/components/simple/delete-button";
import MixTodonamePopup from "~/components/mix/mix-todoname-popup";
import { mapState } from 'vuex';

export default {
  components: {
    AddButton,
    AppButton,
    DeleteButton,
    MixTodonamePopup
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
    ...mapState('mix-todoname-popup', [
      'isShown'
    ])
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

  &.isHidden {
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

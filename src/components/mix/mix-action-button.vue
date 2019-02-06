<template>
  <div class="actionButton">
    <div :class="`actionContent${isHide ? ' isHide': ''}`">
      <ul class="actionContent__list">
        <li class="actionContent__item">新規作成</li>
        <li class="actionContent__item" @click="showModal">予定の追加</li>
        <li class="actionContent__item">予定の削除</li>
      </ul>
    </div>
    <add-button :isActive="isButtonState" @click.native="toggleState"/>
  </div>
</template>

<script>
import AddButton from "~/components/simple/add-button";

export default {
  components: {
    AddButton,
  },
  data() {
    return {
      isButtonState: false,
      isHide: true,
    };
  },
  methods: {
    toggleState: function() {
      this.isHide = !this.isHide;
      this.isButtonState = this.isHide === false;
    },
    showModal: function() {
      this.toggleState();
      this.$store.commit('changeModalState');
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

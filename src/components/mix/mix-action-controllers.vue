<template>
  <div :class="`actionControllers${actionContent.isHidden ? ' isHidden': ''}`">
    <div class="actionContent">
      <ul class="actionContent__list">
        <li
          class="actionContent__item"
          v-for="(action, index) of actions"
          :key="index"
          @click="action.event">
            {{action.name}}
        </li>
      </ul>
    </div>
    <add-button
      :isShow="buttons.add"
      :isActive="!actionContent.isHidden"
      @click.native="toggleState"/>
    <delete-button
      :isShow="buttons.del"
      @click.native="delAction"
    />
  </div>
</template>

<script>
import AddButton from "~/components/simple/add-button";
import DeleteButton from "~/components/simple/delete-button";
import { mapState } from 'vuex';

export default {
  components: {
    AddButton,
    DeleteButton
  },
  props: {
    actions: Array,
    buttons: {
      add: Boolean,
      del: Boolean
    },
    delAction: Function,
  },
  data() {
    return {
      actionContent: {
        isHidden: true,
      },
    };
  },
  mounted() {
    console.log(this.index);
  },
  methods: {
    toggleState: function() {
      this.actionContent.isHidden = !this.actionContent.isHidden;
    },
  },
};
</script>

<style lang="scss" scoped>
.actionControllers {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 80;
  width: 100%;
  transform: translate(0, 0);
  transition: .3s;
  &.isHidden {
    transform: translate(0, 100%);
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

.actionControllers {
  /deep/ .addButton,
  /deep/ .deleteButton {
    position: absolute;
    top: -70px;
    transition: .3s;
  }
  &.isHidden /deep/ .addButton,
  &.isHidden /deep/ .deleteButton {
    top: -122px;
  }
}
</style>


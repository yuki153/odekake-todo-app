<template>
    <modal-screen :isShown="isShown">
      <div class="popup">
        <p class="popup__title">予定の新規作成</p>
        <input class="popup__textarea" type="text" placeholder="予定の名前を入力してください" v-model="todoname"/>
        <button class="popup__close" @click="close"></button>
        <app-button :isActived="!!todoname" @click.native="fire(createNewData)">決定</app-button>
      </div>
    </modal-screen>
</template>

<script>
import { fire } from "~/plugins/util";
import { mapState } from 'vuex';
import AppButton from "~/components/single/app-button";
import ModalScreen from "~/components/single/modal-screen";

export default {
  components: {
    AppButton,
    ModalScreen
  },
  data() {
    return {
      todoname: '',
    };
  },
  props: {
    isShown: Boolean,
  },
  computed: {
    ...mapState('mix-todo-item', [
      'currentDataKeyName',
      'currentTodoname'
    ]),
  },
  methods: {
    fire, // import from plugins/util
    async createNewData() {
      if (this.todoname) {
        const uid = this.$store.getters['user/uid'];
        await this.$store.dispatch('mix-todo-item/createNewData', {
          todoname: this.todoname,
          uid,
        });
        this.$store.commit('list/appendList', {
          name: this.currentTodoname,
          value: this.currentDataKeyName
        });
        this.close();
      }
    },
    close() {
      this.todoname = '';
      this.$store.commit('mix-todoname-popup/hide');
    }
  },
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 84%;
  padding-bottom: 8px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, .4) 0 3px 6px 0px;
  font-size: 14px;
  overflow: hidden;

  &__title {
    width: 100%;
    padding: 8px 16px;
    margin-bottom: 16px;
    text-align: left;
    font-weight: bold;
    color: #fff;
    background-color: $app-color;
  }

  &__textarea {
    width: 90%;
    height: 30px;
    font-size: 16px;
    border: 1px solid #aaa;
    margin-bottom: 16px;
    padding: 0 4px;
  }

  &__close {
    position: absolute;
    top: 0;
    right: 2px;
    width: 40px;
    height: 40px;
    outline: none;
    transform: rotate(45deg);

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 4px;
      background-color: #fff;
      transition: .3s;
    }
    &::before {
      transform: translate(-50%,-50%);
    }
    &::after {
      transform: translate(-50%,-50%) rotate(90deg);
    }
  }
}

.popup /deep/ .appButton {
  box-shadow: none;
  &.isActived {
    box-shadow: none;
  }
}
</style>

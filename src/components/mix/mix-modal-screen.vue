<template>
  <modal-screen :isShow="getModalState">
    <div class="wrap">
      <!-- アイコン選択画面 -->
      <div :class="`iconList${getSelectState ? ' is-hide' : ''}`">
        <p class="iconList__title">アイコンを選択してください</p>
        <ul class="iconList__items">
          <li v-for="(icon, index) of icons" :key="index" class="iconList__item">
            <circle-icon
              :color="icon.hexCode"
              :img="icon.svgName"
              :size="48"
              @click.native="selectIcon(icon.hexCode, icon.svgName)"
            />
          </li>
        </ul>
      </div>

      <!-- 予定入力画面 -->
      <div :class="`setTodo${getSelectState ? '' : ' is-hide'}`">
        <div class="setTodo__back" @click="backToIconSelect()">アイコン選択に戻る</div>
        <ul class="setTodo__settingList">
          <li class="setTodo__settingItem">
            <p class="setTodo__text">選択済みのアイコン</p>
            <circle-icon
              :color="getTodo.hexCode"
              :img="getTodo.svgName"
              :size="48"/>
          </li>
          <li class="setTodo__settingItem">
            <p class="setTodo__text">予定時刻</p>
            <todo-time
              @emitHour="getHour"
              @emitMin="getMin"
              :hour="getTodo.time.hour"
              :min="getTodo.time.min"/>
          </li>
          <li class="setTodo__settingItem">
            <p class="setTodo__text">予定の詳細</p>
            <todo-textarea @emitValue="getText" :text="getTodo.text"/>
          </li>
          <app-button
            :isActived="true"
            @click.native="getUpdateState ?
              updateDataInTodoItem(getTodo) : setDataInTodoItem(getTodo)"
          >決定</app-button>
        </ul>
      </div>
    </div>
  </modal-screen>
</template>

<script>
import ModalScreen from "~/components/simple/modal-screen";
import CircleIcon from "~/components/simple/circle-icon";
import TodoTextarea from "~/components/simple/todo-textarea";
import TodoTime from "~/components/simple/todo-time";
import AppButton from "~/components/simple/app-button";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    ModalScreen,
    CircleIcon,
    TodoTime,
    TodoTextarea,
    AppButton
  },
  data() {
    return {
      icons: [
        { hexCode: "#81B468", svgName: "icoHuman" },
        { hexCode: "#4f9b4e", svgName: "icoTrain" },
        { hexCode: "#889BFF", svgName: "icoCar" },
        { hexCode: "#B588FF", svgName: "icoAirport" },
        { hexCode: "#73BABE", svgName: "icoShip" },
        { hexCode: "#90D2E0", svgName: "icoBicycle" },
        { hexCode: "#F1D691", svgName: "icoEat" },
        { hexCode: "#F1C591", svgName: "icoBag" },
        { hexCode: "#FFA488", svgName: "icoCompany" },
        { hexCode: "#FF8888", svgName: "icoHome" },
        { hexCode: "#92BFF4", svgName: "icoSun" },
        { hexCode: "#C587E2", svgName: "icoMoon" }
      ],
    };
  },
  computed: {
    ...mapState("modal-screen", {
      getModalState: state => state.isShow
    }),
    ...mapState('mix-modal-screen', {
      getTodo: state => state.todo,
      getUpdateState: state => state.isUpdate,
      getSelectState: state => state.isSelected,
    }),
  },
  mounted() {
    console.log('mounted::mix-modal-screen');
  },
  methods: {
    ...mapMutations('mix-modal-screen', [
      'backToIconSelect',
      'goToIconInfo',
      'setTodoText',
      'setTodoSvgName',
      'setTodoHexCode',
      'setTodoHour',
      'setTodoMin',
      'reset'
    ]),
    getNowTime() {
      const today = new Date();
      let hour = today.getHours();
      let min = today.getMinutes();
      min = 10 > min ? `0${min}` : `${min}`;
      hour = 10 > hour ? `0${hour}` : `${hour}`;
      return { hour, min };
    },
    selectIcon(hex, svg) {
      this.setTodoHexCode(hex);
      this.setTodoSvgName(svg);
      if (this.getTodo.time.hour === '00' && this.getTodo.time.min === '00') {
        const { hour, min } = this.getNowTime();
        this.setTodoHour(hour);
        this.setTodoMin(min);
      }
      this.goToIconInfo();
    },

    // todo-textarea からの emit で値を受け取る関数
    getText(value) {
      if (value) this.setTodoText(value);
    },
    // todo-time からの emit で値を受け取る関数
    getHour(value) {
      if (value) this.setTodoHour(value);
    },
    // todo-time からの emit で値を受け取る関数
    getMin(value) {
      if (value) this.setTodoMin(value);
    },
    setDataInTodoItem(todo) {
      const payload = {
        text: todo.text,
        hexCode: todo.hexCode,
        svgName: todo.svgName,
        time: {
          h: todo.time.hour,
          m: todo.time.min,
        }
      };
      this.$store.commit("todo-item/setData", payload);
      this.reset();
      this.$store.commit("modal-screen/disableState");
    },
    updateDataInTodoItem(todo) {
      const payload = {
        id: todo.id,
        text: todo.text,
        hexCode: todo.hexCode,
        svgName: todo.svgName,
        time: {
          h: todo.time.hour,
          m: todo.time.min,
        }
      };
      this.$store.commit('todo-item/updateData', payload)
      this.reset();
      this.$store.commit("modal-screen/disableState");
    },
  },
};
</script>
<style lang="scss" scoped>
.is-hide {
  display: none !important;
}
.wrap {
  width: 100%;
}
.iconList {
  text-align: center;
  color: #fff;

  &__title {
    margin-bottom: 24px;
  }

  &__items {
    width: 240px;
    height: 180px;
    margin: 0 auto;
    list-style: none;
  }

  &__item {
    margin: 0 16px 16px 0;
    float: left;

    &:nth-child(4n) {
      margin-right: 0;
    }
    &:nth-last-child(-n + 4) {
      margin-bottom: 0;
    }
  }
}

.setTodo {
  position: relative;
  width: 100%;
  height: 100vh;

  &__back {
    position: absolute;
    margin: 16px 0 0 10%;
    color: #fff;
    font-size: 16px;
    padding-left: 20px;

    &::before {
      position: absolute;
      top: 50%;
      left: 0;
      width: 16px;
      height: 16px;
      border-left: #fff 2px solid;
      border-bottom: #fff 2px solid;
      transform: translate(0, -50%) rotate(45deg);
      content: "";
    }
  }
  &__settingList {
    position: absolute;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__settingItem {
    margin-bottom: 24px;
  }
  &__text {
    color: #fff;
    font-size: 14px;
    margin-bottom: 4px;
  }
  &__planInfo {
    background-color: #fff;
    width: 100%;
    min-height: 56px;
    font-size: 12px;
    padding: 4px;
    border: 1px solid #c4c4c4;
  }
}
</style>


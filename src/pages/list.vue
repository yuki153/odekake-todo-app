<template>
  <div class="list">
    <app-loadding :isHide="isUser"/>
    <section class="list__section">
      <ul class="todoNameList">
        <li class="todoNameList__item"
          v-for="(datum, index) of data"
          :key="index">
          <check-icon
            v-if="isDeletable && currentDataKeyName !== datum.value"
            :dataSetVal="JSON.stringify({
              value: datum.value,
              name: datum.name
            })"
            @emitCheckmark="setDeletionData"
          />
          <div
          :class="`todoNameList__content${currentDataKeyName === datum.value ? ' is-actived': '' }`"
          :data-id="datum.value"
          @click="switchToDo">{{ datum.name }}</div>
        </li>
      </ul>
    </section>
    <mix-todoname-popup :isShown="mixTodonamePopup.isShown"/>
    <mix-action-controllers
      :buttons="mixActionControllers.buttons"
      :actions="[
        { name: '計画の新規作成', event: showPopup },
        { name: '計画の削除', event: prepareDelete },
        // { name: '計画の名前変更', event:'' }
      ]"
      :delAction="deleteList"
    />
  </div>
</template>

<script>
import AppLoadding from '~/components/simple/app-loading';
import checkIcon from '~/components/simple/check-icon';
import MixActionControllers from '~/components/mix/mix-action-controllers';
import MixTodonamePopup from '~/components/mix/mix-todoname-popup';
import firebase from "~/plugins/firebase";
import { showAlert } from "~/plugins/util";
import { mapState } from 'vuex';

export default {
  layout: "default",
  components: {
    AppLoadding,
    MixActionControllers,
    MixTodonamePopup,
    checkIcon
  },
  data() {
    return {
      user: {},
    };
  },
  watch: {
    currentTodoname (val, oldVal) {
      setTimeout(() => this.$router.push('/'), 300);
    }
  },
  computed: {
    ...mapState('todo-item', [
      'currentDataKeyName',
      'currentTodoname'
    ]),
    ...mapState('list', [
      'data',
      'isDeletable',
      'deletionData'
    ]),
    ...mapState('user', [
      'isUser',
      'uid'
    ]),
    ...mapState('mix-todoname-popup', {
      mixTodonamePopup: (state) => {
        return {
          isShown: state.isShown,
        }
      }
    }),
    ...mapState('mix-action-controllers', {
      mixActionControllers: (state) => {
        return {
          buttons: state.buttons,
          isActived: state.isActived,
        }
      }
    }),
  },
  async mounted() {
    if (!this.isUser) {
      firebase.auth().onAuthStateChanged((result) => {
        if (result) {
          this.$store.commit('user/setUser', { bool: true });
          this.$store.commit('user/setUid', { uid: result.uid });
          this.init();
        } else {
          this.$router.push("/sign-in");
        }
      });
    } else {
      this.init();
    }
  },
  methods: {
    init() {
      if (this.isDeletable) {
        this.$store.commit('mix-action-controllers/initializeState');
        this.$store.commit('list/resetDeletionData');
        this.$store.commit('list/isDeletable');
      }
      this.$store.dispatch('list/getList', { uid: this.uid });
    },
    switchToDo(e) {
      if (this.isDeletable === false) {
        this.$store.commit('todo-item/setTodoState', {
          key: e.target.dataset.id,
          name: e.target.innerText,
        });
        const docId = this.$store.getters['todo-item/docId'];
        this.$store.dispatch('todo-item/getTodo', { docId, uid: this.uid });
      }
    },
    showPopup() {
      this.$store.commit('mix-todoname-popup/show');
      this.$store.commit('mix-action-controllers/initializeState');
    },
    prepareDelete() {
      if (this.data.length > 1) {
        this.$store.commit('mix-action-controllers/enableDelbutton');
        this.$store.commit('list/isDeletable');
      } else {
        showAlert('作成済みの計画が１件しかないため削除できません');
      }
    },
    setDeletionData(data) {
       const deletionList = JSON.parse(data.dataSetVal);
      if (data.isChecked) {
        this.$store.commit('list/appendDeletionData', deletionList);
      } else {
        const idx = this.deletionData.findIndex(item => item.value === deletionList.value);
        this.$store.commit('list/removeDeletionData', idx);
      }
    },
    async deleteList() {
      await this.$store.dispatch('list/deleteList', {
        uid: this.uid,
        data: this.deletionData,
      });
      this.$store.commit('mix-action-controllers/initializeState');
      this.$store.commit('list/resetDeletionData');
      this.$store.commit('list/isDeletable');
    }
  },
};
</script>

<style lang="scss" scoped>
.list {
  &__section {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: calc(100vh - (#{$app-header-height + $app-footer-height}));
  }
}

.todoNameList {
  width: 100%;
  height: 100%;
  padding: 16px;
  list-style: none;
  &__item {
    display: flex;
    width: 100%;
    height: 44px;
    & + .todoNameList__item {
      margin-top: 8px;
    }
    & /deep/ .checkIcon {
      min-width: 48px;
      height: 100%;
    }
  }
  &__content {
    width: 100%;
    line-height: 44px;
    padding-left: 16px;
    box-sizing: border-box;
    background-color: #c4c4c4;
    &.is-actived {
      background: $app-color;
      color: #fff;
    }
  }
}
</style>

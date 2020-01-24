<template>
  <div class="list">
    <app-loadding :isHide="isUser"/>
    <mix-lock-screen/>
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
        { name: '計画の新規作成', event: showListCreating },
        { name: '計画の削除', event: prepareDelete },
        // { name: '計画の名前変更', event:'' }
      ]"
      :delAction="deleteList"
    />
  </div>
</template>

<script>
import AppLoadding from '~/components/single/app-loading';
import checkIcon from '~/components/single/check-icon';
import MixActionControllers from '~/components/mix/mix-action-controllers';
import MixTodonamePopup from '~/components/mix/mix-todoname-popup';
import MixLockScreen from '~/components/mix/mix-lock-screen';
import fb from "~/plugins/firebase";
import { showAlert } from "~/plugins/util";
import { mapState } from 'vuex';

export default {
  layout: "default",
  components: {
    AppLoadding,
    MixActionControllers,
    MixTodonamePopup,
    MixLockScreen,
    checkIcon,
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
    ...mapState('mix-todo-item', [
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
      'uid',
      'emailVerified'
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
    fb.analytics().logEvent('page_view', {
      page_location: window.location.href,
      page_title: '[list]odekake-todo',
      is_pwa: window.matchMedia('(display-mode: standalone)').matches
    });
    if (window.unsubscribe) window.unsubscribe();
    // Root(/)ページ経由でアクセスの場合（user 情報が既にセットされている）
    if (this.isUser && this.emailVerified) {
      this.init();
    // このページにダイレクトでアクセスの場合
    } else {
      const user = await this.getAuthState();
      // ログイン済みかつ、メール認証済みの場合
      if (user && (user.emailVerified || user.email === 'test-account@test.com')) {
        this.$router.push("/");
      // ログイン済みかつ、メール認証が済んでいない場合
      } else if (user) {
        this.$store.commit('user/setUser', {
          isUser: true,
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified
        });
      } else {
        this.$router.push("/sign-in");
      }
    }
  },
  methods: {
    init() {
      if (this.isDeletable) {
        this.$store.commit('list/resetDeletionData');
        this.$store.commit('list/isDeletable');
      }
      this.$store.commit('mix-action-controllers/initializeState');
      this.$store.dispatch('list/getList', { uid: this.uid });
    },
    getAuthState() {
      return new Promise((resolve) => {
        window.unsubscribe = fb.auth().onAuthStateChanged(user => user ? resolve(user) : resolve(false));
      });
    },
    switchToDo(e) {
      if (this.isDeletable === false) {
        if (e.target.classList.contains('is-actived')) return this.$router.push('/');
        this.$store.commit('mix-todo-item/setTodoState', {
          key: e.target.dataset.id,
          name: e.target.innerText,
        });
        const docId = this.$store.getters['mix-todo-item/docId'];
        this.$store.dispatch('mix-todo-item/getTodo', { docId, uid: this.uid });
      }
    },
    showListCreating() {
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
    justify-content: flex-start;
    align-items: center;
    height: calc(100vh - (#{$app-header-height + $app-footer-height}));
    overflow-y: scroll;
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

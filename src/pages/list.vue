<template>
  <div class="list">
    <app-loadding :isHide="isUser"/>
    <section class="list__section">
      <ul class="list__todoNames">
        <li
          :class="`list__todoName${currentDataKeyName === datum.value ? ' is-actived': '' }`"
          v-for="(datum, index) of data"
          :key="index"
          :data-id="datum.value"
          @click="switchToDo">{{ datum.name }}
        </li>
      </ul>
      <add-button/>
    </section>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import AppLoadding from '~/components/simple/app-loading';
import AddButton from '~/components/simple/add-button';
import { mapState } from 'vuex';

export default {
  layout: "default",
  components: {
    AppLoadding,
    AddButton
  },
  data() {
    return {
      user: {}
    };
  },

  computed: {
    ...mapState('todo-item', [
      'currentDataKeyName'
    ]),
    ...mapState('list', [
      'data'
    ]),
    ...mapState('user', [
      'isUser',
      'uid'
    ]),
  },

  async mounted() {
    // console.log('PAGE::list');
    if (!this.isUser) {
      firebase.auth().onAuthStateChanged((result) => {
        if (result) {
          // console.log(result);
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
      this.$store.dispatch('list/getList', { uid: this.uid });
    },
    switchToDo(e) {
      // console.log(e.target.innerText);
      this.$store.commit('todo-item/switchToDo', {
        key: e.target.dataset.id,
        name: e.target.innerText,
      });
      // console.log('component::end switchToDo');
      const docId = this.$store.getters['todo-item/docId'];
      this.$store.dispatch('todo-item/getTodo', { docId, uid: this.uid });
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
  &__todoNames {
    width: 100%;
    height: 100%;
    padding: 16px;
    list-style: none;
  }
  &__todoName {
    width: 100%;
    height: 44px;
    line-height: 44px;
    padding-left: 16px;
    box-sizing: border-box;
    background-color: #c4c4c4;
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
    &.is-actived {
      background: $app-color;
      color: #fff;
    }
  }
}
</style>

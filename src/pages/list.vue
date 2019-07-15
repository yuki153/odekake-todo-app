<template>
  <div class="list">
    <app-loadding :isHide="isUser"/>
    <section class="list__section">
      <ul class="list__todoNames">
        <li class="list__todoName"
          v-for="(datum, index) of data"
          :key="index"
          :data-id="datum.value">{{ datum.name }}</li>
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
      isUser: false,
      user: {}
    };
  },

  computed: {
    ...mapState('list', [
      'data'
    ])
  },

  mounted() {
    console.log('PAGE::list');
    this.isUser = this.$store.getters['user/isUser'];
    if (!this.isUser) {
      firebase.auth().onAuthStateChanged((result) => {
        if (result) {
          this.isUser = true;
          this.user = result;
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
      this.$store.dispatch('list/getList');
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
    }
  }
}
</style>

<template>
  <div v-if="this.emailVerified === false" class="lockScreen">
    <modal-screen :isShown="true">
      <svg class="lock-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-5 7.723v2.277h-2v-2.277c-.595-.347-1-.984-1-1.723 0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723zm-5-7.723v-4c0-2.206 1.794-4 4-4 2.205 0 4 1.794 4 4v4h-8z"/>
      </svg>
      <p>email アドレス確認のためメールを送信しました。そちらからアドレス確認作業を行って頂いた後、サービスがご利用可能になります。</p>
      <app-button :is-actived="true" @click.native="pageReload">アドレス確認を行いました</app-button>
    </modal-screen>
  </div>
</template>

<script>
import AppButton from '~/components/single/app-button';
import ModalScreen from '~/components/single/modal-screen';
import { mapState } from 'vuex';

export default {
  components: {
    AppButton,
    ModalScreen
  },
  computed: {
    ...mapState('user', [
      'emailVerified'
    ]),
  },
  methods: {
    pageReload() {
      window.location.reload();
    }
  },
};
</script>

<style lang="scss" scoped>
.lockScreen > .modal-screen {
  width: 100%;
  height: calc(100% - 54px);
  color: #fff;
  padding: 20px;
  flex-direction: column;

  p {
    margin-bottom: 40px;
  }

  .lock-icon {
    width: 20px;
    height: 20px;
    margin-bottom: 20px;
  }

  .appButton {
    width: 180px;
  }
}
</style>


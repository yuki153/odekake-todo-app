<template>
  <div class="modalButton">
    <modal-screen :isShow="isModalState"/>
    <add-button :isActive="isButtonState" @click.native="toggleModalState"/>
  </div>
</template>

<script>
import AddButton from '~/components/simple/add-button';
import ModalScreen from '~/components/simple/modal-screen';

export default {
  components: {
    AddButton,
    ModalScreen
  },
  data() {
    return {
      isModalState: false,
      isButtonState: false,
    }
  },
  methods: {
    toggleModalState: function() {
      this.isModalState = !this.isModalState;
      this.isButtonState = this.isModalState === true;
    }
  }
}

</script>

<style lang="scss" scoped>

</style>

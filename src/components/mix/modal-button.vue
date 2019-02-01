<template>
  <div class="modalButton">
    <modal-screen :isShow="isModalState">
      <div class="iconList">
        <p class="iconList__title">アイコンを選択してください</p>
        <ul class="iconList__items">
          <li class="iconList__item -lightGreen-01"></li>
          <li class="iconList__item -green-01"></li>
          <li class="iconList__item -blue-02"></li>
          <li class="iconList__item -purple-01"></li>
          <li class="iconList__item -lightBlue-01"></li>
          <li class="iconList__item -lightBlue-02"></li>
          <li class="iconList__item -yellow-01"></li>
          <li class="iconList__item -orange-01"></li>
          <li class="iconList__item -orange-02"></li>
          <li class="iconList__item -red-01"></li>
          <li class="iconList__item -blue-01"></li>
          <li class="iconList__item -purple-02"></li>
        </ul>
      </div>
    </modal-screen>
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
.iconList {
  text-align: center;
  color: #fff;

  &__title {
    margin-bottom: 24px;
  }

  &__items {
    width: 240px;
    height: 180px;
    list-style: none;
  }

  &__item {
    width: 48px;
    height: 48px;
    margin: 0 16px 16px 0;
    background-color: #aaa;
    float: left;
    border-radius: 50%;

    &:nth-child(4n) {
      margin-right: 0;
    }
    &:nth-last-child(-n+4) {
      margin-bottom: 0;
    }

    &.-lightGreen-01 {background-color: #81B468}
    &.-green-01 {background-color: #4f9b4e}
    &.-purple-01 {background-color: #B588FF}
    &.-purple-02 {background-color: #C587E2}
    &.-lightBlue-01 {background-color: #73BABE}
    &.-lightBlue-02 {background-color: #90D2E0}
    &.-blue-01 {background-color: #92BFF4}
    &.-blue-02 {background-color: #889BFF}
    &.-yellow-01 {background-color: #F1D691}
    &.-orange-01 {background-color: #F1C591}
    &.-orange-02 {background-color: #FFA488}
    &.-red-01 {background-color: #FF8888}
  }
}

</style>

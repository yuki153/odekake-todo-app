<template>
    <modal-screen :isShow="getModalState">
      <div class="iconList">
        <p class="iconList__title">アイコンを選択してください</p>
        <ul class="iconList__items">
          <li v-for="(icon, index) of icons" :key="index" class="iconList__item">
            <circle-icon
              :color="icon.hexCode"
              :img="icon.svg"
              :size="48" @click.native="clickHandler(icon.hexCode, icon.svg)"/>
          </li>
        </ul>
      </div>
    </modal-screen>
</template>

<script>
import ModalScreen from '~/components/simple/modal-screen';
import CircleIcon from '~/components/simple/circle-icon';
import icoHuman from '~/assets/svg/ico-human.svg';
import icoTrain from '~/assets/svg/ico-train.svg';
import icoCar from '~/assets/svg/ico-car.svg';
import icoAirport from '~/assets/svg/ico-airport.svg';
import icoShip from '~/assets/svg/ico-ship.svg';
import icoBicycle from '~/assets/svg/ico-bicycle.svg';
import icoEat from '~/assets/svg/ico-eat.svg';
import icoBag from '~/assets/svg/ico-bag.svg';
import icoCompany from '~/assets/svg/ico-company.svg';
import icoHome from '~/assets/svg/ico-home.svg';
import icoMoon from '~/assets/svg/ico-moon.svg';
import icoSun from '~/assets/svg/ico-sun.svg';

export default {
  components: {
    ModalScreen,
    CircleIcon
  },
  data() {
    return {
      icons : [
        { hexCode: '#81B468', svg: icoHuman },
        { hexCode: '#4f9b4e', svg: icoTrain },
        { hexCode: '#889BFF', svg: icoCar },
        { hexCode: '#B588FF', svg: icoAirport },
        { hexCode: '#73BABE', svg: icoShip },
        { hexCode: '#90D2E0', svg: icoBicycle },
        { hexCode: '#F1D691', svg: icoEat },
        { hexCode: '#F1C591', svg: icoBag },
        { hexCode: '#FFA488', svg: icoCompany },
        { hexCode: '#FF8888', svg: icoHome },
        { hexCode: '#92BFF4', svg: icoSun },
        { hexCode: '#C587E2', svg: icoMoon },
      ]
    }
  },
  computed: {
      getModalState: function() {
        return this.$store.state.isShowModal;
      }
  },
  methods: {
    clickHandler: function(hex, path) {
      this.$store.commit('setTodoItem', {
        hexCode: hex,
        svgPath: path,
      });
      this.$store.commit('changeModalState');
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
    margin: 0 16px 16px 0;
    float: left;

    &:nth-child(4n) {
      margin-right: 0;
    }
    &:nth-last-child(-n+4) {
      margin-bottom: 0;
    }
  }
}
</style>


<template>
  <div
    class="circleIcon"
    :style="{
      background: `url(${getImg}) ${color} no-repeat center center / 60% auto`,
      width: size + 'px',
      height: size + 'px'
    }">
  </div>
</template>
<script>
// TODO: Investigate　performance.
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
  props: {
    color: String,
    img: String,
    size: Number
  },
  computed: {
    getImg: function() {
      switch(this.img) {
        case 'icoHuman':
          return icoHuman;
        case 'icoTrain':
          return icoTrain;
        case 'icoCar':
          return icoCar;
        case 'icoAirport':
          return icoAirport;
        case 'icoShip':
          return icoShip;
        case 'icoBicycle':
          return icoBicycle;
        case 'icoEat':
          return icoEat;
        case 'icoBag':
          return icoBag;
        case 'icoCompany':
          return icoCompany;
        case 'icoHome':
          return icoHome;
        case 'icoMoon':
          return icoMoon;
        case 'icoSun':
          return icoSun;
        default:
          return this.img || '';
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.circleIcon {
  border-radius: 50%;
}
</style>



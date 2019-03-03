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
import { mapState } from 'vuex';

export default {
  components: {
    ModalScreen,
    CircleIcon
  },
  data() {
    return {
      icons : [
        { hexCode: '#81B468', svg: 'icoHuman' },
        { hexCode: '#4f9b4e', svg: 'icoTrain' },
        { hexCode: '#889BFF', svg: 'icoCar' },
        { hexCode: '#B588FF', svg: 'icoAirport' },
        { hexCode: '#73BABE', svg: 'icoShip' },
        { hexCode: '#90D2E0', svg: 'icoBicycle' },
        { hexCode: '#F1D691', svg: 'icoEat' },
        { hexCode: '#F1C591', svg: 'icoBag' },
        { hexCode: '#FFA488', svg: 'icoCompany' },
        { hexCode: '#FF8888', svg: 'icoHome' },
        { hexCode: '#92BFF4', svg: 'icoSun' },
        { hexCode: '#C587E2', svg: 'icoMoon' },
      ]
    }
  },
  computed: {
    ...mapState('modal-screen', {
      getModalState: (state) => state.isShow,
    })
  },
  methods: {
    clickHandler: function(hex, path) {
      this.$store.commit('todo-item/setData', {
        hexCode: hex,
        svgName: path,
      });
      this.$store.commit('modal-screen/disableState');
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


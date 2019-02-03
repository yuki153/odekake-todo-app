<template>
    <modal-screen :isShow="getModalState">
      <div class="iconList">
        <p class="iconList__title">アイコンを選択してください</p>
        <ul class="iconList__items">
          <li v-for="(hexCode, index) of hexCodes" :key="index" class="iconList__item">
            <circle-icon :color="hexCode" :size="48" @click.native="clickHandler(hexCode)"/>
          </li>
        </ul>
      </div>
    </modal-screen>
</template>

<script>
import ModalScreen from '~/components/simple/modal-screen';
import CircleIcon from '~/components/simple/circle-icon';

export default {
  components: {
    ModalScreen,
    CircleIcon
  },
  data() {
    return {
      hexCodes: [
        '#81B468',
        '#4f9b4e',
        '#889BFF',
        '#B588FF',
        '#73BABE',
        '#90D2E0',
        '#F1D691',
        '#F1C591',
        '#FFA488',
        '#FF8888',
        '#92BFF4',
        '#C587E2'
      ]
    }
  },
  computed: {
      getModalState: function() {
        return this.$store.state.isShowModal;
      }
  },
  methods: {
    clickHandler: function(hex, path = '') {
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


<template>
  <div
    :class="`checkIcon${isChecked ? ' is-checked': ''}`"
    :data-id="dataSetVal"
    @click="toggleCheckmark"
  ></div>
</template>
<script>

export default {
  props: {
    dataSetVal: String,
  },
  data() {
    return {
      isChecked: false,
    }
  },
  methods: {
    toggleCheckmark(e) {
      this.isChecked = !this.isChecked;
      this.$emit('emitCheckmark', {
        isChecked: this.isChecked,
        dataSetVal: this.dataSetVal,
      })
    },
  }
};
</script>
<style lang="scss" scoped>
  .checkIcon {
    position: relative;
    width: 48px;
    height: 48px;

    &::before,
    &::after {
      content: '';
      position: absolute;
    }

    &::after {
      top: 44%;
      left: 6px;
      width: 20px;
      height: 10px;
      border-left: 4px solid #ccc;
      border-bottom: 4px solid #ccc;
      transform:  translate(0, -50%) rotate(-45deg);
    }
    &::before {
      top: 50%;
      left: 0;
      width: 32px;
      height: 32px;
      border: 2px solid #ccc;
      transform: translate(0, -50%);
    }

    &.is-checked::after,
    &.is-checked::before {
      border-color: #38c970;
    }
  }
</style>

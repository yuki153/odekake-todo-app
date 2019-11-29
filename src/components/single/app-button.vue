<template>
  <button :class="`appButton${isActived ? ' is-active' : ''}`">
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    isActived: false,
  }
}
</script>
<style lang="scss" scoped>
  .appButton {
    width: 100px;
    height: 40px;
    background-color: #ccc;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, .3) 0 3px 6px 0px;

    &.is-active {
      background-color: $app-color;
      box-shadow: rgba(0, 0, 0, .3) 0 3px 6px 0px;
    }
  }
</style>

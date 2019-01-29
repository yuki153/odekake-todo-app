<template>
  <button :class="`appButton${isActived ? ' isActive' : ''}`">
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
    box-shadow: #ddd 0 3px 6px 0px;

    &.isActive {
      background-color: $app-color;
      box-shadow: #bbb 0 3px 6px 0px;
    }
  }
</style>

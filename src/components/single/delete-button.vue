<template>
  <button
    v-if="isShown"
    class="deleteButton">
  </button>
</template>
<script>
export default {
  props: {
    isShown: Boolean
  }
}
</script>
<style lang="scss" scoped>
  .deleteButton {
    position: fixed;
    bottom: 64px;
    right: 16px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: url('~assets/svg/ico-trash.svg') $app-color no-repeat center center;
    box-shadow: #aaa 0 3px 6px 0px;
    outline: none;
    z-index: 90;
  }
</style>

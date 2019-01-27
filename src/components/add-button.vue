<template>
  <button class="addButton">
    <div class="addButton__graphic -stick01"></div>
    <div class="addButton__graphic -stick02"></div>
  </button>
</template>
<script>
export default {
  props: {
  }
}
</script>
<style lang="scss" scoped>
  .addButton {
    position: fixed;
    bottom: 64px;
    right: 16px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: $app-color;
    box-shadow: #ddd 0 3px 6px 0px;
    outline: none;

    &__graphic {
      position: absolute;
      width: 26px;
      height: 6px;
      background-color: #fff;

      &.-stick01 {
        transform: translate(-50%,-50%);
        top: 50%;
        left: 50%;
      }
      &.-stick02 {
        transform: translate(-50%,-50%) rotate(90deg);
        top: 50%;
        left: 50%;
      }

    }
  }
</style>

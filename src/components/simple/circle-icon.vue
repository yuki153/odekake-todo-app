<template>
  <div
    class="circleIcon"
    :style="{
      background: `url(${img}) ${color} no-repeat center center / 60% auto`,
      width: size + 'px',
      height: size + 'px'
    }">
  </div>
</template>
<script>
export default {
  props: {
    color: String,
    img: String,
    size: Number
  }
};
</script>
<style lang="scss" scoped>
.circleIcon {
  border-radius: 50%;
}
</style>



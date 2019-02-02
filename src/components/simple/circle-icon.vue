<template>
  <div
    class="circleIcon"
    :style="{ backgroundColor: color, width: size + 'px', height: size + 'px' }"
  ></div>
</template>
<script>
export default {
  props: {
    color: String,
    size: Number
  }
};
</script>
<style lang="scss" scoped>
.circleIcon {
  border-radius: 50%;
}
</style>



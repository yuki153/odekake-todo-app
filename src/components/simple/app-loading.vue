<template>
  <div :class="`appLoading${isHide ? ' isHide': ''}`">
      <img src="~/static/loading.gif" alt="ロード中です" width="40" height="auto">
  </div>
</template>

<script>
export default {
    props: {
        isHide: false,
    }
}
</script>

<style lang="scss" scoped>
.appLoading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;

    &.isHide {
        display: none;
    }
}
</style>

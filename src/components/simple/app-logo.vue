<template>
  <div class="AppLogo">
    <div class="AppLogo__logo"></div>
  </div>
</template>

<style lang="scss" scoped>

$logoSize1: 84px;
$logoSize2: 136px;

.AppLogo {
  position: relative;
  margin: 0 auto;
  width: $logoSize1;
  height: $logoSize1;
  &__logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 70%;
    width: 70%;
    background: url('/icon-192x192.png') $app-color center / contain;
    border-radius: 8px;
  }
}
@media screen and (min-width: 370px){
  .AppLogo {
    width: $logoSize2;
    height: $logoSize2;
  }
}
</style>

<template>
  <div class="loginLogo">
    <div class="loginLogo__logo"></div>
  </div>
</template>

<style lang="scss" scoped>

$logoSize1: 128px;
$logoSize2: 168px;

.loginLogo {
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
    background-color: #fc471e;
    border-radius: 8px;
  }
}
@media screen and (min-width: 370px){
  .loginLogo {
    width: $logoSize2;
    height: $logoSize2;
  }
}
</style>

<template>
  <div class="default">
    <app-header/>
    <nuxt />
    <app-footer/>
  </div>
</template>
<script>
import AppHeader from '~/components/app-header.vue';
import AppFooter from '~/components/app-footer.vue';

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: #333;
}
.default {
  background-color: #fff6f4;
  width: 100%;
  height: 100vh;
}
</style>

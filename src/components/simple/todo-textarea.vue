<template>
  <textarea
    class="todoTextarea"
    placeholder="予定を入力してください"
    :value="text">
  </textarea>
</template>
<script>
export default {
  props: {
    text: String,
  }
}
</script>
<style lang="scss" scoped>
.todoTextarea {
  background-color: #fff;
  width: 100%;
  min-height: 56px;
  font-size: 12px;
  padding: 4px;
  border: 1px solid #c4c4c4;
}
</style>



<template>
  <textarea
    class="todoTextarea"
    placeholder="予定を入力してください"
    @change="emit"
    ref="textarea"></textarea>
</template>
<script>
export default {
  props: {
    text: String,
  },
  mounted() {
    this.$refs.textarea.value = this.text;
  },
  methods: {
    emit(e) {
      this.$emit('emitValue', e.target.value);
    }
  }
}
</script>
<style lang="scss" scoped>
.todoTextarea {
  background-color: #fff;
  width: 100%;
  min-height: 56px;
  font-size: 16px;
  padding: 4px;
  border: 1px solid #c4c4c4;
}
</style>



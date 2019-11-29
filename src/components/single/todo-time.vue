<template>
  <form class="todoTime">
    <input class="todoTime__timer" type="time" name="time" value="12:00" @change="updateTime">
  </form>
</template>
<script>
export default {
  props: {
    hour: String,
    min: String,
  },
  watch: {
    min: function (val, oldVal) {
      // console.log(val);
      this.setTime();
    }
  },
  mounted() {
    // console.log('mounted::todo-time');
    this.setTime();
  },
  methods: {
    setTime() {
      const form = this.$el;
      if(this.hour && this.min) form['time'].value = `${this.hour}:${this.min}`;
    },
    updateTime(e) {
      this.$emit('emitTime', e.target.value);
    }
  }
};
</script>
<style lang="scss" scoped>
.todoTime {
  &__timer {
    appearance: none;
    outline: none;
    padding: 4px 8px 4px 7px;
    height: 24px;
    width: auto;
    background-color: #fff;
    &::-webkit-date-and-time-value {
      margin: 0px;
    }
  }
}
</style>

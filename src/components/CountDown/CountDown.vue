<template>
  <div>
    <slot :isCountingDown="isCountingDown" :num="num"></slot>
  </div>
</template>

<script>
export default {
  name: 'CountDown',

  props: {
    initNum: {
      type: Number,
      default: 5
    }
  },

  data () {
    return {
      isCountingDown: false,
      num: this.initNum
    }
  },

  methods: {
    startCountDown () {
      this.num = this.initNum
      this.isCountingDown = true
      this.countDownHandler()
    },
    countDownHandler () {
      window.setTimeout(() => {
        this.num = this.num - 1

        if (this.num === 0) {
          this.isCountingDown = false
          return
        }

        this.countDownHandler()
      }, 1000)
    }
  }
}
</script>

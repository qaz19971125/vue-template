<template>
  <el-dialog v-bind="$attrs" :close-on-click-modal="false" v-on="$listeners">
    <slot></slot>

    <div slot="footer" class="form-dialog__footer">
      <el-button @click="cancel">{{ cancelBtnText }}</el-button>
      <el-button type="primary" @click="confirm">{{ confirmBtnText }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'FormDialog',
  props: {
    /**
     * 确认功能按钮的文字
     */
    confirmBtnText: {
      type: String,
      default: '确认'
    },
    /**
     * 取消功能按钮的文字
     */
    cancelBtnText: {
      type: String,
      default: '取消'
    }
  },
  data() {
    return {}
  },
  methods: {
    confirm() {
      /**
       * 点击确认按钮后触发
       */
      this.$emit('confirm')
    },
    cancel() {
      /**
       * 点击取消按钮后触发
       */
      this.$emit('cancel')
    }
  }
}
</script>

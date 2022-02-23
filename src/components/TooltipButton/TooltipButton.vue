<template>
  <el-tooltip :content="content" :placement="placement">
    <el-button v-bind="$attrs" v-on="$listeners">
      <slot>{{ content }}</slot>
    </el-button>
  </el-tooltip>
</template>

<script>
export default {
  name: 'TooltipButton',
  /* eslint-disable vue/require-default-prop */
  props: {
    content: String,
    placement: {
      type: String,
      default: 'bottom'
    }
  }
}
</script>

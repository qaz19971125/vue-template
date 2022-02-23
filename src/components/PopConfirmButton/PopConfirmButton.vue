<template>
  <el-popconfirm v-bind="$attrs" :icon="popConfirmIcon" :title="title" v-on="$listeners">
    <template #reference>
      <tooltip-button v-bind="$attrs" :content="content" :icon="buttonIcon" placement="top">
        <slot></slot>
      </tooltip-button>
    </template>
  </el-popconfirm>
</template>

<script>
import TooltipButton from '../TooltipButton/TooltipButton.vue'

export default {
  name: 'PopConfirmButton',
  components: {
    TooltipButton
  },
  /* eslint-disable vue/require-default-prop */
  props: {
    popConfirmIcon: {
      type: String,
      default: 'el-icon-question'
    },
    title: String,
    content: String,
    buttonIcon: String
  }
}
</script>

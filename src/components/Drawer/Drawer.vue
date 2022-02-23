<template>
  <div
    v-if="visible"
    class="drawer"
    :class="[direction === 'right' ? 'drawer--right' : 'drawer--left']"
    :style="{
      width: expanded ? '100%' : width,
      height: '100%'
    }"
  >
    <div class="drawer__content">
      <slot></slot>
    </div>
    <div class="drawer__handler-wrapper">
      <button class="drawer__handler drawer__handler--close" @click="close">
        <i class="el-icon-arrow-right"></i>
      </button>
      <button v-if="!expanded" class="drawer__handler drawer__handler--expanded" @click="expand">
        <i class="el-icon-arrow-left"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  props: {
    visible: Boolean,
    /**
     * 抽屉方向
     * left 或者 right
     */
    direction: {
      type: String,
      default: 'right'
    },
    /**
     * 非expanded状态下的抽屉长度
     */
    width: {
      type: String,
      default: '70%'
    }
  },
  data() {
    return {
      expanded: false
    }
  },
  methods: {
    expand() {
      this.expanded = true
    },
    close() {
      if (this.expanded) {
        this.expanded = false
      } else {
        this.$emit('update:visible', false)
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/var';

.drawer {
  position: absolute;
  top: 0;
  z-index: 1000;
  background: $--color-white;
  border: 1px solid $--border-color-base;
}

.drawer--right {
  right: 0;
  border-left: 1px solid $--border-color-base;
  .drawer__handler-wrapper {
    left: -18px;
  }
}

.drawer--left {
  left: 0;
  border-right: 1px solid $--border-color-base;
  .drawer__handler--close,
  .drawer__handler--expanded {
    transform: rotate(180deg);
  }
  .drawer__handler-wrapper {
    right: -18px;
  }
}

.drawer__content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.drawer__handler-wrapper {
  position: absolute;
  top: 50%;
  z-index: 2;
  transform: translateY(-50%);
}

.drawer__handler {
  display: block;
  padding: 8px 0px;
  font-size: 16px;
  line-height: 1;
  color: $--color-primary;
  white-space: normal;
  cursor: pointer;
  background: #fafafa;
  border: 1px solid $--border-color-base;
  outline: none;
  transition: all 0.3s;
  &:hover {
    color: #fafafa;
    background: $--color-primary;
  }
}
</style>

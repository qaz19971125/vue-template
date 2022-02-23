<template>
  <div>
    <template v-if="route">
      <router-link :to="resolvePath(route.path)">
        <el-menu-item
          :class="{ 'submenu-title-noDropdown': !isNest }"
          :index="resolvePath(route.path)"
        >
          <item :icon="route.meta && route.meta.icon" :title="route.meta && route.meta.title" />
        </el-menu-item>
      </router-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <item :icon="item.meta && item.meta.icon" :title="item.meta && item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in childRoutes"
        :key="child.path"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
        :is-nest="true"
        :item="child"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import Item from './Item'

export default {
  name: 'SidebarItem',
  components: { Item },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  computed: {
    route() {
      if (this.childRoutes.length > 1) {
        return null
      } else if (this.childRoutes.length === 1) {
        return this.childRoutes[0]
      } else {
        return { ...this.item, path: '' } // 置空path，确保resolvePath的正确性
      }
    },
    childRoutes() {
      return this.item.children
        ? this.item.children.filter((route) => {
            const hidden = !!route.hidden
            return !hidden
          })
        : []
    }
  },
  methods: {
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

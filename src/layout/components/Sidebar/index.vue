<template>
  <aside class="app-sidebar">
    <logo :collapse="isCollapse" />
    <el-scrollbar>
      <el-menu
        :active-text-color="vars.menuActiveText"
        :background-color="vars.menuBg"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="activeMenu"
        mode="vertical"
        :text-color="vars.menuText"
        :unique-opened="false"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :base-path="route.path"
          :item="route"
        />
      </el-menu>
    </el-scrollbar>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import vars from '@/styles/var.scss'

export default {
  name: 'Sidebar',
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(['sidebar']),
    routes() {
      return this.$router.options.routes.filter((route) => {
        const hidden = !!route.hidden
        return !hidden
      })
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    vars() {
      return vars
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

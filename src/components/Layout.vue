<template>
  <el-container>
    <el-header class="topContent"> <top-nav /></el-header>
    <el-container>
      <el-aside :class="store.isCollapse ? 'sideWidth' : ''"
        ><side-menu
      /></el-aside>
      <el-main><main-content /></el-main>
    </el-container>
  </el-container>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import MainContent from "./MainContent.vue";
import SideMenu from "./SideMenu.vue";
import TopNav from "./TopNav.vue";
import { appStore } from "../store/appStore";

interface State {
  collapseWidth: string;
}

export default defineComponent({
  components: { SideMenu, TopNav, MainContent },
  setup() {
    const collapseWidth = ref<State>({
      collapseWidth: "240px",
    });
    const store = appStore();

    return {
      collapseWidth,
      store,
    };
  },
});
</script>
<style lang='scss' scoped>
.topContent {
  background-color: $primary-color;
  color: $white;
  margin: 0;
  display: flex;
  align-items: center;
}
.sideWidth {
  width: 80px;
  overflow-x: hidden;
}
</style>
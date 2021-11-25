<template>
  <el-container>
    <el-header class="topContent"> <top-nav /></el-header>
    <el-container>
      <el-aside><side-menu /></el-aside>
      <el-main><main-content /></el-main>
    </el-container>
  </el-container>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import MainContent from "./MainContent.vue";
import SideMenu from "./SideMenu.vue";
import TopNav from "./TopNav.vue";

export default defineComponent({
  components: { SideMenu, TopNav, MainContent },
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
</style>
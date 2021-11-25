<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="store.isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <base-sub-menu :routes="routesList"></base-sub-menu>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons";
import { routes } from "../router";
import BaseSubMenu from "./menu/BaseSubMenu.vue";
import { appStore  } from "../store/appStore";

export default defineComponent({
  components: {
    Location,
    Document,
    Setting,
    IconMenu,
    BaseSubMenu,
  },
  setup() {
    const routesList =ref(routes)
     const store = appStore();
    
    const handleOpen = (key: string, keyPath: string) => {
      console.log(key, keyPath);
    };
    const handleClose = (key: string, keyPath: string) => {
      console.log(key, keyPath);
    };
    
    return {
      handleOpen,
      handleClose,
      routesList,
      store
    };
  },
});
</script>

<style>
</style>
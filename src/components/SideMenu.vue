<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="store.isCollapse"
  >
    <base-sub-menu :routes="routesList"></base-sub-menu>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { routes } from "../router";
import BaseSubMenu from "./menu/BaseSubMenu.vue";
import { appStore } from "../store/appStore";

export default defineComponent({
  components: {
    BaseSubMenu,
  },
  setup() {
    const routesList = ref(routes);
    const store = appStore();

    return {
      routesList,
      store,
    };
  },
});
</script>

<style>
</style>
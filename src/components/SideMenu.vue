<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
  <base-sub-menu :routes="routes"></base-sub-menu>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons";
import { routes } from "../router";
import BaseSubMenu from "./menu/BaseSubMenu.vue";

export default defineComponent({
  components: {
    Location,
    Document,
    Setting,
    IconMenu,
    BaseSubMenu
  },
  setup() {
    const state = {
      routes,
    };
    const isCollapse = ref(false);
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      isCollapse,
      handleOpen,
      handleClose,
      ...toRefs(state),
    };
  },
});
</script>

<style>
</style>
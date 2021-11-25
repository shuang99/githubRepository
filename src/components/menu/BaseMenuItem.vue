<template>
  <el-menu-item :index="routerItem.path">
    <el-icon><setting /></el-icon>
    <span>{{ routerItem.meta.title }}</span>
  </el-menu-item>
</template>

<script lang='ts'>
import { defineComponent, toRefs } from "vue";
export default defineComponent({
  props: {
    routerItem: {
      type: Object,
      require: true,
    },
  },
  setup(props) {
    const state = {
    };

    return {
    };
  },
});
</script>
<style lang='scss' scoped>
</style>
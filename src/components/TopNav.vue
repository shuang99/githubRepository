<template>
  <div style="width: 200px">vue3.0项目</div>
  <div @click="toggleCollapse">切换</div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { appStore } from "../store/appStore";

export default defineComponent({
  setup() {
    const store = appStore();
    const toggleCollapse = () => {
      store.isCollapse = !store.isCollapse;
    };

    return {
      toggleCollapse,
    };
  },
});
</script>
<style lang='scss' scoped>
</style>
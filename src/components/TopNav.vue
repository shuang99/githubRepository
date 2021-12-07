<template>
  <el-row style="width: 100%">
    <el-col :span="4">
      <div>{{ setting.systemName }}</div>
    </el-col>
    <el-col :span="2"
      ><el-icon :size="18" @click="toggleCollapse"
        ><expand v-if="store.isCollapse" /><fold v-else /></el-icon
    ></el-col>
    <el-col :span="18" class="topRight">
      <el-icon :size="18"><switch-button /></el-icon>
    </el-col>
  </el-row>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { appStore } from "../store/appStore";
import { SwitchButton, Expand, Fold } from "@element-plus/icons";
import setting from "@/setting.config";

export default defineComponent({
  components: {
    SwitchButton,
    Expand,
    Fold,
  },
  setup() {
    const state = reactive({
      setting,
    });
    const store = appStore();
    const toggleCollapse = () => {
      store.isCollapse = !store.isCollapse;
    };

    return {
      toggleCollapse,
      store,
      ...toRefs(state),
    };
  },
});
</script>
<style lang='scss' scoped>
.topRight {
  text-align: right;
}
</style>
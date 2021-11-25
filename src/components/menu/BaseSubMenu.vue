  <template>
  <template v-for="routerItem in routes" :key="routerItem.path">
    <el-sub-menu
      v-if="routerItem.children"
      :key="routerItem.path"
      :index="routerItem.path"
    >
      <template #title>
        <el-icon><location /></el-icon>
        <span>{{ routerItem.meta.title }}</span>
      </template>
      <base-sub-menu :routes="routerItem.children" v-if="routerItem.children"/>
      <el-menu-item-group v-else :title="routerItem.meta.title">
        <base-menu-item :routerItem="routerItem" />
      </el-menu-item-group>
    </el-sub-menu>
    <base-menu-item v-else :routerItem="routerItem" />
  </template>
</template>

<script lang='ts'>
import { defineComponent, toRefs } from "vue";
import BaseMenuItem from "./BaseMenuItem.vue";
export default defineComponent({
  components: {
    BaseMenuItem,
  },
  props: {
    routes: {
      type: Array,
      require: true,
    },
  },
  setup(props) {
    const state = {};
    return {};
  },
});
</script>
<style lang='scss' scoped>
</style>
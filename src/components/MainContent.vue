<template>
  <div class="">maincontent</div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import http from "@/utils/http.ts";
export default defineComponent({
  setup() {
    http.post('/getTableList').then((res:any)=>{
        console.log(res)
    }).catch((err:any)=>{
         console.log(err);
    })
  },
});
</script>
<style lang='scss' scoped>
</style>
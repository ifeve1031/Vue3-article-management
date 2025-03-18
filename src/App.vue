<script setup>
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useUserStore } from './stores';
import zh from 'element-plus/es/locale/lang/zh-cn.mjs'

const router = useRouter()
const route = useRoute()
//tyltyltyltyltyl//
const goSearch = () => {
  console.log(router, route)
  router.push('/search')
}

const useStore = useUserStore()
</script>

<template>
  <div>
    <!--国际化处理-->
    <el-config-provider :locale="zh">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style scoped></style>

<script setup>
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useUserStore } from './stores';

const router = useRouter()
const route = useRoute()

const goSearch = () =>{
  console.log(router,route)
  router.push('/search')
}

const useStore = useUserStore()
</script>

<template>
  <div>
    <router-view></router-view>
    <h3>我是APP根目录
      <test-demo></test-demo>
      <el-button @click="$router.push('/home')">跳首页</el-button>
      <el-button @click="goSearch">跳搜索</el-button>
    </h3>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>

    <p>{{ useStore.token }}</p>
    <el-button @click="useStore.setToken('abcd')">登录</el-button>
    <el-button @click="useStore.removeToken">退出</el-button>
  </div>
</template>

<style scoped>

</style>

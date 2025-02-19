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
  </div>
</template>

<style scoped>

</style>

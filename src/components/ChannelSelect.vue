<script setup>
import {ref} from 'vue'
import { artGetChannelsService } from '@/api/article';

const channelList = ref([])
const getChannelList = async () =>{
    const res = await artGetChannelsService()
    console.log(res)
    channelList.value = res.data.data
}
getChannelList()
//父传子
const emit = defineEmits(['update:modelValue'])
//子传父
defineProps({
    modelValue:{
        type:[String,Number]
    }
})


</script>

<template>
    <!-- 适用广泛的基础单选 v-model 的值为当前被选中的 el-option 的 value 属性值 -->
     <!-- v-model == :modelValue 和  @update:modelValue -->
    <el-select :modelValue="modelValue" @update:modelValue="emit('update:modelValue',$event)">
        <el-option v-for="channel in channelList" key="channel.id" :label="channel.cate_name" :value="channel.id" />
    </el-select>
</template>
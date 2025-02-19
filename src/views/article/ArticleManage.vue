<script setup>
import { ref } from 'vue'
//控制弹层显示
const dialog = ref()
const onEditChannel = () => {
    //console.log(dialog.value)
    dialog.value.open()
}
</script>

<template>
    <!-- 插槽 -->
    <page-container title="文章管理">
        <!-- 具名插槽 -->
        <template #extra>
            <el-button type="primary"  @click="onEditChannel">发布文章</el-button>
        </template>
        主体部分
    </page-container>
    <!-- 弹层插槽 -->
    <channel-edit ref="dialog"></channel-edit>
</template>
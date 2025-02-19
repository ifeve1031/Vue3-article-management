<script setup>
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { artGetChannelsService } from '@/api/article';

//加载loading
const loading = ref(false)

//获取分类列表
const channelList = ref([])
const getChannelList = async () => {
    //请求时进行loading，请求完成后关闭
    loading.value = true
    const res = await artGetChannelsService()
    channelList.value = res.data.data
    console.log(channelList.value)
    loading.value = false
}
getChannelList()

//编辑按钮
const handleEdit = (row) => {
    console.log(row)
}
//删除
const handleDelete = (row) => {
    console.log(row)
}

//添加分类
//控制弹层显示
const dialog = ref()
const onAddChannel = () => {
    //console.log(dialog.value)
    dialog.value.open()
}

</script>

<template>
    <!-- 插槽 -->
    <page-container title="文章分类">
        <!-- 具名插槽 -->
        <template #extra>
            <el-button type="primary" @click="onAddChannel">添加分类</el-button>
        </template>
        <!-- 封装接口，从接口中调取后台数据并渲染 -->
        <el-table v-loading="loading" :data="channelList" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"></el-table-column>
            <el-table-column label="分类名称" prop="cate_name"></el-table-column>
            <el-table-column label="分类别" prop="cate_alias"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="scope">
                    <el-button type="primary" :icon="Edit" circle plain @click="handleEdit(scope.row)">
                    </el-button>
                    <el-button type="danger" :icon="Delete" circle plain @click="handleDelete(scope.row)">
                    </el-button>
                </template>
            </el-table-column>
            <!-- 没有数据时的插槽 -->
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
    </page-container>
    <!-- 弹层插槽 -->
    <channel-edit ref="dialog"></channel-edit>
</template>

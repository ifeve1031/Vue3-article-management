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
import { artDelChannelsService, artGetChannelsService } from '@/api/article';

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

//添加分类
//控制弹层显示
const dialog = ref()
const onAddChannel = () => {
    //console.log(dialog.value)
    dialog.value.open({})
}

//编辑按钮
const onEditChannel = (row) => {
    console.log(row)
    dialog.value.open(row)
}
//删除
const onDelChannel = async (row) => {
    console.log(row)
    await ElMessageBox.confirm(
        '你确认删除该分类信息吗?',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            await artDelChannelsService(row.id)
            ElMessage.success('删除成功！')
            getChannelList()
        })
        .catch(() => {
        })

}
//更新列表，父组件监听 success 事件，进行调用回显
const onSuccess = () => {
    getChannelList()
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
                    <el-button type="primary" :icon="Edit" circle plain @click="onEditChannel(scope.row)">
                    </el-button>
                    <el-button type="danger" :icon="Delete" circle plain @click="onDelChannel(scope.row)">
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
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
</template>

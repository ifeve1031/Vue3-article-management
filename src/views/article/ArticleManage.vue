<script setup>
import { ref } from 'vue'
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'
import { artGetListService } from '@/api/article'

// 假数据
/* const articleList = ref([
    {
        id: 5961,
        title: '新的文章啊',
        pub_date: '2022-07-10 14:53:52.604',
        state: '已发布',
        cate_name: '体育'
    },
    {
        id: 5962,
        title: '新的文章啊',
        pub_date: '2022-07-10 14:54:30.904',
        state: '草稿',
        cate_name: '体育'
    }
]) */
//编辑
const onEditArticle = (row) => {
    console.log(row)
}
//删除
const onDeleteArticle = (row) => {
    console.log(row)
}
//双向绑定
//const cateId = ref(53588)
//父组件定义参数绑定
const params = ref({
    pagenum: 1,
    pagesize: 5,
    cate_id:'',
    state: ''
})
//获取列表数据 和 数据总数
const articleList = ref([])
const total = ref(0)
const getList = async () => {
    const res = await artGetListService(params.value)
    console.log('res',res)
    articleList.value = res.data.data
    total.value = res.data.total
}
getList()
</script>

<template>
    <!-- 插槽 -->
    <page-container title="文章管理">
        <!-- 具名插槽 -->
        <template #extra>
            <el-button type="primary">发布文章</el-button>
        </template>
        <!-- 表单部分 -->
        <el-form inline class="demo-form-inline">
            <el-form-item label="文章分类：">
                <ChannelSelect v-model="params.cate_id"></ChannelSelect>
            </el-form-item>
            <el-form-item label="发布状态：">
                <el-select v-model="params.state">
                    <el-option label="已发布" value="已发布" />
                    <el-option label="草稿" value="草稿" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="">
                    搜索
                </el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 表格部分 -->
        <el-table v-loading="loading" :data="articleList" style="width: 100%">
            <el-table-column label="文章标题" prop="title" width="400">
                <!-- 将文章标题作为链接 -->
                <template #default="{ row }">
                    <el-link type="primary" :underline="false">{{ row.title }}</el-link>
                </template>
            </el-table-column>
            <el-table-column label="分类" prop="cate_name"></el-table-column>
            <el-table-column label="发表时间" prop="pub_date"></el-table-column>
            <el-table-column label="状态" prop="state"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="scope">
                    <el-button type="primary" :icon="Edit" circle plain @click="onEditArticle(scope.row)">
                    </el-button>
                    <el-button type="danger" :icon="Delete" circle plain @click="onDeleteArticle(scope.row)">
                    </el-button>
                </template>
            </el-table-column>
            <!-- 没有数据时的插槽 -->
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
    </page-container>
</template>

<style lang="scss">
.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.demo-form-inline .el-select {
    --el-select-width: 220px;
}
</style>
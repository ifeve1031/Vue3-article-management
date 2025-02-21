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
import { formatTime } from '@/utils/formate'

//loading效果
const loading = ref(false)

//双向绑定
//const cateId = ref(53588)
//父组件定义参数绑定
const params = ref({
    pagenum: 1,
    pagesize: 5,
    cate_id: '',
    state: ''
})
//获取列表数据 和 数据总数
const articleList = ref([])
const total = ref(0)
const getList = async () => {
    loading.value = true
    const res = await artGetListService(params.value)
    //console.log('res', res)
    articleList.value = res.data.data
    total.value = res.data.total
    loading.value = false
}
getList()

//处理每页最大条数PageSize
const handleSizeChange = (pageSize) => {
    //console.log('当前页面大小', pageSize)
    params.value.pagenum = 1
    params.value.pagesize = pageSize
    getList()
}
//当前页数
const handleCurrentChange = (currentPage) => {
    //console.log('当前页面', currentPage)
    params.value.pagenum = currentPage
    getList()

}

//搜索
const onSearch = () => {
    //上面cate_id 和state 已进行双向绑定，所以直接重新渲染，并回到第一页
    params.value.pagenum = 1
    getList()

}
//重置
const onReset = () => {
    //清空cate_id 和state 并重新渲染
    params.value.pagenum = 1
    params.value.cate_id = ''
    params.value.state = ''
    getList()
}

//抽屉显示，ref绑定
const articleEditRef = ref()
const onAddArticle = () =>{
    articleEditRef.value.open({})
}
const onEditArticle = (row) =>{
    articleEditRef.value.open(row)
}
//删除
const onDeleteArticle = (row) => {
    //console.log(row)
}


</script>

<template>
    <!-- 插槽 -->
    <page-container title="文章管理">
        <!-- 具名插槽 -->
        <template #extra>
            <el-button type="primary" @click="onAddArticle">发布文章</el-button>
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
                <el-button type="primary" @click="onSearch">
                    搜索
                </el-button>
                <el-button @click="onReset">重置</el-button>
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
            <el-table-column label="发表时间" prop="pub_date">
                <!-- 具名插槽，存在的时候可以覆盖prop -->
                <template #default="{ row }">
                    {{ formatTime(row.pub_date) }}
                </template>
            </el-table-column>
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

        <!-- 分页部分 -->
        <el-pagination v-model:current-page="params.pagenum" v-model:page-size="params.pagesize"
            :page-sizes="[2, 3, 5, 10]" :size="size" :disabled="disabled" background="primary"
            layout="jumper, total, sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" style="margin-top: 20px; justify-content: flex-end" />

        <!-- 抽屉,通过 ref 绑定 -->
        <article-edit ref="articleEditRef"></article-edit>
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
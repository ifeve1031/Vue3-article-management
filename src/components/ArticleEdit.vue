<script setup>
import { ref } from 'vue'
const ruleFormRef = ref()
const drawer = ref(false)
//初始化表单formModel
const formModel = ref({
    id: '',
    title: '',
    state: '',
    cate_name: '',
})
//发布按钮
const submitForm = () =>{

}
//草稿按钮
const resetForm = () =>{
    
}


//增加回显
const open = (row) => {
    console.log(row)
    drawer.value = true
    formModel.value = { ...row }
}
//导出方法
defineExpose({
    open
})


</script>

<template>
    <el-drawer v-model="drawer" :title="formModel.id ? '编辑文章' : '添加文章'" direction="rtl" size="30%">
        <!-- 主体表单 -->
        <el-form :model="formModel" ref="ruleFormRef">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="formModel.title" />
            </el-form-item>
            <el-form-item label="文章分类" prop="cate_id">
                <ChannelSelect v-model="formModel.cate_name"></ChannelSelect>
            </el-form-item>
            <el-form-item label="文章封面">
                文件上传
            </el-form-item>
            <el-form-item label="文章内容">
                文章内容
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    发布
                </el-button>
                <el-button @click="resetForm(ruleFormRef)">草稿</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>
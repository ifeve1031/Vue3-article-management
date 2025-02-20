<script setup>
import { artAddChannelsService, artUpdateChannelsService } from '@/api/article'
import { ref, reactive } from 'vue'
//添加分类
//控制弹层显示,并增加回显效果
const dialogVisible = ref(false)
const open = (row) => {
    //console.log(row)
    dialogVisible.value = true
    formModel.value = { ...row }
    //console.log('您好',formModel.value)
}
//导出open方法
defineExpose({
    open
})
//初始化表单formModel
const formModel = ref({
    cate_name: '',
    cate_alias: ''
})
//校验规则rules
const rules = {
    cate_name: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
        { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' },
    ],
    cate_alias: [
        { required: true, message: '请输入分类别名', trigger: 'blur' },
        { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' },
    ],
}
//提交内容
const emit = defineEmits(['success'])
const formRef = ref()
const onsubmit = async () => {
    //预校验
    await formRef.value.validate()
    ElMessage.success('预校验成功！')
    if(!formModel.value.id){
        //添加操作
        await artAddChannelsService(formModel.value)
        ElMessage.success('添加成功！')
    }else{
        //编辑操作
        await artUpdateChannelsService(formModel.value)
        ElMessage.success('编辑成功！')
    }
    dialogVisible.value = false
    //子传父更新列表，通知父组件进行回显
    emit('success')
}
</script>

<template>
    <!-- 弹层 -->
    <el-dialog v-model="dialogVisible" :title="formModel.id? '编辑分类':'添加分类'" width="500">
        <el-form :model="formModel" :rules="rules" ref="formRef" label-width="100px" style="padding-right: 30px">
            <el-form-item label="分类名称" prop="cate_name">
                <el-input v-model="formModel.cate_name" />
            </el-form-item>
            <el-form-item label="分类别名" prop="cate_alias">
                <el-input v-model="formModel.cate_alias" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="onsubmit">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
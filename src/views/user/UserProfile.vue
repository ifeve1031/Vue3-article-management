<script setup>
import { userGetInfoService, userUpdateInfoService } from '@/api/user';
import { useUserStore } from '@/stores';
import { ref } from 'vue'


const ruleFormRef = ref()
//表单数据对象
const formModel = ref({
    username: '',
    nickname: '',
    email: '',
})

const userStore = useUserStore()
//console.log('个人信息', userStore)
formModel.value = userStore.userInfo
//console.log('个人信息', formModel.value)

//校验
const rules = ref({
    nickname: [
        { required: true, message: '请输入用户昵称', trigger: 'blur' },
        { pattern: /^\S{2,10}$/, message: '昵称必须是2-10位的非空字符串', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入用户邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ]
})

//提交修改
const onSubmitEdit = async () => {
    //校验表格
    const valid = await ruleFormRef.value.validate()
    //console.log('提交修改')
    if (valid) {
        await userUpdateInfoService(formModel.value)
        ElMessage.success('修改成功')
        userStore.getUserInfo()
    }
}


</script>

<template>
    <PageContainer title='个人资料'>
        <el-form ref="ruleFormRef" :model="formModel" :rules="rules" label-width="100px" class="demo-ruleForm"
            :size="formSize" status-icon style="max-width: 400px">
            <el-form-item label="登录名称" prop="username">
                <el-input v-model="formModel.username" disabled />
            </el-form-item>
            <el-form-item label="用户昵称" prop="nickname">
                <el-input v-model="formModel.nickname" />
            </el-form-item>
            <el-form-item label="用户邮箱" prop="email">
                <el-input v-model="formModel.email" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmitEdit">提交修改</el-button>
            </el-form-item>
        </el-form>
    </PageContainer>

</template>
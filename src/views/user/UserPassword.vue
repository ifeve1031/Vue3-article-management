<script setup>
import { userUploadPasswordService } from '@/api/user';
import router from '@/router';
import { useUserStore } from '@/stores';
import { ref } from 'vue';

// 表单绑定的数据
const pwdForm = ref({
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
});

// 自定义校验1：原密码和新密码不能一样
const checkOldSame = (rule, value, callback) => {
    if (value === pwdForm.value.old_pwd) {
        callback(new Error('原密码和新密码不能一样'));
    } else {
        callback();
    }
};

// 自定义校验2：新密码和确认密码必须一致
const checkNewSame = (rule, value, callback) => {
    if (value !== pwdForm.value.new_pwd) {
        callback(new Error('新密码和确认密码必须一致'));
    } else {
        callback();
    }
};

// 校验规则
const formRules = ref({
    old_pwd: [
        { required: true, message: '原密码不能为空', trigger: 'blur' },
        { pattern: /^\S{6,15}$/, message: '原密码长度应在 6 到 15 位之间', trigger: 'blur' }
    ],
    new_pwd: [
        { required: true, message: '新密码不能为空', trigger: 'blur' },
        { pattern: /^\S{6,15}$/, message: '新密码长度应在 6 到 15 位之间', trigger: 'blur' },
        { validator: checkOldSame, trigger: 'blur' }
    ],
    re_pwd: [
        { required: true, message: '确认密码不能为空', trigger: 'blur' },
        { pattern: /^\S{6,15}$/, message: '确认密码长度应在 6 到 15 位之间', trigger: 'blur' },
        { validator: checkNewSame, trigger: 'blur' }
    ]
});


const pwdFormRef = ref()
const userStore = useUserStore()
// 提交表单
const handleSubmit = async () => {
    const valid = pwdFormRef.value.validate()
    if(valid){
        //console.log('验证通过')
        await userUploadPasswordService(pwdForm.value)
        ElMessage.success('更新密码成功！')
        //清空登录信息并转到登录页重新登录
        userStore.removeToken()
        userStore.removeUserInfo()
        router.push('/login')
    }
};

// 重置表单
const handleReset = () => {
    pwdForm.value = {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
    };
};
</script>

<template>
    <PageContainer title="重置密码">
        <el-form :model="pwdForm" :rules="formRules" ref="pwdFormRef" label-width="80px" style="max-width: 400px">
            <!-- 第一行：原密码 -->
            <el-form-item label="原密码" prop="old_pwd">
                <el-input v-model="pwdForm.old_pwd" type="password" placeholder="请输入原密码"></el-input>
            </el-form-item>

            <!-- 第二行：新密码 -->
            <el-form-item label="新密码" prop="new_pwd">
                <el-input v-model="pwdForm.new_pwd" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>

            <!-- 第三行：确认密码 -->
            <el-form-item label="确认密码" prop="re_pwd">
                <el-input v-model="pwdForm.re_pwd" type="password" placeholder="请确认新密码"></el-input>
            </el-form-item>

            <!-- 第四行：两个按钮 -->
            <el-form-item>
                <el-button type="primary" @click="handleSubmit">修改密码</el-button>
                <el-button @click="handleReset">重置</el-button>
            </el-form-item>
        </el-form>
    </PageContainer>
</template>
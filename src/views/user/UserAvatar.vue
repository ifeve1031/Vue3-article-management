<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { userUploadAvatarService } from '@/api/user'

//初始化图片
const userStore = useUserStore()
const userInfo = userStore.userInfo
const imageUrl = ref(userInfo.user_pic)
const uploadRef = ref()
//上传图片显示
const onUploadFile = (uploadFile) => {
    console.log('上传的图片', uploadFile)
    const reader = new FileReader()
    reader.readAsDataURL(uploadFile.raw)
    reader.onload = () =>{
        imageUrl.value = reader.result
        console.log(imageUrl.value)
    }
}

const uploadAvatar = async () =>{
    //imageUrl.value需要是base64字符串
    await userUploadAvatarService(imageUrl.value)
    await userStore.getUserInfo()
    ElMessage.success('上传成功')
}


</script>

<template>
    <PageContainer title="更换头像">
        <el-upload ref="uploadRef" class="avatar-uploader" :show-file-list="false" :auto-upload="false"
            :on-change="onUploadFile">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
                <Plus />
            </el-icon>
        </el-upload>
        <br />
        <!-- el 是 Vue 实例的一个属性，指向组件实例的根 DOM 元素。 -->
        <!-- querySelector 是标准的 DOM API，用来在 DOM 树中查找匹配指定 CSS 选择器的第一个元素。在这里，它会查找 uploadRef.$el 下的第一个 <input> 元素。 -->
        <el-button @click="uploadRef.$el.querySelector('input').click()" type="primary" :icon="Plus" size="large">
            选择图片
        </el-button>
        <el-button type="success" :icon="Upload" size="large" @click="uploadAvatar">
            上传头像
        </el-button>
    </PageContainer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
    :deep() {
        .avatar {
            width: 278px;
            height: 278px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 278px;
            height: 278px;
            text-align: center;
        }
    }
}
</style>
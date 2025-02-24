<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { artEditService, artGetDetailService, artPublishService } from '@/api/article'
import { baseURL } from '@/utils/request'
const ruleFormRef = ref()
const visibleDrawer = ref(false)
//初始化表单formModel
const defaultForm = {
    title: '',
    cate_id: '',
    cover_img: '',
    content: '',
    state: ''
}
const formModel = ref({ ...defaultForm })

const imageUrl = ref('')
//上传文件
const onUploadFile = (uploadFile) => {
    console.log(uploadFile)
    //URL.createObjectURL() 是一个浏览器内建的 JavaScript 方法，它接受一个 Blob 或 File 对象，并返回一个包含该文件内容的临时 URL，称为对象 URL。
    //这个 URL 在浏览器中可以用于显示或下载该文件，而不需要将文件上传到服务器。
    imageUrl.value = URL.createObjectURL(uploadFile.raw)//将文件（例如图片）转换为浏览器可访问的 URL
    formModel.value.cover_img = uploadFile.raw
}

//绑定文本框
const editorRef = ref()
//增加回显
const open = async (row) => {
    console.log(row)
    visibleDrawer.value = true
    if (row.id) {
        //编辑
        console.log('编辑功能')
        formModel.value = { ...row }
        const res = await artGetDetailService(row.id)
        console.log(res)
        formModel.value = res.data.data
        imageUrl.value = baseURL + formModel.value.cover_img
        // 提交给后台，需要的是 file 格式的，将网络图片，转成 file 格式
        // 网络图片转成 file 对象, 需要转换一下
        const file = await imageUrlToFile(imageUrl.value, formModel.value.cover_img)
        console.log('file====',file)
        formModel.value.cover_img = file
    } else {
        //添加，并且清空
        console.log('添加功能')
        formModel.value = { ...defaultForm }
        imageUrl.value = ''
        editorRef.value.setHTML('')

    }
}
// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
    try {
        // 第一步：使用axios获取网络图片数据
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const imageData = response.data;

        // 第二步：将图片数据转换为Blob对象
        const blob = new Blob([imageData], { type: response.headers['content-type'] });

        // 第三步：创建一个新的File对象
        const file = new File([blob], fileName, { type: blob.type });

        return file;
    } catch (error) {
        console.error('将图片转换为File对象时发生错误:', error);
        throw error;
    }
}

//发布按钮
const emit = defineEmits(['success'])
const onPublish = async (state) => {
    // 将已发布还是草稿状态，存入 state
    formModel.value.state = state
    // 转换 formData 数据
    const fd = new FormData()
    for (let key in formModel.value) {
        fd.append(key, formModel.value[key])
    }
    if (formModel.value.id) {
        console.log('编辑操作')
        await artEditService(fd)
        ElMessage.success('修改成功')
        visibleDrawer.value = false
        emit('success', 'edit')
    } else {
        // 添加请求
        await artPublishService(fd)
        ElMessage.success('添加成功')
        visibleDrawer.value = false
        emit('success', 'add')
    }
}

//导出方法
defineExpose({
    open
})


</script>

<template>
    <el-drawer v-model="visibleDrawer" :title="formModel.id ? '编辑文章' : '添加文章'" direction="rtl" size="30%">
        <!-- 主体表单 -->
        <el-form :model="formModel" ref="ruleFormRef">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="formModel.title" />
            </el-form-item>
            <el-form-item label="文章分类" prop="cate_id">
                <ChannelSelect v-model="formModel.cate_id"></ChannelSelect>
            </el-form-item>
            <el-form-item label="文章封面" prop="cover_img">
                <!-- 文件上传 -->
                <el-upload class="avatar-uploader" :show-file-list="false" :auto-upload="false"
                    :on-change="onUploadFile">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
                <div class="editor">
                    <QuillEditor theme="snow" v-model:content="formModel.content" contentType="html" ref="editorRef" />
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onPublish('已发布')">
                    发布
                </el-button>
                <el-button @click="onPublish('草稿')">草稿</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {

    /* 深度选择器，用于作用于子元素 */
    :deep() {

        /* .avatar 类样式，控制头像的大小和显示方式 */
        .avatar {
            width: 178px;
            /* 设置头像的宽度为 178px */
            height: 178px;
            /* 设置头像的高度为 178px */
            display: block;
            /* 将头像设置为块级元素，以确保它单独占一行 */
        }

        /* .el-upload 类样式，控制上传按钮的外观 */
        .el-upload {
            border: 1px dashed var(--el-border-color);
            /* 设置上传按钮的边框为 1px 虚线，颜色使用 CSS 变量 var(--el-border-color) */
            border-radius: 6px;
            /* 设置上传按钮的圆角为 6px */
            cursor: pointer;
            /* 鼠标悬停时，光标变为可点击的手型 */
            position: relative;
            /* 设置上传按钮为相对定位，方便绝对定位的子元素 */
            overflow: hidden;
            /* 隐藏溢出的内容，防止子元素溢出按钮区域 */
            transition: var(--el-transition-duration-fast);
            /* 添加平滑过渡效果，过渡时间使用 CSS 变量 var(--el-transition-duration-fast) */
        }

        /* .el-upload:hover 样式，定义当上传按钮被悬停时的效果 */
        .el-upload:hover {
            border-color: var(--el-color-primary);
            /* 悬停时，上传按钮的边框颜色变为 var(--el-color-primary) */
        }

        /* .el-icon.avatar-uploader-icon 样式，控制上传图标的大小和颜色 */
        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            /* 设置图标的字体大小为 28px */
            color: #8c939d;
            /* 设置图标颜色为 #8c939d（灰蓝色） */
            width: 178px;
            /* 设置图标的宽度为 178px */
            height: 178px;
            /* 设置图标的高度为 178px */
            text-align: center;
            /* 将图标居中对齐 */
        }
    }
}

.editor {
    width: 100%;

    :deep(.ql-editor) {
        min-height: 200px;
    }
}
</style>
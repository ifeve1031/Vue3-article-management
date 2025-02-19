<script setup>
import { ref, reactive } from 'vue'
//添加分类
//控制弹层显示
const dialogVisible = ref(false)
const open = () => {
    dialogVisible.value = true
}

//导出open方法
defineExpose({
    open
})

</script>

<template>
    <!-- 弹层 -->
    <el-dialog v-model="dialogVisible" title="添加分类" width="500">
        <div>内容</div>
        <!-- <el-form :model="form">
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="分类别名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
            </el-form> -->
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
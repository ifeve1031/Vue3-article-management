<script setup>
/* 需要接收参数，以在不同界面进行渲染 */
defineProps({
    title:{
        /* 必须传参，类型是字符串 */
        required:true,
        type:String
    }
})
</script>

<template>
    <el-card class="page-container">
        <!-- 具名插槽 -->
        <template #header>
            <div class="header">
                <span>{{ title }}</span>
                <div class="extra">
                    <!-- 具名插槽 具名插槽 extra  定制头部右侧额外的按钮-->
                    <slot name="extra"></slot>
                </div>
            </div>
        </template>
        <!-- 默认插槽 default 定制内容主体 -->
        <slot></slot>
    </el-card>
</template>

<style lang="scss" scoped>
.page-container{
    min-height: 100%;        //设置最小高度为 100%，确保页面内容充满整个视口
    box-sizing: border-box;  //包括内边距和边框在内的尺寸计算方式
    .header{
        display: flex;       //使用 Flexbox 布局
        align-items: center;     //垂直居中对齐内容
        justify-content: space-between;    // 水平分散对齐内容，确保两端对齐
    }
}
</style>
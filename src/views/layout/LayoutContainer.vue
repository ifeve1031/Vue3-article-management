<script setup>
import {
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
//路由获取
const router = useRouter()
const route = useRoute()

//获取用户信息
const userStore = useUserStore()
console.log(userStore.userInfo)
onMounted(() => {
    userStore.getUserInfo()
})

//下拉部分实现
//如果command为logout，则退出：清空登录信息和用户信息
//不是则跳转路由
const handleCommand = (command) => {
    if (command === 'logout') {
        //弹出确认框
        ElMessageBox.confirm(
            '你确认退出大事件吗?',
            '温馨提示',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            userStore.removeToken()
            userStore.removeUserInfo()
            router.push('/login')
        })
            .catch(() => {
            })

    } else {
        router.push(`/user/${command}`)
    }
}
</script>

<template>
    <el-container class="layout-container">
        <!-- 左边侧边栏容器 -->
        <el-aside width="200px">
            <div class="el-aside__logo"></div>
            <el-menu active-text-color="#ffd04b" background-color="#232323" :default-active="$route.path"
                text-color="#fff" router>
                <el-menu-item index="/article/channel">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>文章分类</span>
                </el-menu-item>
                <el-menu-item index="/article/manage">
                    <el-icon>
                        <Promotion />
                    </el-icon>
                    <span>文章管理</span>
                </el-menu-item>
                <el-sub-menu index="/user">
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>个人中心</span>
                    </template>
                    <el-menu-item index="/user/profile">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>基本资料</span>
                    </el-menu-item>
                    <el-menu-item index="/user/avatar">
                        <el-icon>
                            <Crop />
                        </el-icon>
                        <span>更换头像</span>
                    </el-menu-item>
                    <el-menu-item index="/user/password">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>重置密码</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <!-- 右边框架：外层容器。 当子元素中包含 <el-header> 或 <el-footer> 时，全部子元素会垂直上下排列， 否则会水平左右排列。 -->
        <el-container>
            <!-- 右边框架头部 -->
            <el-header>
                <div>黑马程序员：<strong>{{ userStore.userInfo.nickname || userStore.userInfo.username }}</strong></div>
                <!-- 下拉菜单 -->
                <el-dropdown placement="bottom-end" @command="handleCommand">
                    <!-- 默认展示给用户看的 -->
                    <span class="el-dropdown__box">
                        <el-avatar :src="userStore.userInfo.user_pic || avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <!-- 折叠下拉部分 -->
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
                            <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                            <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>大事件 ©2023 Created by 黑马程序员</el-footer>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;

    .el-aside {
        background-color: #232323;

        &__logo {
            height: 120px;
            background: url('@/assets/logo.png') no-repeat center / 120px auto;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }
}
</style>
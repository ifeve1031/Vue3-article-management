import { defineStore } from "pinia";
import { ref } from "vue";
import { userGetInfoService } from "@/api/user";



//用户模块
export const useUserStore = defineStore('big-user', () => {
    const token = ref('')
    const setToken = (newToken) => {
        token.value = newToken
    }
    const removeToken = () => {
        token.value =''
    }
    const removeUserInfo = () => {
        userInfo.value = ''
    }

    //用户信息
    const userInfo = ref('')
    const getUserInfo = async () => {
        const res = await userGetInfoService()
        userInfo.value = res.data.data
    }

    return {
        token,
        setToken,
        removeToken,
        userInfo,
        getUserInfo,
        removeUserInfo
    }
},{
    persist:true
})
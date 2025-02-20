import request from '@/utils/request'

export const artGetChannelsService = () => {
    return request.get('/my/cate/list')
}
//增加-文章分类
export const artAddChannelsService = (data) => {
    return request.post('/my/cate/add',data)
}
//更新-文章分类
export const artUpdateChannelsService = (data) => {
    return request.put('/my/cate/info',data)
}
//删除-文章分类
export const artDelChannelsService = (id) => {
    return request.delete('/my/cate/del',{
        params:{id}
    })
}

//获取-文章列表
export const artGetListService = ({ pagenum,pagesize,cate_id,state}) => {
    return request.get('/my/article/list',{
        params:{
            pagenum,
            pagesize,
            cate_id,
            state
        }
    })
}
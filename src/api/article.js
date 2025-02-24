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

//添加文章 form-data
export const artPublishService = (data) =>{
    return request.post('/my/article/add',data)
}
//获取文章详情，用于回显
export const artGetDetailService = (id) =>{
    return request.get('/my/article/info',{
        params:{id}
    })
}

//编辑文章 form-data
export const artEditService = (data) =>{
    return request.put('/my/article/info',data)
}

//删除-文章分类
export const artDelArticleService = (id) => {
    return request.delete('/my/article/info',{
        params:{id}
    })
}
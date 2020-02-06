import request from '../utils/request';

export const fetchData = (query) => {
    return request({
        url: '/ms/table/list',
        method: 'post',
        data: query
    })
}
export const goodsList=(query)=> {
    return request({
        url: '/api/v1/goods/list',
        method: 'post',
        data: query,
    })
}
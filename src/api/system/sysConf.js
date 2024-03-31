import request from "@/utils/request";


export const getAdminSysConf = () => {
    return request({
        url: '/admin/sys/conf',
        method: 'get'
    });
}

export const saveAdminSysConf = data => {
    return request({
        url: '/admin/sys/conf',
        method: 'post',
        data: data,
    });
}

export const updateAdminSysConf = data => {
    return request({
        url: '/admin/sys/conf',
        method: 'put',
        data: data,
    });
}

export const delAdminSysConf = id => {
    return request({
        url: '/admin/sys/conf/' + id,
        method: 'delete',
    });
}

export const getAdminSysConfByType = type => {
    return request({
        url: '/admin/sys/conf/' + type,
        method: 'get'
    });
}
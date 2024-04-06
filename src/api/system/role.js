import request from "@/utils/request";

export const getAdminRole = () => {
    return request({
        url: '/admin/role',
        method: 'get'
    });
}

export const saveAdminRole = data => {
    return request({
        url: '/admin/role',
        method: 'post',
        data: data,
    });
}

export const updateAdminRole = data => {
    return request({
        url: '/admin/role',
        method: 'put',
        data: data,
    });
}

export const delAdminRole = id => {
    return request({
        url: '/admin/role/' + id,
        method: 'delete',
    });
}
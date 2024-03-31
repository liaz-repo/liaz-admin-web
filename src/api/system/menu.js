import request from "@/utils/request";

export const getAdminMenu = () => {
    return request({
        url: '/admin/menu',
        method: 'get'
    });
}

export const getAdminMenuList = () => {
    return request({
        url: '/admin/menu/list',
        method: 'get'
    });
}

export const saveAdminMenu = data => {
    return request({
        url: '/admin/menu',
        method: 'post',
        data: data,
    });
}

export const updateAdminMenu = data => {
    return request({
        url: '/admin/menu',
        method: 'put',
        data: data,
    });
}

export const delAdminMenu = id => {
    return request({
        url: '/admin/menu/' + id,
        method: 'delete',
    });
}
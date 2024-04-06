import request from "@/utils/request";

export const getAdminRoleMenu = id => {
    return request({
        url: '/admin/role/menu/' + id,
        method: 'get'
    });
}

export const saveAdminRoleMenu = data => {
    return request({
        url: '/admin/role/menu',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'post',
        data: data
    });
}
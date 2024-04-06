import request from "@/utils/request";

export const getAdminUserRole = (id) => {
    return request({
        url: '/admin/user/role/' + id,
        method: 'get'
    });
}

export const saveAdminUserRole = data => {
    return request({
        url: '/admin/user/role',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'post',
        data: data
    });
}
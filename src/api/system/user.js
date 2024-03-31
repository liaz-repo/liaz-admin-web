import request from "@/utils/request";

export const getUser = () => {
    return request({
        url: '/admin/user/get',
        method: 'get'
    });
}

export const logout = () => {
    return request({
        url: '/admin/logout',
        method: 'post'
    });
}

export const getAdminUserList = () => {
    return request({
        url: '/admin/user',
        method: 'get' 
    });   
}

export const saveAdminUser = data => {
    return request({
        url: '/admin/user',
        method: 'post',
        data: data 
    });  
}

export const updateAdminUser = data => {
    return request({
        url: '/admin/user',
        method: 'put',
        data: data 
    });  
}

export const delAdminUser = id => {
    return request({
        url: '/admin/user/' + id,
        method: 'delete'
    });  
}

export const thawAdminUser = id => {
    return request({
        url: '/admin/user/thaw',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'put',
        data: {
            adminId: id
        }
    });
}
import request from "@/utils/request";

export const login = data => {
    return request({
        url: '/admin/login',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'post',
        data: data
    });
};
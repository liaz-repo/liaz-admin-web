import axios from "axios";
import store from "@/store";
import global from "@/constants/global";
import { getStore } from "@/utils/store";
import { alertMsg } from "@/utils/system-helper";

const service = axios.create();

service.defaults.baseURL = !process.env.VUE_APP_DEBUG_MODE ? process.env.VUE_APP_API_BASE_URL : '';

service.interceptors.request.use(config => {
    if (global.EXCLUDES.filter(v => config.url == v).length == 0) {
        config.headers[global.AUTHORIZATION] = getStore({ name: 'access_token' });
    }
    return config;
}, error => {
    Promise.reject(error);
});

service.interceptors.response.use(res => {
    let response = res.data;
    userLogout(res.status);
    apiResult(response);
    return response;
}, error => {
    if (!alertMsg('服务器异常，请稍等...')) {
        return Promise.reject(error);
    }
});

$.ajaxSetup({
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    beforeSend: function(xhr) {
        if (global.EXCLUDES.filter(v => this.url.indexOf(v) != -1).length == 0) {
            xhr.setRequestHeader(global.AUTHORIZATION, getStore({ name: 'access_token' }));
        }
    },
    complete: function(xhr) {
        userLogout(xhr.status);
        apiResult(xhr.responseJSON);
    }
});

/**
 * 强制退出
 */
function userLogout(status) {
    try {
        if (status == global.HTTP_STATUS.UNAUTHORIZED) {
            store.dispatch("logout");
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * api响应处理
 * @param {响应体} response 
 */
function apiResult(response) {
    if (response && response.code) {
        if (response.code == global.HTTP_STATUS.OK) {
           if (response.message != 'OK') {
            alertMsg(response.message);
           } 
        } else {
            alertMsg(response.message); 
        }
    }
}

export default service;

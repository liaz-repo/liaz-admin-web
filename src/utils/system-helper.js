import { getStore } from '@/utils/store';
import { getObject } from '@/api/system/file';
import global from '@/constants/global';

export function showLoading() {
    $(".loadingGif").css('top', window.innerHeight / 2);
    $(".loadingGif").css('left', window.innerWidth / 2);
    $(".loading").css('z-index', 3000);
    $(".loading").modal('show');
}

export function hideLoading() {
    $(".loading").modal('hide');
}

export function cleanArray(actual) {
    const newArray = [];
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

/**
 * 提示语
 * @param {提示语} message 
 * @returns 
 */
export function alertMsg(message) {
    let tipMsg = $('#tipMsg');
    let tipModal = $('#tipModal');
    if (tipMsg && tipModal) {
        tipMsg.text(message);
        tipModal.modal('show');
        return true;
    }
    return false;
}

//获取url中的参数
export function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

//获取链接
export function getFileUrl(path) {
    if (!path) {
        return path;
    }
    if (path.startsWith('https') || path.startsWith('http')) {
        return path;
    }
    let requestUri = path;
    let fileUrl = getStore({name: global.SYS_CONF.FILE_URL });
    let isAuthority = getStore({name: global.SYS_CONF.RESOURCE_AUTHORITY });
    if (isAuthority) {
       requestUri = getObject(path).data;
    }
    if (requestUri.startsWith('https') || requestUri.startsWith('http')) {
        return requestUri;
    }
    let bucketTemplate = '{bucketName}';
    let objectTemplate = '{objectName}';
    if (fileUrl.indexOf(bucketTemplate) != -1 && fileUrl.indexOf(objectTemplate) != -1) {
        let pathArray = path.split('/');
        let bucketName = '';
        if (pathArray.length > 1) {
          bucketName = path[1];
        }
        let objectName = '';
        if (pathArray.length > 2) {
          objectName = path[2];
        }
        return fileUrl.replace(bucketTemplate, bucketName).replace(objectTemplate, objectName);
    }
    return fileUrl + path;
}

export function buildSelectOption(id, defVal, array) {
    let $select = $(id);
    for(let i in array) {
        let obj = array[i];
        let selected = false;
        if (obj.value == defVal) {
            selected = true;
        }
        $select.append('<option value="' + obj.value + '"' + (selected ? 'selected' : '') + '>' + obj.text + '</option>');
    }
}
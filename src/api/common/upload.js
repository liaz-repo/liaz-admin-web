import '@/utils/ajaxfileupload';

export const uploadFile = data => {
    return new Promise((resolve, reject) => {
        let baseURL = !process.env.VUE_APP_DEBUG_MODE ? process.env.VUE_APP_API_BASE_URL : '';
        $.ajaxFileUpload({
            fileElementId: data.id,
            url: baseURL + '/admin/upload/' + data.bucketName,
            type: 'post',
            dataType: 'json',
            secureuri: false,
            async: true,
            submitType: 'ajax',
            success: function (res) {
                resolve(res);
            },
            error: function (res, status, e) {
                console.error(res);
                console.error(status);
                reject(e);
            }
        });
    });
};

export const uploadBatchFile = data => {
    return new Promise((resolve, reject) => {
        let baseURL = !process.env.VUE_APP_DEBUG_MODE ? process.env.VUE_APP_API_BASE_URL : '';
        $.ajaxFileUpload({
            fileElementId: data.id,
            url: baseURL + '/admin/upload/batch/' + data.bucketName,
            type: 'post',
            dataType: 'json',
            secureuri: false,
            async: true,
            submitType: 'ajax',
            success: function (res) {
                resolve(res);
            },
            error: function (res, status, e) {
                console.error(res);
                console.error(status);
                reject(e);
            }
        });
    });
};
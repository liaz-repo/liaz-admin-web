export const getObject = path => {
    let $res = null;
    let baseURL = !process.env.VUE_APP_DEBUG_MODE ? process.env.VUE_APP_API_BASE_URL : '';
    $.ajax({
        type: 'get',
        url: baseURL + '/admin/file' + path,
        dataType: 'json',
        async: false,
        success: function (res) {
            $res = res;
        }
    });
    return $res;
}
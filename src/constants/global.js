export default {
    KEY: 'liaz',
    EXCLUDES: [
        '/admin/login',
    ],
    AUTHORIZATION: 'Authorization',
    HTTP_STATUS: {
        OK: 200,
        UNAUTHORIZED: 401,
        SERVER_ERROR: 500,
    },
    BUCKET: {
        AVATAR: 'avatar',
        RECOMMEND: 'recommend',
        DOWNLOAD: 'download',
    },
    SYS_CONF: {
        FILE_URL: 'file_url',
        RESOURCE_AUTHORITY: 'resource_authority',
    },
};
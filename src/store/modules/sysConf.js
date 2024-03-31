import { setStore } from '@/utils/store';
import { getAdminSysConfByType } from '@/api/system/sysConf';
import global from '@/constants/global';

export default {
    state: {
        sysConfs: []
    },
    mutations: {
        setSysConfs(state, sysConfs) {
            if (sysConfs && sysConfs.length > 0) {
                state.sysConfs = sysConfs;
                setStore({
                    name: "sys_confs",
                    content: sysConfs.filter(v => v.confKey && v.confKey != ''),
                    type: "session"
                });
                let fileUrl = sysConfs.filter(v => v.confKey == global.SYS_CONF.FILE_URL)[0];
                if (fileUrl) {
                    setStore({
                        name: "file_url",
                        content: fileUrl.confValue,
                        type: "session"
                    });
                }
                let resourceAuthority = sysConfs.filter(v => v.confKey == global.SYS_CONF.RESOURCE_AUTHORITY)[0];
                if (resourceAuthority) {
                    let isAuthority = false;
                    if (resourceAuthority == 'true') {
                        isAuthority = true;
                    } else if (resourceAuthority == 'false') {
                        isAuthority = false;
                    }
                    setStore({
                        name: "resource_authority",
                        content: isAuthority,
                        type: "session"
                    });
                }
            }
        }
    },
    actions: {
        async getSysConfs({ commit }) {
            const res = await getAdminSysConfByType(1);
            var data = res.data || {};
            commit("setSysConfs", data);
            return data;
        },
    },
};
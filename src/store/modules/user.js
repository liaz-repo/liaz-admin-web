import router from '@/router';
import { getUser, logout } from '@/api/system/user';

import { setStore, getStore } from '@/utils/store';
import { dateFormat } from '@/utils/date';
import { getFileUrl } from '@/utils/system-helper';

import avatar from '@/assets/images/man.jpg';

export default {
    state: {
        adminId: getStore({ name: 'admin_id' }) || 0,
        name: getStore({ name: 'name' }) || "",
        username: getStore({ name: 'username' }) || "",
        avatar: getStore({ name: 'avatar' }) || "",
        lastTime: getStore({ name: 'last_time' }) || "",
    },
    mutations: {
        updateUser(state, user) {
            console.log(user);
            if (user.adminId) {
                state.adminId = user.adminId;
                setStore({
                    name: "admin_id",
                    content: state.adminId,
                    type: "session"
                });
            }
            if (user.name) {
                state.name = user.name;
                setStore({
                    name: "name",
                    content: state.name,
                    type: "session"
                });
            }
            if (user.username) {
                state.username = user.username;
                setStore({
                    name: "username",
                    content: state.username,
                    type: "session"
                });
            }
            let userAvatar = user.avatar;
            if (userAvatar) {
                userAvatar = (userAvatar.startsWith('https') || userAvatar.startsWith('http')) ? userAvatar : getFileUrl(userAvatar);
            } else {
                userAvatar = avatar;
            }
            state.avatar = userAvatar;
            setStore({
                name: "avatar",
                content: state.avatar,
                type: "session"
            });
            if (user.lastTime) {
                state.lastTime = user.lastTime;
                setStore({
                    name: "last_time",
                    content: state.lastTime,
                    type: "session"
                });
            }
        }
    },
    actions: {
        async getUser({ commit }) {
            const res = await getUser();
            var data = res.data || {};
            commit("updateUser", {
                adminId: data.adminId,
                name: data.name,
                username: data.username,
                avatar: data.avatar,
                lastTime: dateFormat(new Date(data.lastTime))
            });
            return data;
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                logout()
                    .then(res => {
                        commit("updateUser", {
                            adminId: 0,
                            name: "",
                            username: "",
                            avatar: "",
                            lastTime: ""
                        });
                        resolve(res);
                        router.push("/");
                    }).catch(() => {
                        reject();
                    });
            });
        }
    },
};
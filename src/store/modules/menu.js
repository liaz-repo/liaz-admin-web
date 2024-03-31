import { getAdminMenu } from '@/api/system/menu';
import { setStore, getStore } from '@/utils/store';

export default {
    state: {
        parentMenus: getStore({ name: 'parent_menus' }) || [],
        childMenus: getStore({ name: 'child_menus' }) || [],
    },
    mutations: {
        setParentMenus(state, parentMenus) {
            state.parentMenus = parentMenus;
            setStore({
                name: "parent_menus",
                content: state.parentMenus,
                type: "session"
            });
        },
        setChildMenus(state, childMenus) {
            state.childMenus = childMenus;
            setStore({
                name: "child_menus",
                content: state.childMenus,
                type: "session"
            });
        }
    },
    actions: {
        async getMenu({ commit }) {
            const res = await getAdminMenu();
            if (res) {
                let adminMenus = res.data;
                const sortBy = (a, b) => {
                    if (a.showOrder > b.showOrder) {
                        return -1;
                    } else if (a.showOrder < b.showOrder) {
                        return 1;
                    } else {
                        return a.name.localeCompare(b.name);
                    }
                };
                if (adminMenus) {
                    let parents = adminMenus.filter(v => v.parentId == 0);
                    if (parents && parents.length > 0) {
                        commit('setParentMenus', parents.sort(sortBy));
                    }
                    let childs = adminMenus.filter(v => v.parentId != 0);
                    if (childs && childs.length > 0) {
                        commit('setChildMenus', childs.sort(sortBy));
                    }
                }
            }
            return res;
        },
        getViewComponent(context, path) {
            let component = path;
            setStore({
                name: "path",
                content: path,
                type: "session"
            });
            if (component.indexOf('?') != -1) {
                component = component.split('?')[0];
            }
            return component;
        }
    },
};
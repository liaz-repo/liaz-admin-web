<template>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar" style="height: 100%; overflow: hidden; overflow: scroll;">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <!-- Sidebar user panel (optional) -->
            <div class="user-panel">
                <div class="pull-left image">
                    <img :src="avatar" class="img-circle" :alt="name">
                </div>
                <div class="pull-left info">
                    <p>{{ name }}</p>
                    <!-- Status -->
                    <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
                </div>
            </div>
            <!-- search form (Optional) -->
            <form method="get" class="sidebar-form" onsubmit="return false;">
                <div class="input-group">
                    <input type="text" name="q" class="form-control" placeholder="Search..." @input="search">
                    <span class="input-group-btn">
                        <button name="search" id="search-btn" class="btn btn-flat" @click="search">
                            <i class="fa fa-search"></i>
                        </button>
                    </span>
                </div>
            </form>
            <!-- /.search form -->
            <!-- Sidebar Menu -->
            <ul class="sidebar-menu">
                <li class="header">主导航</li>
                <!-- Optionally, you can add icons to the links -->
                <li v-for="(parent, parentIndex) in parentMenus" :key="parent" :data-index="parentIndex" class="treeview">
                    <a>
                        <i :class="[parent.icon ? parent.icon : 'fa fa-link']"></i>
                        <span>{{ parent.name }}</span>
                        <span class="label pull-right bg-yellow" :id="['pid_' + parent.menuId]">
                            {{ getChildLength(parent.menuId) }}
                        </span>
                    </a>
                    <ul class="treeview-menu" :id="['cid_' + parent.menuId]">
                        <li v-for="(child, childIndex) in getChilds(parent.menuId)" :key="child" :data-index="childIndex">
                            <a :data-url="child.path" @click="handleClick(child)">
                                <i
                                    :class="[child.icon && child.icon != '' ? child.icon : 'fa fa-circle-o text-yellow']"></i>
                                <span>{{ child.name }}</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
            <!-- /.sidebar-menu -->
        </section>
        <!-- /.sidebar -->
    </aside>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper" style="height: 100%;">
        <!-- Content Header (Page header) -->
        <section class="content-header"
            :style="[childMenu.name && childMenu.name != '' ? 'display:block;' : 'display:none;']">
            <h1>
                {{ childMenu.name }}
                <small>{{ childMenu.description }}</small>
            </h1>
            <ol class="breadcrumb">
                <li><a><i class="fa fa-dashboard"></i> {{ childMenu.parentName }}</a></li>
                <li class="active">{{ childMenu.name }}</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content" style="height: 100%; overflow: hidden; overflow: scroll;">
            <!-- Your Page Content Here -->
            <component :is="componentName"></component>
        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
    <div class="modal fade" id="tipModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">提示信息</h4>
                </div>
                <div class="modal-body" id="tipMsg"></div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
        data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">确认信息</h4>
                </div>
                <div class="modal-body" id="confirmMsg"></div>
            </div>
        </div>
    </div>
    <div class="modal fade loading" style="background: #00000040;" tabindex="-1" role="dialog"
        aria-labelledby="loadingModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="loadingGif" style="position: fixed;"><img :src="loading"></div>
    </div>
</template>
  
<script>
import store from '@/store';
import { getStore } from '@/utils/store';
import loading from '@/assets/images/loading.gif';

export default {
    name: 'MaintainerView',
    data() {
        return {
            componentName: "",
            name: "",
            avatar: "",
            parentMenus: [],
            childMenus: [],
            childMenu: {
                name: "",
                parentName: "",
                description: "",
            }
        };
    },
    created() {
        this.getMenu();
        this.name = store.getters.name;
        this.avatar = store.getters.avatar;
    },
    methods: {
        getMenu() {
            this.parentMenus = getStore({ name: 'parent_menus' });
            this.childMenus = getStore({ name: 'child_menus' });
            store.dispatch('getMenu').then(res => {
                console.log(res);
                this.parentMenus = getStore({ name: 'parent_menus' });
                this.childMenus = getStore({ name: 'child_menus' });
            });
        },
        getChilds(parentId) {
            return this.childMenus.filter(v => v.parentId == parentId);
        },
        getChildLength(parentId) {
            return this.childMenus.filter(v => v.parentId == parentId).length;
        },
        handleClick(menu) {
            this.childMenu.name = menu.name;
            this.childMenu.parentName = this.parentMenus.filter(v => v.menuId == menu.parentId)[0].name;
            this.childMenu.description = menu.description;
            store.dispatch('getViewComponent', menu.path).then(componentName => {
                console.log(componentName);
                this.componentName = componentName;
            });
        },
        search() {
            let text = $("input[type='text']").val();
            this.childMenus = store.getters.childMenus.filter(v => v.name.indexOf(text) >= 0);
            if (!this.childMenus.length || this.childMenus.length == 0) {
                this.parentMenus = store.getters.parentMenus.filter(v => v.name.indexOf(text) >= 0);
            } else {
                let parentIds = this.childMenus.map(v => v.parentid);
                let parentMenus = store.getters.parentMenus.filter(v => v.name.indexOf(text) >= 0);
                if (parentMenus && parentMenus.length > 0) {
                    parentMenus.forEach(v => {
                        parentIds.push(v.id);
                    });
                }
                this.parentMenus = store.getters.parentMenus.filter(v1 => parentIds.filter(v2 => v1.id == v2).length > 0);
            }
        }
    },
}

/**
 * 扩展date函数
 * author:c3gen
 */
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
</script>
  
<style scoped>
@import '@/css/main.css';
</style>
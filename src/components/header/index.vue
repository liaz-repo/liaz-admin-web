<template>
    <!-- Main Header -->
    <header class="main-header">
        <!-- Logo -->
        <a class="logo">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini"><b>L</b>Z</span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><b>LIAZ</b>管理系统</span>
        </a>
        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top" role="navigation">
            <!-- Sidebar toggle button-->
            <a class="sidebar-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>
            <!-- Navbar Right Menu -->
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <!-- User Account: style can be found in dropdown.less -->
                    <li class="dropdown user user-menu">
                        <a class="dropdown-toggle" data-toggle="dropdown" style="height:50px;">
                            <img :src="avatar" class="user-image" :alt="name">
                            <span class="hidden-xs"><span :text="name">{{ name }}</span></span>
                        </a>
                        <ul class="dropdown-menu">
                            <!-- User image -->
                            <li class="user-header">
                                <img :src="avatar" class="img-circle" :alt="name" />
                                <p>
                                    <span :text="name">{{ name }}</span>
                                    <small>上次登录：<span :text="lastTime">{{ lastTime }}</span></small>
                                </p>
                            </li>
                            <!-- Menu Footer-->
                            <li class="user-footer">
                                <div class="pull-right">
                                    <a @click="logout" class="btn btn-default btn-flat" id="signOut">退出</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <!-- Sidebar user panel -->
            <div class="user-panel">
                <div class="pull-left image">
                    <img :src="avatar" class="img-circle" :alt="name">
                </div>
                <div class="pull-left info">
                    <p><span :text="name">{{ name }}</span></p>
                    <a><i class="fa fa-circle text-success"></i> Online</a>
                </div>
            </div>
            <ul class="sidebar-menu" id="mainMenu">
                <li class="header">MAIN NAVIGATION</li>
            </ul>
        </section>
        <!-- /.sidebar -->
    </aside>
</template>
  
<script>

import store from '@/store';

export default {
    name: 'HeaderView',
    data() {
        return {
            name: "",
            avatar: "",
            lastTime: ""
        };
    },
    created() {
        this.name = store.getters.name;
        this.avatar = store.getters.avatar;
        this.lastTime = store.getters.lastTime;
    },
    methods: {
        logout() {
            store.dispatch('logout');
        }
    }
}
</script>
  
<style scoped></style>
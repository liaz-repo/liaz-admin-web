<template>
    <div class="page-container">
        <div class="main_box">
            <div class="login_box">
                <div class="login_logo">
                    <span
                        style="font-size:24px;color:#222;font-weight:bold;">&nbsp;&nbsp;LIAZ&nbsp;管&nbsp;理&nbsp;系&nbsp;统</span>
                </div>
                <div class="login_form">
                    <form id="loginForm" method="post">
                        <div class="form-group">
                            <label for="username" class="t">账&nbsp;&nbsp;&nbsp;&nbsp;号：</label>
                            <input id="username" name="account" type="text" class="form-control x319 in" autocomplete="off">
                        </div>
                        <div class="form-group">
                            <label for="password" class="t">密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
                            <input id="password" name="password" type="password" class="password form-control x319 in">
                        </div>
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label class="t"></label>
                            <span class="loginTips"></span>
                        </div>
                        <div class="form-group space">
                            <button type="button" id="loginBtn" class="btn btn-primary btn-lg">登&nbsp;&nbsp;录</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="reset" value="重&nbsp;&nbsp;置" class="btn btn-default btn-lg">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store';
import { setStore } from '@/utils/store';
import { login } from '@/api/system/login';
import global from '@/constants/global';

export default {
    name: "LoginView",
    created() {
        this.init();
        this.bubble();
    },
    methods: {
        bubble() {
            var $ul = $('<ul id="bubble-wrapper"/>');
            for (var i = 0; i < 10; i++) {
                $ul.append($('<li/>'));
            }
            $("body").append($ul);
        },
        init() {
            this.$nextTick(function () {
                let $this = this;
                $("#loginBtn").click(function () {
                    $this.login();
                });

            });
        },
        login() {
            let username = $("#username").val();
            let password = $("#password").val();
            if (username.trim() == '') {
                $(".loginTips").html("账号不能为空！");
                return;
            } else if (password.trim() == '') {
                $(".loginTips").html("密码不能为空！");
                return;
            }
            login({
                'username': username,
                'password': $.md5(password),
            }).then(res => {
                if (res.code == global.HTTP_STATUS.OK) {
                    console.log("login success.");
                    this.storeAccessToken(res.data.accessToken);
                    this.getSysConfs();
                } else {
                    $(".loginTips").html(res.message).css("padding", "3px 5px");
                }
            });
        },
        storeAccessToken(accessToken) {
            setStore({
                name: "access_token",
                content: accessToken,
                type: "session"
            });
        },
        getSysConfs() {
            store.dispatch('getSysConfs').then(res => {
                console.log(res);
                this.updateUser();
            });
        },
        updateUser() {
            store.dispatch('getUser').then(res => {
                console.log(res);
                window.location.href = '#/blank';
            });
        },
    },
};
</script>

<style scoped>
@import '@/css/login.css';

* {
    font-family: "Helvetica Neue", Helvetica, STheiti, 微软雅黑, 宋体, Arial, Tahoma, sans-serif, serif;
}

.btn-lg {
    padding: 8px 25px;
}

.loginTips {
    color: red;
    font-size: 14px;
    margin-left: 10px;
}
</style>
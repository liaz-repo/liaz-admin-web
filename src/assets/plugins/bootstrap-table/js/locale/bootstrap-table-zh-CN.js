/**
 * Bootstrap Table Chinese translation
 * Author: Zhixin Wen<wenzhixin2010@gmail.com>
 */

(function (root, factory) {
    var define;
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module unless amdModuleId is set
        define(["jquery"], function (a0) {
            return (factory(a0));
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
}(this, function (jQuery) {

    (function ($) {
        'use strict';

        $.fn.bootstrapTable.locales['zh-CN'] = {
            formatLoadingMessage: function () {
                return '正在努力地加载数据中，请稍候……';
            },
            formatRecordsPerPage: function (pageNumber) {
                return '每页显示 ' + pageNumber + ' 条记录';
            },
            formatShowingRows: function (pageFrom, pageTo, totalRows) {
                return '显示第 ' + pageFrom + ' 到第 ' + pageTo + ' 条记录，总共 ' + totalRows + ' 条记录';
            },
            formatSearch: function () {
                return '搜索';
            },
            formatNoMatches: function () {
                return '没有找到匹配的记录';
            },
            formatPaginationSwitch: function () {
                return '隐藏/显示分页';
            },
            formatRefresh: function () {
                return '刷新';
            },
            formatToggle: function () {
                return '切换';
            },
            formatColumns: function () {
                return '列';
            }
        };

        $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);

    })(jQuery);
}));


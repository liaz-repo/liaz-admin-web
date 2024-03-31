export default {
    // 是否有且只选择了一项
    isSelectOne: function (id) {
        if ($(id).bootstrapTable('getSelections').length == 1) {
            return true;
        }
        return false;
    },
    //是否选择了至少一项
    hasSelectAny: function (id) {
        if ($(id).bootstrapTable('getSelections').length > 0) {
            return true;
        }
        return false;
    },
    // 获取选择的一项
    getOneSelectItem: function (id) {
        return $(id).bootstrapTable('getSelections')[0];
    },
    // 已经选择的记录
    getAllSelectItems: function (id) {
        return $(id).bootstrapTable('getSelections');
    },
    getRowByUniqueId: function (id, recordId) {
        return $(id).bootstrapTable('getRowByUniqueId', recordId);
    },
    // 已选择的项数量
    selectLength: function (id) {
        return $(id).bootstrapTable('getSelections').length;
    },
    // 刷新
    doRefresh: function (id) {
        $(id).bootstrapTable('refresh');
    },
    unCheckAll: function (id) {
        $(id).bootstrapTable('uncheckAll');
    },
    doRefreshAndToPage1: function (id) {
        $(id).bootstrapTable('selectPage', 1);
    },
    getData: function(id) {
        return $(id).bootstrapTable('getData');
    },
    destroy: function(id) {
        $(id).bootstrapTable('destroy');
    },
    load: function(id, data) {
        $(id).bootstrapTable('load', data);
    }
}
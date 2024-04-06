<template>
    <section class="content">
        <div class="box box-danger">
            <div class="box-body">
                <!-- Content Header (Page header) -->
                <section class="content-header">
                    <h1 id="itemTitle"></h1>
                </section>
                <!-- .content -->
                <section class="content">
                    <div id="table"></div>
                    <div id="toolbar">
                        <button id="addBtn" class="btn btn-default">
                            <i class="glyphicon glyphicon-plus"></i>增加
                        </button>
                    </div>
                </section><!-- .content -->
            </div>
        </div>
    </section>
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="modalLabel">配置信息</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" name="menuId" v-model="sysConf.confId" />
                        <div class="form-group">
                            <label for="confKey" class="col-sm-3 control-label">配置KEY:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="confKey" id="confKey"
                                    v-model="sysConf.confKey" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="confName" class="col-sm-3 control-label">配置名称:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="confName" id="confName"
                                    v-model="sysConf.confName" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="confKind" class="col-sm-3 control-label">配置类型:</label>
                            <div class="col-sm-8">
                                <select name="confKind" id="confKind" data-btn-class="btn-warning">
                                    <option value="0">CUSTOM</option>
                                    <option value="1">TEXT</option>
                                    <option value="2">BOOL</option>
                                    <option value="3">JSON</option>
                                </select> 
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="confValue" class="col-sm-3 control-label">配置项:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" name="confValue" id="confValue" v-model="sysConf.confValue" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="status" class="col-sm-3 control-label">状态:</label>
                            <div class="col-sm-8">
                                <select name="status" id="status" data-btn-class="btn-warning">
                                    <option value="1">有效</option>
                                    <option value="0">无效</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="confType" class="col-sm-3 control-label">属性特征:</label>
                            <div class="col-sm-8" id="confType">
                                <input type="checkbox" name="confType" value="1" />&nbsp;&nbsp;COMMON<br/>
                                <input type="checkbox" name="confType" value="2" />&nbsp;&nbsp;SERVER<br/>
                                <input type="checkbox" name="confType" value="4" />&nbsp;&nbsp;CLIENT<br/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="description" class="col-sm-3 control-label">描述:</label>
                            <div class="col-sm-8">
                                <textarea class="form-control" name="description" id="description"
                                    v-model="sysConf.description">
                                </textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" id="save">保存</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import TableHelper from '@/utils/bootstrap-table-helper';
import ComboboxHelper from '@/utils/bootstrap-combobox-helper';
import { getAdminSysConf, saveAdminSysConf, updateAdminSysConf, delAdminSysConf } from '@/api/system/sysConf';
import { alertMsg } from '@/utils/system-helper';

export default {
    name: 'AdminSysConfView',
    setup() {
        function showText(obj) {
            let text = unescape($(obj).prop('title'));
            let $div = $("#tipMsg"); 
            $div.attr('style', 'word-wrap: break-word;');
            $div.text(text);
            $("#tipModal").modal('show');
        }
        window.showText = showText;
        return {
            showText
        };
    },
    data() {
        return {
            columns: [
                { field: 'confId', title: '配置ID', align: 'center', width: '5%' },
                { field: 'confKey', title: '配置KEY', align: 'center', width: '5%' },
                { field: 'confName', title: '配置名称', align: 'center', width: '5%' },
                { 
                    field: 'confKind', 
                    title: '配置类型', 
                    align: 'center', 
                    width: '5%',
                    formatter: function (val, row, index) {
                        let value = '';
                        if (val == 0) {
                            value = 'CUSTOM';
                        } else if (val == 1) {
                            value = 'TEXT';
                        } else if (val == 2) {
                            value = 'BOOL';
                        } else if (val == 3) {
                            value = 'JSON';
                        }
                        return value;
                    }
                },
                {  
                    field: 'status', 
                    title: '状态', 
                    align: 'center', 
                    width: '5%',
                    formatter: function (val, row, index) {
                        return val ? '有效' : '无效';
                    }
                },
                { 
                    field: 'confValue', 
                    title: '配置项', 
                    align: 'center', 
                    width: '5%',
                    formatter: function (val, row, index) {
                        return '<div style="text-align: center; width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="' + escape(val) + '" onclick="showText(this);">' + val + '</div>';
                    }
                },
                { field: 'description', title: '描述', align: 'center', width: '5%' },
                { 
                    field: 'confType', 
                    title: '属性特征', 
                    align: 'center', 
                    width: '5%',
                    formatter: function (val, row, index) {
                        let value = '';
                        if ((val & 0b1) != 0) {
                            value += 'COMMON' + '<br/>';
                        }
                        if ((val & 0b10) != 0) {
                            value += 'SERVER' + '<br/>';
                        }
                        if ((val & 0b100) != 0) {
                            value += 'CLIENT' + '<br/>';
                        }
                        return value;
                    } 
                },
                {
                    field: 'createdAt',
                    title: '创建时间',
                    align: 'center',
                    width: '10%',
                    formatter: function (val, row, index) {
                        let dateTime = new Date();
                        dateTime.setTime(val);
                        return dateTime.toLocaleString();
                    }
                },
                {
                    field: 'updatedAt',
                    title: '修改时间',
                    align: 'center',
                    width: '10%',
                    formatter: function (val, row, index) {
                        let dateTime = new Date();
                        dateTime.setTime(val);
                        return dateTime.toLocaleString();
                    }
                },
                {
                    field: 'confId',
                    title: '操作',
                    align: 'center',
                    width: '20%',
                    formatter: function (val, row, index) {
                        let value = '<button class="btn btn-sm btn-success opt-edit" data-id="' + val + '" data-index="' + index + '">编辑</button>';
                        value += '<button class="btn btn-sm btn-danger opt-del" data-id="' + val + '" data-index="' + index + '">删除</button>';
                        return value;
                    }
                }
            ],
            sysConfs: [],
            sysConf: {
                confId: 0,
                confKey: '',
                confName: '',
                confKind: 0,
                confValue: '',
                description: '',
                status: 1,
                confType: 0,
            },
        };
    },
    created() {
        this.getSysConf();
        this.init();
    },
    methods: {
        init() {
            this.$nextTick(function () {
                let $this = this;
                $this.initTable();
                $('#addBtn').click(function () {
                    $this.add();
                });
                $('#table').on('click', '.opt-edit', function () {
                    $this.edit(this);
                });
                $('#table').on('click', '.opt-del', function () {
                    $this.del(this);
                });
                $('#save').click(function () {
                    $this.save();
                });
            });
        },
        initTable() {
            let $this = this;
            TableHelper.destroy('#table');
            $('#table').bootstrapTable({
                columns: $this.columns,
                cache: false,
                striped: true,
                showRefresh: true,
                search: true,
                pageSize: 10,
                pagination: true,
                pageList: [1, 10, 20, 30, 50],
                sidePagination: "client",
                queryParamsType: "undefined",
                toolbar: '#toolbar',
            });
        },
        getSysConf() {
            getAdminSysConf().then(res => {
                this.sysConfs = res.data;
                TableHelper.load('#table', this.sysConfs);
            });
        },
        add() {
            this.sysConf.confId = 0;
            this.sysConf.confKey = '';
            this.sysConf.confName = '';
            this.sysConf.confKind = 0;
            this.sysConf.confValue = '';
            this.sysConf.description = '';
            this.sysConf.status = 1;
            this.sysConf.confType = 0;
            this.show();
        },
        edit(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            this.sysConf.confId = record.confId;
            this.sysConf.confKey = record.confKey;
            this.sysConf.confName = record.confName;
            this.sysConf.confKind = record.confKind;
            this.sysConf.confValue = record.confValue;
            this.sysConf.description = record.description;
            this.sysConf.status = record.status;
            this.sysConf.confType = record.confType;
            this.show();
        },
        show() {
            let confType = this.sysConf.confType;
            $("input:checkbox[value='1']").prop('checked', (confType & 0b1) != 0);
            $("input:checkbox[value='2']").prop('checked', (confType & 0b10) != 0);
            $("input:checkbox[value='4']").prop('checked', (confType & 0b100) != 0);
            ComboboxHelper.build('#confKind', this.sysConf.confKind);
            ComboboxHelper.build('#status', this.sysConf.status);
            $('#editModal').modal('show');
        },
        save() {
            let data = this.sysConf;
            if (!data.confKey || data.confKey == '') {
                alertMsg('配置名称不允许为空！');
                return;
            }
            const confTypeArray = $("input:checkbox[name='confType']:checked").serializeArray();
            if (!confTypeArray) {
                $("#tipMsg").text("使用环境不能为空");
                $("#tipModal").modal('show');
                return;
            }
            let confType = 0;
            for (let i = 0, len = confTypeArray.length; i < len; i++) {
                console.log(confTypeArray[i]);
                confType |= confTypeArray[i].value;
            }
            data.confType = confType;
            data.status = ComboboxHelper.getSelected('#status');
            data.confKind = ComboboxHelper.getSelected('#confKind');
            (data.confId != 0 ? updateAdminSysConf(data) : saveAdminSysConf(data)).then(res => {
                console.log(res);
                this.getSysConf();
                $('#editModal').modal('hide');
            });

        },
        del(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            const confId = record.confId;
            if (!confirm('是否确定要删除？')) {
                return;
            }
            delAdminSysConf(confId).then(res => {
                console.log(res);
                this.getSysConf();
            });
        },
    },
}
</script>
  
<style scoped></style>
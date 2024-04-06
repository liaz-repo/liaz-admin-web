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
                    <h4 class="modal-title" id="modalLabel">菜单信息</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" name="menuId" v-model="adminMenu.menuId" />
                        <div class="form-group">
                            <label for="name" class="col-sm-3 control-label">名称:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="name" id="name"
                                    v-model="adminMenu.name" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="path" class="col-sm-3 control-label">路径:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="path" id="path"
                                    v-model="adminMenu.path" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="icon" class="col-sm-3 control-label">图标:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" name="icon" id="icon" v-model="adminMenu.icon" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="showOrder" class="col-sm-3 control-label">排序:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="showOrder" id="showOrder"
                                    v-model="adminMenu.showOrder">
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
                            <label for="parentId" class="col-sm-3 control-label">父级:</label>
                            <div class="col-sm-8">
                                <select name="parentId" id="parentId" data-btn-class="btn-warning">
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="description" class="col-sm-3 control-label">描述:</label>
                            <div class="col-sm-8">
                                <textarea class="form-control" name="description" id="description" v-model="adminMenu.description">
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
import { getAdminMenuList, saveAdminMenu, updateAdminMenu, delAdminMenu } from '@/api/system/menu';
import { alertMsg } from '@/utils/system-helper';

export default {
    name: 'AdminMenuView',
    data() {
        return {
            columns: [
                { field: 'menuId', title: '菜单ID', align: 'center', width: '5%' },
                { field: 'name', title: '名称', align: 'center', width: '15%' },
                { field: 'parentId', title: '父级ID', align: 'center', visible: false },
                {
                    field: 'parentName',
                    title: '父级菜单',
                    align: 'center',
                    width: '15%',
                    formatter: function (val, row, index) {
                        let parentId = row.parentId;
                        let adminMenus = TableHelper.getData('#table');
                        let array = adminMenus.filter(v => v.menuId == parentId);
                        let value = '无';
                        if (array.length > 0) {
                            value = array[0].name;
                        }
                        return value;
                    }
                },
                { field: 'path', title: '路径', width: '10%' },
                {
                    field: 'icon',
                    title: '图标',
                    width: '5%',
                    formatter: function (val, row, index) {
                        let value = '';
                        if (val) {
                            value = val;
                        } else {
                            if (row.parentId == 0) {
                                value = 'fa fa-link';
                            } else {
                                value = 'fa fa-circle-o text-yellow';
                            }
                        }
                        return '<i class="' + value + '"></i>';
                    }
                },
                { field: 'showOrder', title: '排序', align: 'center', width: '5%' },
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
                    field: 'menuId',
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
            adminMenus: [],
            adminMenu: {
                menuId: 0,
                name: '',
                path: '',
                icon: '',
                showOrder: 0,
                description: '',
                status: 1,
                parentId: 0,
            },
        };
    },
    created() {
        this.getMenu();
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
        getMenu() {
            getAdminMenuList().then(res => {
                this.adminMenus = res.data;
                TableHelper.load('#table', this.adminMenus);
            });
        },
        add() {
            this.adminMenu.menuId = 0;
            this.adminMenu.name = '';
            this.adminMenu.path = '';
            this.adminMenu.icon = '';
            this.adminMenu.showOrder = 0;
            this.adminMenu.description = '';
            this.adminMenu.status = 1;
            this.adminMenu.parentId = 0;
            this.show();
        },
        edit(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            this.adminMenu.menuId = record.menuId;
            this.adminMenu.name = record.name;
            this.adminMenu.path = record.path;
            this.adminMenu.icon = record.icon;
            this.adminMenu.showOrder = record.showOrder;
            this.adminMenu.description = record.description;
            this.adminMenu.status = record.status;
            this.adminMenu.parentId = record.parentId;
            this.show();
        },
        show() {
            let menus = this.adminMenus.filter(v => v.parentId == 0).map(v => {
                return {
                    value: v.menuId,
                    text: v.name
                };
            });
            ComboboxHelper.build('#status', this.adminMenu.status);
            ComboboxHelper.build('#parentId', this.adminMenu.parentId, [{ value: 0, text: '无' }].concat(menus));
            $('#editModal').modal('show');
        },
        save() {
            let data = this.adminMenu;
            if (!data.name || data.name == '') {
                alertMsg('菜单名称不允许为空！');
                return;
            }
            data.status = ComboboxHelper.getSelected('#status');
            data.parentId = ComboboxHelper.getSelected('#parentId');
            (data.menuId != 0 ? updateAdminMenu(data) : saveAdminMenu(data)).then(res => {
                console.log(res);
                this.getMenu();
                $('#editModal').modal('hide');
            });

        },
        del(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            const menuId = record.menuId;
            if (!confirm('是否确定要删除？')) {
                return;
            }
            delAdminMenu(menuId).then(res => {
                console.log(res);
                this.getMenu();
            });
        },
    },
}
</script>
  
<style scoped></style>
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
    <!-- .content -->
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="modalLabel">角色信息</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" name="roleId" v-model="adminRole.roleId" />
                        <div class="form-group">
                            <label for="name" class="col-sm-3 control-label">名称:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control  validate[required]" name="name" id="name"
                                    v-model="adminRole.name" />
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
    <div class="modal fade" id="roleMenuModal" tabindex="-1" role="dialog" aria-labelledby="roleMenuModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content" style="width: 700px;">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="roleMenuModalLabel">授权菜单</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" name="roleId" v-model="adminRole.roleId" />
                        <div class="form-group">
                            <label class="col-sm-3 control-label">名称:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" name="name" disabled="disabled"
                                    v-model="adminRole.name">
                            </div>
                        </div>
                        <div id="menuTree"></div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" id="roleMenuSave">保存</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TableHelper from '@/utils/bootstrap-table-helper';
import { getAdminRole, saveAdminRole, updateAdminRole, delAdminRole } from '@/api/system/role';
import { getAdminRoleMenu, saveAdminRoleMenu } from '@/api/system/roleMenu'

export default {
    name: "AdminRoleView",
    data() {
        return {
            columns: [
                { field: 'roleId', title: '角色ID', align: 'center', width: '5%' },
                { field: 'name', title: '名称', align: 'center', width: '15%' },
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
                    field: 'roleId',
                    title: '操作',
                    align: 'center',
                    width: '20%',
                    formatter: function (val, row, index) {
                        let value = '<button class="btn btn-sm btn-success opt-edit" data-id="' + val + '" data-index="' + index + '"><i class="glyphicon glyphicon-edit"></i>编辑</button>';
                        value += '<button class="btn btn-sm btn-warning opt-auth" data-id="' + val + '" data-index="' + index + '"><i class="glyphicon glyphicon-user"></i>授权</button>';
                        value += '<button class="btn btn-sm btn-danger opt-del" data-id="' + val + '" data-index="' + index + '"><i class="glyphicon glyphicon-remove"></i>删除</button>';
                        return value;
                    }
                }
            ],
            adminRoles: [],
            adminRole: {
                roleId: 0,
                name: '',
            },
        };
    },
    setup() {
        return {};
    },
    created() {
        this.getRole();
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
                $('#table').on('click', '.opt-auth', function () {
                    $this.authRoleMenu(this);
                });
                $('#roleMenuSave').click(function () {
                    $this.saveRoleMenu();
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
        getRole() {
            getAdminRole().then(res => {
                this.adminRoles = res.data;
                TableHelper.load('#table', this.adminRoles);
            });
        },
        add() {
            this.adminRole.roleId = 0;
            this.adminRole.name = '';
            $('#editModal').modal('show');
        },
        edit(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            this.adminRole.roleId = record.roleId;
            this.adminRole.name = record.name;
            $('#editModal').modal('show');
        },
        save() {
            let data = this.adminRole;
            (data.roleId != 0 ? updateAdminRole(data) : saveAdminRole(data)).then(res => {
                console.log(res);
                this.getRole();
                $('#editModal').modal('hide');
            });

        },
        del(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            const roleId = record.roleId;
            if (!confirm('是否确定要删除？')) {
                return;
            }
            delAdminRole(roleId).then(res => {
                console.log(res);
                this.getRole();
            });
        },
        authRoleMenu(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            this.adminRole.roleId = record.roleId;
            this.adminRole.name = record.name;
            const roleId = record.roleId;
            getAdminRoleMenu(roleId).then(res => {
                let menus = res.data;
                if (!menus || menus.length == 0) {
                    return;
                }
                this.menuTree(menus);
                $('#roleMenuModal').modal('show');
            });
        },
        menuTree(menus) {
            let $this = this;
            let data = this.getMenuData(menus);
            console.log(data);
            $("#menuTree").treeview({
                data: data,// 数据源
                levels: 1,  //设置继承树默认展开的级别
                showTags: true, //是否在每个节点右边显示tags标签。tag值必须在每个列表树的data结构中给出
                showCheckbox: true,
                onNodeChecked: function (event, node) { //选中节点
                    var selectNodes = $this.getChildNodeIdArr(node); //获取所有子节点
                    if (selectNodes) { //子节点不为空，则选中所有子节点
                        $('#menuTree').treeview('checkNode', [selectNodes, { silent: true }]);
                    }
                    var parentNode = $("#menuTree").treeview("getNode", node.parentId);
                    if (parentNode) {
                        $('#menuTree').treeview('checkNode', [parentNode, { silent: true }]);
                    }
                },
                onNodeUnchecked: function (event, node) { //取消选中节点
                    var selectNodes = $this.getChildNodeIdArr(node); //获取所有子节点
                    if (selectNodes) { //子节点不为空，则取消选中所有子节点
                        $('#menuTree').treeview('uncheckNode', [selectNodes, { silent: true }]);
                    }
                }
            });
        },
        getMenuData(menus) {
            let parentMenus = [];
            for (let i = 0; i < menus.length; i++) {
                let parentMenu = menus[i];
                let childs = parentMenu.childs;
                let childMenus = [];
                if (childs && childs.length > 0) {
                    for (let j = 0; j < childs.length; j++) {
                        let childMenu = childs[j];
                        childMenus[j] = {
                            menuId: childMenu.menuId,
                            text: childMenu.menuName,
                            color: '#2f2424;display:inline-table;',
                            state: {
                                checked: childMenu.checked
                            }
                        };
                    }
                }
                parentMenus[i] = {
                    menuId: parentMenu.menuId,
                    text: parentMenu.menuName,
                    state: {
                        checked: parentMenu.checked,
                        expanded: parentMenu.checked,
                    },
                    nodes: childMenus
                };
            }
            return parentMenus;
        },
        getChildNodeIdArr(node) {
            var ts = [];
            if (node.nodes) {
                let x, j;
                for (x in node.nodes) {
                    ts.push(node.nodes[x].nodeId);
                    if (node.nodes[x].nodes) {
                        var getNodeDieDai = this.getChildNodeIdArr(node.nodes[x]);
                        for (j in getNodeDieDai) {
                            ts.push(getNodeDieDai[j]);
                        }
                    }
                }
            } else {
                ts.push(node.nodeId);
            }
            return ts;
        },
        saveRoleMenu() {
            let roleId = this.adminRole.roleId;
            let nodes = $('#menuTree').treeview('getChecked');
            let menuIds = nodes.map(v => v.menuId).join(',');
            saveAdminRoleMenu({
                roleId: roleId,
                menuIds: menuIds
            }).then(res => {
                console.log(res);
                this.getRole();
                $('#roleMenuModal').modal('hide'); 
            });
        },
    },
};

</script>

<style scoped>
.list-group-item {
    padding: 2px 1px;
    border: 0px solid #ddd;
}
</style>
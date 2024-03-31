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
                </section><!-- .content -->
            </div>
        </div>
    </section>
</template>
  
<script>
import TableHelper from '@/utils/bootstrap-table-helper';

export default {
    name: 'template',
    data() {
        return {
            columns: [],
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.$nextTick(function () {
                // jquery执行代码
                let $this = this;
                $this.initTable();
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
    },
}
</script>
  
<style scoped></style>
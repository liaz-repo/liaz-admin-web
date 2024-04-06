<template>
    <section class="content">
        <div class="box box-danger">
            <div class="box-body">
                <section class="content-header">
                    <h1 id="itemTitle"></h1>
                </section>
                <!-- .content -->
                <div id="table"></div>
                <div id="toolbar">
                    <br/>
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button id="uploadFiles" class="btn btn-sm btn-primary">批量上传</button>
                    <h3 id="urlInfo"></h3>
                    <br/>
                </div>
            </div>
        </div>
    </section>

    <div class=" modal fade" id="fileUploadModel" tabindex="-1" role="dialog" aria-labelledby="modalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="modalLabel">上传文件</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label for="bucketName" class="col-sm-3 control-label">桶名称:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="bucketName" id="bucketName" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">上传文件:</label>
                            <div class="col-sm-8">
                                <input type="file" class="form-control" id="files" name="files" style="display:inline;" multiple>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label"></label>
                            <div class="col-sm-8">
                                <button class="btn btn-success col-sm-4" type="button" id="uploadBtn">上传</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { uploadBatchFile } from '@/api/common/upload';
import { getFileUrl } from '@/utils/system-helper';

export default {
    name: "AdminUploadView",
    created() {
        this.$nextTick(function () {
            this.initData();
        });
    },
    methods: {
        initData() {
            $('#uploadFiles').click(function () {
                $('#files').val('');
                $('#fileUploadModel').modal('show');
            });

            $('#uploadBtn').click(function () {
                let bucketName = $('#bucketName').val();
                uploadBatchFile({
                    id: 'files',
                    bucketName: bucketName
                }).then(res => {
                    let paths = res.data;
                    if (paths && paths.length > 0) {
                        let $urlInfo = $('#urlInfo');
                        for (let i = 0; i < paths.length; i++) {
                            let path = paths[i];
                            let $p = $('<p/>');
                            $p.html(getFileUrl(path));
                            $urlInfo.append($p);
                        }
                    }
                });
            });
        }
    },
};

</script>

<style scoped>
</style>
import $ from 'jquery';
import '@/assets/plugins/bootstrap-combobox/js/bootstrap-combobox';
import { getData } from '@/api/common/combobox';

export default {
    getSelected: function (id) {
        let value;
        for (let i = 0, len = $(id + ' option').length; i < len; i++) {
            let $option = $(id + ' option:eq(' + i + ')');
            if ($option.prop('selected')) {
                value = $option.val();
                break;
            }
        }
        return value;
    },
    // 设置默认值
    setDef: function (id, defVal) {
        for (let i = 0, len = $(id + ' option').length; i < len; i++) {
            let $option = $(id + ' option:eq(' + i + ')');
            if ($option.val() == defVal) {
                $option.prop('selected', true);
            } else {
                $option.prop('selected', false);
            }
        }
        $(id).btComboBox('parse');
    },
    // 构建下拉组合框
    build: function (id, defVal, val) {
        var $this = this;
        if (val) {
            if (Object.prototype.toString.call(val) === '[object Array]') {
                $(id).empty();
                $.each(val, function (i, obj) {
                    $(id).append('<option value="' + obj.value + '" data-value="' + obj.value + '" data-index="' + i + '">' + obj.text + '</option>');
                });
                $(id).btComboBox();
                $this.setDef(id, defVal);
            } else {
                getData(val).then(res => {
                    let data = res.data;
                    $(id).empty();
                    $.each(data, function (i, obj) {
                        $(id).append('<option value="' + obj.value + '" data-value="' + obj.value + '" data-index="' + i + '">' + obj.text + '</option>');
                    });
                    $(id).btComboBox();
                    $this.setDef(id, defVal);
                });
            }
        } else {
            $(id).btComboBox();
            $this.setDef(id, defVal);
        }
    }
}
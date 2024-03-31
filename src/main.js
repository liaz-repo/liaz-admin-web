import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'jquery'
import 'jquery.md5'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

import 'font-awesome/css/font-awesome.min.css'
import 'ionicons/css/ionicons.min.css'

import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/skin-blue.min.css'
import 'admin-lte/dist/js/app.min'

import '@/assets/plugins/bootstrap-table/css/bootstrap-table.css'
import '@/assets/plugins/bootstrap-table/js/bootstrap-table'
import '@/assets/plugins/bootstrap-table/js/locale/bootstrap-table-zh-CN'
import '@/assets/plugins/bootstrap-table/js/extensions/editable/bootstrap-table-editable'

import '@/assets/plugins/jquery/jquery.form'

import '@/assets/plugins/bootstrap-datepicker/css/datepicker3.css'
import '@/assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker'

import '@/assets/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css'
import '@/assets/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min'
import '@/assets/plugins/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN'

import '@/assets/plugins/bootstrap-combobox/css/bootstrap-combobox.css'
import '@/assets/plugins/bootstrap-combobox/js/bootstrap-combobox'

import '@/assets/plugins/bootstrap-select/css/bootstrap-select.css'
import '@/assets/plugins/bootstrap-select/js/bootstrap-select'

import '@/assets/plugins/bootstrap-multiselect/css/bootstrap-multiselect.css'
import '@/assets/plugins/bootstrap-multiselect/js/bootstrap-multiselect'

import '@/assets/plugins/jQuery-Validation-Engine/css/validationEngine.jquery.css'
import '@/assets/plugins/jQuery-Validation-Engine/js/jquery.validationEngine'
import '@/assets/plugins/jQuery-Validation-Engine/js/languages/jquery.validationEngine-zh_CN'

import '@/assets/plugins/bootstrap-treeview/css/bootstrap-treeview.min.css'
import '@/assets/plugins/bootstrap-treeview/js/bootstrap-treeview.min'

import components from '@/utils/components'

createApp(App).use(store).use(router).use(components).mount('#app')

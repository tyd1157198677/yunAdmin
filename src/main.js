import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'normalize.css/normalize.css'
//ant组件按需引入
import {Badge,message, Button,Layout,Dropdown,Menu,Select,Input,Col,Row,Table,Icon,Tabs,Tag,Divider,Form,FormModel,Pagination,Breadcrumb,Tree,Empty,Modal,Radio,DatePicker,Switch,Cascader,Avatar} from 'ant-design-vue';
axios.defaults.baseURL = "https://www.kchuangqi.com/Api/"
// Vue.prototype.GLOBALURL1 = "https://www.kchuangqi.com/Api/";
Vue.prototype.$http = axios
Vue.use(Badge)
Vue.use(Button)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Select)
Vue.use(Input)
Vue.use(Col)
Vue.use(Row)
Vue.use(Table)
Vue.use(Icon)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(Form)
Vue.use(FormModel)
Vue.use(Pagination)
Vue.use(Breadcrumb)
Vue.use(Tree)
Vue.use(Empty)
Vue.use(Modal)
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(Switch)
Vue.use(Cascader)
Vue.use(Avatar)
Vue.use(Tabs)
Vue.use(Dropdown)
Vue.config.productionTip = false

Vue.prototype.$message = message;
message.config({
    duration: 2,// 持续时间
    top:`100px`, // 到页面顶部距离
    maxCount: 3 // 最大显示数, 超过限制时，最早的消息会被自动关闭
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import {
    Menu,
    Button,
    Icon,
    Drawer,
    Radio,
    Tabs,
    Card,
    Form,
    Input,
    Checkbox,
    Table,
    Row,
    Col,
    Divider,
    List,
    Avatar,
    Tag,
    Spin,
    Select,
    Collapse,
    Dropdown,
    message,   //全局展示操作反馈信息。可提供成功、警告和错误等反馈信息。顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。
    notification,//在系统四个角显示通知提醒信息,常用于较为复杂的通知内容。带有交互的通知，给出用户下一步的行动点。系统主动推送。
    Modal, //模态对话框。需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。


} from 'ant-design-vue';

message.config({
    top: `10px`,
    duration: 2,
    maxCount: 3,
});


Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;

Vue.use(Menu)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Radio)
Vue.use(Tabs)
Vue.use(Card)
Vue.use(Form)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Table)
Vue.use(Row)
Vue.use(Col)
Vue.use(Divider)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Tag)
Vue.use(Spin)
Vue.use(Select)
Vue.use(Collapse)
Vue.use(Dropdown)
Vue.use(Modal)


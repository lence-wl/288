<!--
@ Author: lence
@Date: 2019-04-21
-->
<template>
    <div class="head">
        <div class="logoBox">
            Lence
        </div>
        <div class="navBox">
            <div class="navList">
                <div v-for="(item,index) in navList"  class="navItem">
                        <span :class="{'isActive':activeNav === item.key}" @click="routerTo(item)" >{{ item.name }}</span>
                </div>
            </div>
        </div>
        <div>
        </div>
        <div class="navBtn">
            <a-icon  @click="showLoginModal(true)" type="user" />
        </div>
        <!--登录模态窗口-->
        <a-modal
                title="登录"
                :visible="visible"
                :footer="null"
                @cancel="() => showLoginModal(false)"
        >
            <a-form
                    id="components-form-demo-normal-login"
                    :form="form"
                    class="login-form"
                    @submit="handleSubmit"
            >
                <a-form-item>
                    <a-input v-decorator="['username',
                      { rules: [{ required: true, message: '请输入用户名!' }]}]"
                            placeholder="用户名">
                        <a-icon
                        slot="prefix"
                        type="user"
                        style="color: rgba(0,0,0,.25)"
                        />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input v-decorator="['password',
                      { rules: [{ required: true, message: '请输入密码!' }]}]"
                        type="password"
                        placeholder="密码"
                    >
                        <a-icon
                        slot="prefix"
                        type="lock"
                        style="color: rgba(0,0,0,.25)"
                        />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-checkbox v-decorator="['remember',
                      {valuePropName: 'checked',
                        initialValue: true}]">
                        两周内免登录
                    </a-checkbox>
                    <a class="login-form-forgot"  href=""
                    >
                        忘记密码
                    </a>
                    <a-button
                            type="primary"
                            html-type="submit"
                            class="login-form-button"
                            :loading="logLoading"
                    >
                        登录
                    </a-button>
                    or <a href="">
                    注 册
                </a>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
    import '../utils/directives/wave/wave.css'
    import Waves from '../utils/directives/wave/wave'
    export default {
        name: "Head",
        components: {},
        directives:{
            Waves,
        },
        data() {
            return {
                activeNav:'home',
                navList:[
                    {
                        name:'首页',
                        router:'/',
                        key:'home'
                    },
                    {
                        name:'学习笔记',
                        router:'/note',
                        key:'note'
                    },
                    {
                        name:'生活随笔',
                        router:'essay',
                        key:'essay'
                    },
                    {
                        name:'研习社',
                        router:'/',
                        key:'lab'
                    },
                    {
                        name:'关于我',
                        router:'/',
                        key:'about'
                    },
                    {
                        name:'后台管理',
                        router:'/admin/blogManage',
                        key:'admin'
                    },
                ],
            //    登录模态窗口数据
                ModalText: 'Content of the modal',
                visible: false,
                logLoading:false,
            }
        },
        beforeCreate () {
            this.form = this.$form.createForm(this);
        },
        created() {

        },
        watch: {},
        mounted() {

        },
        methods: {
            routerTo(navItem){
                this.activeNav = navItem.key;
                this.$router.push({
                    path:navItem.router
                })
                /*//命名的路由
                this.$router.push({name:'user', params:{userId: '123'}})

                //带查询参数，变成 /register?plan=private
                this.$router.push({path:'register', query:{plan:private}})*/
            },
            showLoginModal(visible) {
                this.visible = visible
            },
            handleSubmit (e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.logLoading = true;
                        console.log('Received values of form: ', values);
                        this.post('api/user/login', values).then(res => {
                            this.visible = false;
                            this.$message.success('登录成功！');
                            this.logLoading = false;
                            if (!res.errno) {
                                this.$router.push('/')
                            }
                        })
                    }
                });
            },
        }
    }
</script>
<style lang="scss">
    .head{
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
        display: flex;
        align-items:center;
        height: 60px;
        font-size: 16px;
        line-height: 30px;
        .logoBox{
            width: 15%;
            text-indent: 20px;
            user-select: none;
            border-right: 1px solid #e8e8e8;
        }

        .navBox{
            width: 60%;
            margin-right: 20px;
        }
        .navList{
            display: flex;
            font-size: 14px;
            span{
                cursor: pointer;
                padding: 4px 6px;
            }
            .navItem{
                margin: 0 6px;
                :hover{
                    border-bottom: 2px solid #000;
                }
                .isActive{
                    border-bottom: 2px solid #000;
                }
            }
            .searchItem{
                text-align: right;
            }
        }
        .logBox{
            border-left: 1px solid #e8e8e8;
            text-align: right;
            cursor: pointer;
            width: 100px;
            padding-right: 20px;
        }
        .navBtn{
            width: 20%;
            cursor: pointer;


        }


    }
    #components-form-demo-normal-login .login-form {
        max-width: 300px;
    }
    #components-form-demo-normal-login .login-form-forgot {
        float: right;
    }
    #components-form-demo-normal-login .login-form-button {
        width: 100%;
    }
</style>

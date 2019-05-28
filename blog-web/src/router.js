import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index/index'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index,

        },
        {
            path:'/note',
            component: () => import(/* webpackChunkName: "blog" */ './views/note'),
            children:[
                {
                    path:'/',
                    name: 'NoteList',
                    component: () => import(/* webpackChunkName: "blog" */ './views/note/page/noteList.vue')
                },
                {
                    path: '/noteDetail',
                    name: 'NoteDetail',
                    component: () => import(/* webpackChunkName: "blog" */ './views/note/page/noteDetail')
                },
            ]
        },
        {
            path:'/essay',
            name: 'Essay',
            component: () => import(/* webpackChunkName: "blog" */ './views/essay/essay.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import(/* webpackChunkName: "blog" */ './views/user/login.vue')
        },
        {
            path: '/createBlog',
            name: 'CreateBlog',
            component: () => import(/* webpackChunkName: "blog" */ './views/blog/createBlog.vue')
        },
        {
            path: '/admin',
            name: 'Admin',
            component: () => import(/* webpackChunkName: "admin" */ './views/admin'),
            children:[
                {
                    path:'blogManage',
                    name: 'BlogManage',
                    component: () => import(/* webpackChunkName: "admin" */ './views/admin/page/blogManager'),
                    children:[
                        {
                            path:'/',
                            name: 'BlogList',
                            alias:'blogList',
                            component: () => import(/* webpackChunkName: "admin" */ './views/admin/page/blogManager/page/blogList.vue'),
                        },
                        {
                            path:'new',
                            name: 'NewBlog',
                            keepAlive:true,
                            component: () => import(/* webpackChunkName: "admin" */ './views/admin/page/blogManager/page/createBlog.vue')
                        },
                        {
                            path:'edit',
                            name: 'BlogEdit',
                            component: () => import(/* webpackChunkName: "admin" */ './views/admin/page/blogManager/page/createBlog.vue')
                        },
                        {
                            path:'tagList',
                            name: 'TagList',
                            component: () => import(/* webpackChunkName: "admin" */ './views/admin/page/blogManager/page/tagList.vue')
                        },
                    ]
                },
            ]
        },

        {
            path: '/editBlog',
            name: 'editBlog',
            component: () => import(/* webpackChunkName: "user" */ './views/blog/editBlog')
        }
    ]
})

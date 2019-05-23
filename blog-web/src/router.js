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
            name: 'index',
            component: Index,

        },
        {
            path:'/note',
            name: 'note',
            component: () => import(/* webpackChunkName: "blog" */ './views/note'),
            children:[
                {
                    path:'/',
                    name: 'noteList',
                    component: () => import(/* webpackChunkName: "blog" */ './views/note/components/noteList.vue')
                },
                {
                    path: '/noteDetail',
                    name: 'noteDetail',
                    component: () => import(/* webpackChunkName: "blog" */ './views/note/components/noteDetail')
                },
            ]
        },
        {
            path:'/essay',
            name: 'essay',
            component: () => import(/* webpackChunkName: "blog" */ './views/blog/createBlog.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "blog" */ './views/user/login.vue')
        },
        {
            path: '/createBlog',
            name: 'createBlog',
            component: () => import(/* webpackChunkName: "blog" */ './views/blog/createBlog.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import(/* webpackChunkName: "admin" */ './views/admin'),
            children:[
                {
                    path:'blogManage',
                    name: 'blogManage',
                    component: () => import(/* webpackChunkName: "admin" */ './views/admin/components/blogManage.vue')
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

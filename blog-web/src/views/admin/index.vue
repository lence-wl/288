<!--
@ Author: lence
@Date: 2019-05-12
-->

<template>
    <div class="adminIndex">
        <div style="width: 15%;border-right: 1px solid #e8e8e8">
            <a-menu
                    :defaultSelectedKeys="['article']"
                    mode="inline"
                    theme="light"
                    :inlineCollapsed="collapsed"
            >
                <a-menu-item v-for="item in menuList" :key="item.key">
                    <router-link :to="{ name: item.routerName}">
                        <span>{{ item.name }}</span>
                    </router-link>

                </a-menu-item>
            </a-menu>
        </div>
        <div style="width:85%">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

    export default {
        name: "adminIndex",
        components: {},
        data() {
            return {
                collapsed:false,
                menuList:[
                    {
                        name:'文章管理',
                        key:'article',
                        router:'blogList',
                        routerName:'BlogList'
                    },
                    {
                        name:'标签管理',
                        key:'tags',
                        router:'tagList',
                        routerName:'TagList'
                    },
                    {
                        name:'友链管理',
                        key:'friendLink',
                        router:'friendLinkList',
                        routerName:'FriendLinkList'

                    },
                    {
                        name:'浏览统计',
                        key:'statistic',
                        router:'statistic',
                        routerName:'Statistic'
                    },
                    {
                        name:'日志查看',
                        key:'logCheck',
                        router:'logCheck',
                        routerName:'LogCheck'
                    },

                ]
            }
        },
        created() {

        },
        computed:{

        },
        watch: {},
        mounted() {

        },
        methods: {}
    }
</script>
<style lang="scss">
    .adminIndex{
        .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left {
            border-right: none;
        }
        display: flex;
        margin-top: 4px;

    }
</style>

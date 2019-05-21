<!--
@ Author: lence
@Date: 2019-05-12
-->

<template>
    <div class="index">
        <div style="width: 15%">
            <a-menu
                    :defaultSelectedKeys="['article']"
                    mode="inline"
                    theme="light"
                    :inlineCollapsed="collapsed"
            >
                <a-menu-item v-for="item in menuList" :key="item.key">
                    <span>{{ item.name }}</span>
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
        name: "index",
        components: {},
        data() {
            return {
                collapsed:false,
                menuList:[
                    {
                        name:'文章管理',
                        key:'article'
                    },
                    {
                        name:'友链管理',
                        key:'friendLink'
                    },
                    {
                        name:'浏览统计',
                        key:'statistic'
                    },
                    {
                        name:'日志查看',
                        key:'logCheck'
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
<style>
    .index{
        display: flex;
    }
</style>

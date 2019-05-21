<!--
@ Author: lence
@Date: 2019-05-12
-->

<template>
    <div class="layout">

        <div class="bodyBox">
            <!--左列-->
            <div class="sideBox_l">
                <sideColumnL></sideColumnL>
            </div>
            <!--中部内容区-->
            <div class="viewBox">
                <router-view/>
            </div>
            <!--右列-->
            <div class="sideBox_r">
                <sideColumnR></sideColumnR>
            </div>
        </div>

    </div>
</template>

<script>

    import sideColumnL from './components/sideColumnL'
    import sideColumnR from './components/siedColumnR'
    export default {
        name: "layout",
        components: {
            sideColumnL,
            sideColumnR,
        },
        data() {
            return {}
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
    layout{
        display: flex;
        margin-top:20px;

    }
    .bodyBox{
        display: flex;
        margin-top: 20px;
    }
    .sideBox_l{
        width: 15%;
        border-right: 1px solid #e8e8e8;
    }
    .viewBox{
        width: 60%;
        margin-right:20px;

    }
    .sideBox_r{
        width: 20%;
    }

</style>

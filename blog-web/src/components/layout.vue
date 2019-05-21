<!--
@ Author: lence
@Date: 2019-05-12
-->

<template>
    <div class="layout">

        <div class="bodyBox">

            <div class="viewBox">
                <router-view/>
            </div>

        </div>

    </div>
</template>

<script>

    import sideColumnL from './sideColumnL'
    import sideColumnR from './siedColumnR'
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

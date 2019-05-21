<!--
@ Author: lence
@Date: 2019-05-02
-->
<template>
    <div class="sideColumn_r">
        <div class="navItem searchItem">
            <a-input-search placeholder=". . ."/>
        </div>
        <div class="CardBox">
            <div class="tagsBox">
                <div class="title">标签分类</div>
                <span  class="sortTag">javaScript</span>
                <span  class="sortTag">css</span>
                <span  class="sortTag">node</span>
                <span  class="sortTag">python</span>
                <span  class="sortTag">python</span>
                <span  class="sortTag">python</span>
                <span  class="sortTag">python</span>
                <span  class="sortTag">python</span>
            </div>

            <div class="recommendList">
                <div class="title">推荐阅读</div>
                <p class="recommendList_item">文章一是关于胜多负少的股份收入是否发送到发送到文章一是关于胜多负少的股份收入是否发送到发送到文章一是关于胜多负少的股份收入是否发送到发送到</p>
                <p class="recommendList_item">文章一是关于胜多负少的股份收入是否发送到发送到</p>
                <p class="recommendList_item">文章一是关于胜多负少的股份收入是否发送到发送到</p>
                <p class="recommendList_item">文章一是关于胜多负少的股份收入是否发送到发送到</p>
                <p class="recommendList_item">文章一是关于胜多负少的股份收入是否发送到发送到</p>
                <p class="recommendList_item">文章一是关于胜多负少的股份收入是否发送到发送到</p>
                <p class="recommendList_item">文章一是关于胜多负少的股份收入是否发送到发送到</p>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "sideBarR",
        components: {},
        data() {
            return {
                text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
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
    .sideColumn_r{
        .CardBox{
            border: 1px solid #e8e8e8;
            padding: 0 15px;
            margin-top: 10px;
            border-radius: 4px;
        }
        .title{
            padding: 10px 0;
            font-weight: bolder;
            color: #333;
            letter-spacing: 4px;
            border-bottom: 1px solid #e8e8e8;

        }
        .sortTag{
            font-size: 14px;
            padding: 5px 20px 5px 0;
            height: auto;
            display: inline-block;
            cursor: pointer;
        }
        .recommendList_item{
            cursor: pointer;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient: vertical;
            line-height: 24px;
            font-size: 14px;
        }

    }

</style>

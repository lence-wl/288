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
                <div style="display: flex;flex-flow:row wrap;">
                    <div class="tagWrapper" style="position: relative" v-for="(item,key) in tagData" :key="key">
                        <span   class="sortTag">{{ item.tag }}</span>
                    </div>
                </div>
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
    import API from '../../../utils/request/api'
    export default {
        name: "sideBarR",
        components: {},
        data() {
            return {
                tagData:[],
                state:1,
            }
        },
        created() {
            this.getTagList()
        },
        computed:{

        },
        watch: {},
        mounted() {

        },
        methods: {
            // 标签列表请求
            getTagList(){
                this.get(API.tagList,{state:this.state}).then(res => {
                    console.log(res.data)
                    this.tagData = res.data
                })
            },
        }
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
        .tagWrapper{
            padding: 5px 20px 5px 0;
            float: left;
        }
        .sortTag{
            font-size: 14px;
            height: auto;
            cursor: pointer;
            position: relative;
            z-index:1;
            &:hover{
                transform:scale(1.1,1.1);
                display: block;
                font-weight: bold;
            }

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

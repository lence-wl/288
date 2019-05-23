<template>
    <div class="index">
        我是首页
    </div>
</template>

<script>
    import {dateFormat} from '../../utils/funcTool'
    export default {
        name: 'index',
        components:{
        },
        data() {
            return {
                data:[],
                actions: [
                    { type: 'star-o', text: '156' },
                    { type: 'like-o', text: '156' },
                    { type: 'message', text: '2' },
                ],
            }
        },
        created(){
            this.get('api/blog/list').then(res => {
                console.log(res)
                this.data = res.data
            })
            this.dateFormat = dateFormat;
        },
        methods:{
            itemDetail(id){
                this.$router.push({
                    name:'BlogDetail',
                    query:{
                        id:id,
                    }
                })

            }
        }
    }

</script>
<style lang="scss">
    .index{
        .listLabelBox{
            margin: 10px 0;
        }
        .ant-list-item-action{
            text-align: right;
        }
        .ant-list-item-meta-description{
            color: #333;
        }

    }

</style>

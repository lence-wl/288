<template>
    <div class="index">
        <template>
            <a-list
                    itemLayout="vertical"
                    :dataSource="data"
                    class="note-list"
                >
                <a-list-item  slot="renderItem" slot-scope="item, index">
                    <a-list-item-meta
                            :description="item.sketch"
                    >
                        <a slot="title" @click="itemDetail(item.key)" style="overflow: hidden;display: block;">
                            <span style="font-weight: bolder;color: #333">{{item.title}}</span>
                            <span style="float:right; font-size: 14px;color: #999999;font-weight: lighter">
                                {{ dateFormat(new Date(item.createtime)).substring(0,10) }}
                            </span>
                        </a>
                        <div slot="title" class="listLabelBox">
                            <a-tag v-for="(item,index) in item.tags ? item.tags.split(',') : []" :key="index">
                                {{ item }}
                            </a-tag>
                        </div>
                        <a-avatar slot="avatar" style="visibility: hidden" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    </a-list-item-meta>
                    <template class="list-action" slot="actions" v-for="{type, text} in actions">
                        <span :key="type">
                          <a-icon :type="type" style="margin-right: 8px" />
                          {{text}}
                        </span>
                    </template>
                </a-list-item>
            </a-list>
        </template>
    </div>
</template>

<script>
    import {dateFormat} from '../../../utils/funcTool'
    import APi from '../../../utils/request/api'
    export default {
        name: 'note',
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
            this.get(APi.blogList).then(res => {
                console.log(res)
                this.data = res.data
            })
            this.dateFormat = dateFormat;
        },
        methods:{
            itemDetail(id){
                this.$router.push({
                    name:'NoteDetail',
                    query:{
                        id:id,
                    }
                })

            },

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
        .note-list{
            width: 100%;
        }
    }

</style>

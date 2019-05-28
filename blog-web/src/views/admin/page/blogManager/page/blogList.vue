<!--
@ Author: lence
@Date: 2019-05-12
-->

<template>
    <div class="blogManage">
        <div id="components-form-demo-advanced-search">
            <a-form
                    class="ant-advanced-search-form"
                    :form="form"
            >
                <a-row :gutter="24">
                    <a-col :span="4">
                        <a-form-item label="关键字">
                            <a-input placeholder="请输入"
                                     v-decorator="[
                                      'keyword',
                                      {rules: []}
                                    ]"
                                     :allowClear="true"     />
                        </a-form-item>
                    </a-col>
                    <a-col :span="4">
                        <a-form-item label="选标签">
                            <a-select :allowClear="true"
                                      placeholder="请选择"
                                      :maxTagCount="3"
                                      :dropdownStyle="{maxHeight:'250px',overflow:'auto'}"
                                      @change="handleChange">
                                <a-select-option v-for="(item,key) in tagData" value="javascript" :key="key" :value="item.tag"> {{ item.tag }} </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col  :span="4">
                        <a-form-item label="发布时间">
                            <a-date-picker  v-decorator="['createtime']"  placeholder="选择日期" @change="onDataChange">
                            </a-date-picker>
                        </a-form-item>
                    </a-col>
                    <a-col
                            :span="4"
                            class="formSearchBtn"
                            :style="{ textAlign: 'right' }"
                    >
                        <a-button
                                type="primary"
                                html-type="submit"
                                @click="getBlogList"
                        >
                            查询
                        </a-button>
                        <a-button
                                :style="{ marginLeft: '8px' }"
                                @click="handleReset"
                        >
                            清空
                        </a-button>
                    </a-col>
                    <a-col
                            :span="4"
                            :style="{ textAlign: 'right',paddingTop:'4px' }"
                    >
                        <a-button
                                type="primary"
                                @click="createBlog"
                        >
                            新建文章
                        </a-button>
                    </a-col>
                </a-row>

                <a-row>

                </a-row>
            </a-form>
            <div class="search-result-list">
                <a-table :columns="columns" :dataSource="data" :loading="tableLoadin">
                    <!--<a slot="title">插入表格标题</a>-->
                    <span slot="tags" slot-scope="tags">
                        <a-tag  v-for="(tag,index) in tags.split(',')" color="blue" v-show="tag" :key="tag.id">{{tag}}</a-tag>
                    </span>
                    <span slot="isrec" slot-scope="isrec">
                        {{ isrec.isrec==1 ? '是' : '否' }}
                    </span>
                    <span slot="action" slot-scope="text, item">
                      <a @click="editBlog(item)">编辑</a>
                      <a-divider type="vertical" />
                      <a @click="setRecommend(item)" >{{ item.isrec ? '取消推荐':'设置推荐' }}</a>
                      <a-divider type="vertical" />
                      <a @click="putToTop(item)">置顶</a>
                      <a-divider type="vertical" />
                      <a @click="deleteBlog(item)" style="color: red">删除</a>
                    </span>
                </a-table>
            </div>
        </div>

    </div>
</template>

<script>
import API from '../../../../../utils/request/api'
    const columns = [{
        title: '标题',
        dataIndex: 'title',
        key: 'title',
    },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
        },
        {
        title: '发布时间',
        dataIndex: 'createtime',
        key: 'createtime',
    }, {
        title: '标签',
        key: 'tags',
        dataIndex: 'tags',
        scopedSlots: { customRender: 'tags' },
    }, {
        title: '浏览量',
        key: 'views',
            dataIndex: 'views',
    },
        {
            title: '是否推荐',
            key: 'isrec',
            scopedSlots: { customRender: 'isrec' },
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'action' },
        },

    ];
    export default {
        name: "",
        components: {},
        data() {
            return {
                data:[],
                columns,
                form: this.$form.createForm(this),
                createtime:"",
                tableLoadin:false,
                tagData:[],
            };
        },
        created(){
            this.getBlogList()
            this.getTagList()
        },
        computed:{
        },
        watch: {},
        mounted() {

        },
        methods: {
            // 文章列表请求
            getBlogList(){
                this.form.validateFields((err, values) => {
                    const createtime = this.createtime
                    const {tags,keyword} = values
                        console.log('Received values of form: ', values);
                    this.tableLoadin = true
                    this.get(API.blogList,{tags,keyword,createtime}).then(res => {
                        this.data = res.data;
                        this.tableLoadin = false;
                        console.log(res)
                    })
                });
            },
            // 标签列表请求
            getTagList(){
                this.get(API.tagList,{state:this.state}).then(res => {
                    console.log(res.data)
                    this.tagData = res.data
                })
            },

            handleReset () {
                this.form.resetFields();
                this.createtime = '';

            },
            handleChange(value) {
                // this.formData.tags = value;
            },
            createBlog(){
                this.$router.push({name:'NewBlog'})
            },
            onDataChange(date, dateString) {
                this.createtime = dateString
            },
            deleteBlog(item){
                const {key} = item;
                this.post(API.deleteBlog,{id:key}).then(res => {
                    this.$message(res)
                    if(!res.errno){
                        this.getBlogList()
                    }
                })
            },
            editBlog(item){
                this.$router.push({
                    name:'BlogEdit',
                    query:{id:item.key}

                })
            },
            putToTop(item){
                this.post(API.editBlog,{id:item.key}).then((res) => {
                    this.$message(res)
                    if(!res.errno){
                        this.getBlogList()
                    }
                })
            },
            setRecommend(item){
                console.log(item.isrec)
                this.post(API.setReco,{id:item.key,isrec:!item.isrec}).then((res) => {
                    this.$message(res)
                    if(!res.errno){
                        this.getBlogList()
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
    .blogManage{
        padding: 12px 19px;
        .formSearchBtn{
            padding-top: 4px;
        }
        .ant-advanced-search-form .ant-form-item {
            margin-bottom: 20px;
        }
        .ant-advanced-search-form {
            background: #fbfbfb;
            border: 1px solid #d9d9d9;
        }

        .ant-advanced-search-form .ant-form-item {
            display: flex;
        }

        .ant-advanced-search-form .ant-form-item-control-wrapper {
            flex: 1;
        }

        #components-form-demo-advanced-search .ant-form {
            max-width: none;
        }
        #components-form-demo-advanced-search .search-result-list {
            margin-top: 16px;
            border: 1px dashed #e9e9e9;
            background-color: #fafafa;
            min-height: 200px;
            text-align: center;
        }
        .ant-spin-nested-loading {
            min-height: 200px;
        }
    }

</style>

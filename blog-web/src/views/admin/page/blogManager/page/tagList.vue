<!--
@ Author: lence
@Date: 2019-05-12
-->

<template>
    <div class="tagManage">
        <div id="components-form-demo-advanced-search">
            <a-form
                    class="ant-advanced-search-form"
                    :form="tagSearchForm"
            >
                <a-row :gutter="24">
                    <a-col :span="4">
                        <a-form-item label="标签类别">
                            <a-select :allowClear="true" placeholder="请选择"
                                      v-decorator="['tagType']"
                                      @change="handleChange">
                                <a-select-option value=1>学习笔记</a-select-option>
                                <a-select-option value=0>生活随笔</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="4">
                        <a-form-item label="当前状态">
                            <a-select :allowClear="true" placeholder="请选择"
                                      v-decorator="['state']"
                                      @change="handleStateChange">
                                <a-select-option value=1>已启用</a-select-option>
                                <a-select-option value=0>已停用</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col
                            :span="4"
                            :style="{paddingTop:'4px' }"
                    >
                        <a-button
                                type="primary"
                                @click="showAddModal"
                        >
                            添加标签
                        </a-button>
                    </a-col>
                </a-row>

                <a-row>

                </a-row>
            </a-form>
            <div class="search-result-list">
                <a-table :columns="columns" :dataSource="data" :loading="tableLoadin">
                    <!--<a slot="title">插入表格标题</a>-->
                    <span slot="tag" slot-scope="tag">
                        <a-tag color="blue" v-show="tag" :key="tag">{{tag}}</a-tag>
                    </span>

                    <span slot="tagType" slot-scope="tagType">
                        {{ tagType ? "学习笔记" : "生活随笔" }}
                    </span>

                    <span slot="state" slot-scope="state">
                        {{ state ? "已启用" : "已停用" }}
                    </span>

                    <span slot="action" slot-scope="text, item">
                        <a @click="changeTagState(item)" >{{ item.state ? "停用":"启用" }}</a>
                        <a-divider type="vertical" />
                        <a @click="deleteTag(item)" style="color: red">删除</a>
                    </span>
                </a-table>
            </div>
        </div>
    <!--添加标签模态窗口-->
        <a-modal
                v-model="addTagModalVisible"
                title="添加标签"
                onOk="handleAddTag"
        >
            <a-form
                class="ant-advanced-search-form"
                :form="addTagForm"
            >
                <a-row>
                    <a-col>
                        <a-form-item label="标签内容"
                                     :label-col="{ span: 6 }"
                                     :wrapper-col="{ span: 16 }">
                            <a-input placeholder="请输入"
                                     v-decorator="['tag',
                                     { rules: [{ required: true, message: '请输入标签内容' }] }]"
                                     :allowClear="true"     />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col >
                        <a-form-item label="标签类别"
                                     :label-col="{ span: 6 }"
                                     :wrapper-col="{ span: 16 }">
                            <a-select :allowClear="true" placeholder="请选择"
                                      v-decorator="['tagType',
                                      { rules: [{ required: true, message: '请选择类别' }] }]"
                                      >
                                <a-select-option value=1>学习笔记</a-select-option>
                                <a-select-option value=0>生活随笔</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
            <template slot="footer">
                <a-button key="back" @click="handleCancel">取消</a-button>
                <a-button key="submit"
                          type="primary"
                          :loading="addTagLoading"
                          @click="handleAddTag">
                    确定
                </a-button>
            </template>
        </a-modal>
    </div>
</template>

<script>
    import API from '../../../../../utils/request/api'
    const columns = [{
        title: '标签',
        dataIndex: 'tag',
        key: 'tag',
        scopedSlots: { customRender: 'tag' },
    },
        {
            title: '所属分类',
            dataIndex: 'tagType',
            key: 'tagType',
            scopedSlots: { customRender: 'tagType' },
        },
        {
            title: '当前状态',
            dataIndex: 'state',
            key: 'state',
            scopedSlots: { customRender: 'state' },
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'action' },
        }
    ];

    const data = [{
        key: '1',
        tag: 'html',
        tagType: '学习笔记',
        state: '启用',
    }, {
        key: '2',
        tag: 'html',
        tagType: '学习笔记',
        state: '启用',
    }, {
        key: '3',
        tag: 'html',
        tagType: '学习笔记',
        state: '启用',
    }];

    export default {
        name: "",
        components: {},
        data() {
            return {
                data:[],
                addTagForm: this.$form.createForm(this),
                tagSearchForm: this.$form.createForm(this),
                columns,
                tableLoadin:false,
                addTagLoading: false,
                addTagModalVisible: false,

            };
        },
        created(){
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
                this.tagSearchForm.validateFields((err, values) => {
                    console.log(values)
                    this.get(API.tagList,values).then(res => {
                        this.data = res.data
                    })
                });

            },
            // 标签列表类型查询切换
            handleChange(value) {
                this.tagSearchForm.setFieldsValue({tagType:value})
                this.getTagList()
            },
            handleStateChange(value){
                this.tagSearchForm.setFieldsValue({state:value})
                this.getTagList()
            },
            // 删除标签
            deleteTag(item){
                this.post(API.delTag,{id:item.key}).then(res => {
                    this.$message(res)
                    if(!res.errno){
                        this.getTagList()
                    }
                })
            },
            // 启用标签
            activeTag(item){
                console.log('qy')
            },
            // 禁用标签
            changeTagState(item){
                this.post(API.changeTagState,{id:item.key,state:item.state ? 0:1}).then((res) => {
                    console.log(res)
                    this.$message(res)
                    this.getTagList()
                })
            },
            showAddModal() {
                this.addTagModalVisible = true;
            },
            handleAddTag(e) {
                // addTag
                this.addTagLoading = true;
                this.addTagForm.validateFields((err, values) => {
                    if(!err){
                        console.log(values)
                        this.post(API.addTag,values).then(res => {
                            this.$message(res)
                            if(!res.errno){
                                this.addTagModalVisible = false;
                                this.addTagLoading = false;
                                this.getTagList()
                            }
                        })
                    }

                });
            },
            handleCancel(e) {
                this.addTagModalVisible = false;
            },
        }
    }
</script>
<style lang="scss">
    .tagManage{
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

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
                    @submit="handleSearch"
            >
                <a-row :gutter="24">
                    <a-col
                            :span="4"
                    >
                        <a-form-item label="选择标签">
                            <a-select defaultValue="lucy" @change="handleChange">
                                <a-select-option value="jack">javascript</a-select-option>
                                <a-select-option value="lucy">html</a-select-option>
                                <a-select-option value="disabled">python</a-select-option>
                                <a-select-option value="Yiminghe">yiminghe</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="4">
                        <a-form-item label="关键字">
                            <a-input placeholder="请输入" />
                        </a-form-item>
                    </a-col>

                    <a-col  :span="4">
                        <a-form-item label="发布时间">
                            <a-select defaultValue="lucy" @change="handleChange">
                                <a-select-option value="jack">javascript</a-select-option>
                                <a-select-option value="lucy">html</a-select-option>
                                <a-select-option value="disabled">python</a-select-option>
                                <a-select-option value="Yiminghe">yiminghe</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col
                            :span="24"
                            :style="{ textAlign: 'right' }"
                    >
                        <a-button
                                type="primary"
                                html-type="submit"
                        >
                            Search
                        </a-button>
                        <a-button
                                :style="{ marginLeft: '8px' }"
                                @click="handleReset"
                        >
                            Clear
                        </a-button>
                    </a-col>
                </a-row>
            </a-form>
            <div class="search-result-list">
                Search Result List
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "",
        components: {},
        data() {
            return {
                expand: false,
                form: this.$form.createForm(this),
            };
        },
        created(){


        },
        computed:{
            count () {
                return this.expand ? 11 : 7;
            },
        },
        watch: {},
        mounted() {

        },
        methods: {
            handleSearch  (e) {
                e.preventDefault();
                this.form.validateFields((error, values) => {
                    console.log('error', error);
                    console.log('Received values of form: ', values);
                    this.success()

                });
            },
            success () {
                this.$message.loading('Action in progress..', 2.5)
                    .then(() => this.$message.success('Loading finished', 2.5))
                    .then(() => this.$message.info('Loading finished is finished', 2.5));
            },

            handleReset () {
                this.form.resetFields();
            },
            handleChange(value) {
                console.log(`selected ${value}`);
            }


        }
    }
</script>
<style lang="scss">
    .blogManage{
        .ant-advanced-search-form {
            padding: 24px;
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
            border-radius: 6px;
            background-color: #fafafa;
            min-height: 200px;
            text-align: center;
            padding-top: 80px;
        }
    }

</style>

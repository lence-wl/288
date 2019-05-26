<template>
    <div class="createBlog">
            <a-form
                    id="components-form-demo-normal-login"
                    :form="form"
                    class="login-form"
                    @submit="handleSubmit"
                    layout="horizontal"
            >
                <a-form-item label='标题'
                             :label-col="{ span: 2 }"
                             :wrapper-col="{ span: 20 }"
                >
                    <a-input
                            v-decorator="[
                              'title',
                              { rules: [{ required: true, message: 'Please input your username!' }] }
                            ]"
                            option.initialValue="ssss"
                            placeholder="请输入"
                    >

                    </a-input>
                </a-form-item>
                <a-form-item label='简述'
                             :label-col="{ span: 2 }"
                             :wrapper-col="{ span: 20 }"
                >
                    <a-input
                            v-decorator="[
                      'sketch',
                      { rules: [{ required: true, message: 'Please input your username!' }] }
                    ]"
                            placeholder="请输入"
                    >

                    </a-input>
                </a-form-item>
                <a-form-item label='分类'
                             :label-col="{ span: 2 }"
                             :wrapper-col="{ span: 20 }"
                >
                    <a-select mode="tags" style="width: 100%" :tokenSeparators="[',']"

                          v-decorator="[
                          'tags',
                          {rules: [{ required: true, message: '请选择文章标签' }]}
                        ]"
                          placeholder="请选择"
                    >
                        <a-select-option value="javaScript">
                            javaScript
                        </a-select-option>
                        <a-select-option value="css">
                            css
                        </a-select-option>
                        <a-select-option value="html">
                            html
                        </a-select-option>
                        <a-select-option value="node">
                            node
                        </a-select-option>
                        <a-select-option value="python">
                            python
                        </a-select-option>
                        <a-select-option value="threeJs">
                            threeJs
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item
                 label=''
                 :label-col="{ span: 2 }"
                 :wrapper-col="{ span: 20 }"
                >
                    <div style="text-align: right">
                        <a-button @click="handleSubmit" type="primary">
                            {{  id ?  "提交修改" : "发布"}}
                        </a-button>
                    </div>

                </a-form-item>
                <a-form-item label='文章内容'
                             :label-col="{ span: 2 }"
                             :wrapper-col="{ span: 20 }"
                >
                    <div  style="line-height: 20px">
                        <UEditor style="margin-top: 12px" @editorContent="getEditor"></UEditor>
                    </div>
                </a-form-item>

            </a-form>
    </div>
</template>

<script>
    // 使用UEditor富文本组件
    import UEditor from '../../../../../components/UEditor'
    import API from '../../../../../utils/request/api'
    export default {
        components: {
            UEditor,
        },
        beforeCreate () {
            this.form = this.$form.createForm(this);
        },
        data() {
            return {
                myEditor:{},
                blogData:{},
            }
        },
        computed:{
            id:function () {
                return this.$route.query.id
            }
        },
        mounted() {
            if(this.id){
                this.getBlogData(this.id)
            }
        },
        methods: {
            getEditor(editor){
                this.myEditor = editor.UEditor;
                if(this.id){
                    this.getBlogData(this.id)
                }
            },
            getEditorContent(){
                this.myEditor.getContent()
            },
            getBlogData(id){
                this.get('api/blog/detail', {id}).then(res => {
                    console.log(res)
                    try{
                        this.myEditor.execCommand('inserthtml',
                            res.data.content
                        )
                    }catch(e){}
                    const {title,sketch,tags} = res.data
                    this.form.setFieldsValue({title,sketch,tags:tags.split(',')});
                })
            },
            handleSubmit (e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err && this.myEditor.getContent()) {
                        values.content = this.myEditor.getContent();
                            values.id = this.id;
                            values.tags = values.tags.toString()
                            this.post(values.id ? API.editBlog : API.createBlog ,values).then((res) => {
                                this.$message(res)
                            })
                    }
                });
            },
        },
    }
</script>
<style scoped lang="scss">
    .createBlog {
        #container{
            height: 600px;
        }
    }

</style>

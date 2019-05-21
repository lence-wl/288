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
                             :label-col="{ span: 4 }"
                             :wrapper-col="{ span: 20 }"
                >
                    <a-input
                            v-decorator="[
                              'title',
                              { rules: [{ required: true, message: 'Please input your username!' }] }
                            ]"
                            placeholder="请输入"
                    >

                    </a-input>
                </a-form-item>
                <a-form-item label='简述'
                             :label-col="{ span: 4 }"
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
                             :label-col="{ span: 4 }"
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
                <a-form-item label='文章内容'
                             :label-col="{ span: 4 }"
                             :wrapper-col="{ span: 20 }"
                >
                    <div style="line-height: 20px">
                        <UEditor style="margin-top: 12px" @editorContent="getEditor"></UEditor>
                    </div>
                </a-form-item>
                <a-form-item>
                    <a-button
                            type="primary"
                            html-type="submit"
                            class="login-form-button"
                            style="position: fixed;top:20px;right: 100px"
                    >
                        发布
                    </a-button>
                </a-form-item>
            </a-form>
    </div>
</template>

<script>
    // 使用UEditor富文本组件
    import UEditor from '../../components/UEditor'
    export default {
        beforeCreate () {
            this.form = this.$form.createForm(this);
        },
        data() {
            return {
                myEditor:{},
            }
        },
        components: {
            UEditor,
        },
        created(){

        },

        mounted() {

        },
        methods: {
            getEditor(editor){
                this.myEditor = editor.UEditor;
            },

            getEditorContent(){
                console.log(this.myEditor.getContent())
            },
            handleSubmit (e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {

                    if (!err && this.myEditor.getContent()) {
                        values.content = this.myEditor.getContent();
                        this.post('api/blog/new',values).then((res) => {
                            console.log(res)
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

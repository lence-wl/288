<!--
@ Author: lence
@Date: 2019-04-20
-->

<template>
    <div class="editBlog">
        <p>编辑博客</p>
        <a-form
                :form="form"
                @submit="handleSubmit"
        >
            <a-form-item
                    label="博客ID"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                <a-input
                        v-decorator="[
                              'id',
                               {rules: [{ required: true, message: '请输入ID!' }]}]"
                />
            </a-form-item>
            <a-form-item
                    label="博客标题"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                <a-input
                        v-decorator="[
                              'title',
                               {rules: [{ required: true, message: '请输入标题!' }]}]"
                />
            </a-form-item>

            <a-form-item
                    label="博客内容"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                <a-input
                        v-decorator="[
                              'content',
                               {rules: [{ required: true, message: '请输入内容!' }]}]"
                />
            </a-form-item>



            <a-form-item
                    :wrapper-col="{ span: 12, offset: 5 }"
            >
                <a-button
                        type="primary"
                        html-type="submit"
                >
                    确定
                </a-button>
            </a-form-item>
        </a-form>
        <a-form
                :form="formDel"
                @submit="delSubmit"

        >
            <a-form-item
                    label="博客ID"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                <a-input
                        v-decorator="[
                              'id',
                               {rules: [{ required: true, message: '请输入ID!' }]}]"
                />
            </a-form-item>


            <a-form-item
                    :wrapper-col="{ span: 12, offset: 5 }"
            >
                <a-button
                        type="primary"
                        html-type="submit"

                >
                    删除
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>

    export default {
        name: "editBlog",
        data () {
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this),
                formDel: this.$form.createForm(this),
            };
        },
        methods: {
            handleSubmit (e) {
                e.preventDefault();
                this.form.validateFields((err, data) => {
                    if (!err) {
                        console.log('Received values of form: ', data);
                        this.post('api/blog/update', data).then(res => {
                            console.log(res)
                        })
                    }
                });

            },
            delSubmit(e){
                e.preventDefault();
                this.formDel.validateFields((err, data) => {
                    if (!err) {
                        console.log('Received values of form: ', data);
                        this.post('api/blog/del', data).then(res => {
                            console.log(res)
                        })
                    }
                });
            }

        },
    }
</script>

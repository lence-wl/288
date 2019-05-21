<template>
    <div class="createBlog">
        <!-- 加载编辑器的容器 -->
        <div style="height: 600px">
            <script id="container"  name="content" type="text/plain">这里写你的初始化内容</script>
        </div>
        <div @click="handleSubmit">保存编辑</div>
    </div>
</template>
<script>
    import '../../../public/static/UEditor/ueditor.config';
    import '../../../public/static/UEditor/ueditor.all';
    import '../../../public/static/UEditor/lang/zh-cn/zh-cn';
    let ue = UE.getEditor('container',{
        BaseUrl: '',
        UEDITOR_HOME_URL: 'static/UEditor/',
    });
    export default {
        data() {
            return {
                UEditor:ue,
            }
        },
        components: {
        },

        mounted() {

        },
        methods: {
            handleSubmit(){
                // 获取 UEditor 输出的内容
                var contentHtml = this.UEditor.getContent();

                // 把编辑好的内容提交给服务器
                this.post('/api/blog/new',{
                    title:'测试ueditor提交代码',
                    content:contentHtml,
                })
            }

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

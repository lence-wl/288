<template>
    <div class="UEditor">
        <!-- 加载编辑器的容器 -->
        <div style="height: 400px;">
            <script id="container" class="container" name="content" type="text/plain">这里写你的初始化内容</script>
        </div>
    </div>
</template>
<script>
    import '../../public/static/UEditor/ueditor.config';
    import '../../public/static/UEditor/ueditor.all';
    import '../../public/static/UEditor/lang/zh-cn/zh-cn';
    let UEditor = UE.getEditor('container',{
        BaseUrl: '',
        UEDITOR_HOME_URL: 'static/UEditor/',
        height:600,
        toolbars: [[
            'fullscreen',  'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset',
            'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist',  'cleardoc', '|',
             'paragraph', 'fontfamily',  '|',
             'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
            'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
            'simpleupload', 'emotion',    'insertvideo',    'insertcode',   '|',
            'horizontal', 'date', 'time','|','preview', 'drafts'
        ]]
    });

    export default {
        name: 'UEditor',
        data () {
            return {
                UEditor: UEditor,
            }
        },
        mounted () {

            this.$emit('editorContent',{UEditor})
        },
    }
</script>
<style>
    .container{
        height: 400px;
    }
</style>

<template>
    <div class="UEditor">
        <!-- 加载编辑器的容器 -->
        <div ref="wrapper"  style="height: 400px;">
            <script id="container" class="container" name="content" type="text/plain"></script>
        </div>
    </div>
</template>
<script>
    import '../../public/static/UEditor/ueditor.config';
    import '../../public/static/UEditor/ueditor.all';
    import '../../public/static/UEditor/lang/zh-cn/zh-cn';
    export default {
        name: 'UEditor',
        data () {
            return {
                UEditor: null,
            }
        },
        mounted () {
            this.initUeditor()

        },
        methods:{
            initUeditor(){
                console.log(document.getElementById('container'))
                this.UEditor = UE.getEditor('container',{
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
                this.UEditor.ready(() => {
                    this.$emit('editorContent',{UEditor:this.UEditor});
                    this.UEditor.execCommand('cleardoc');
                    console.log(this.UEditor)
                })

            }
        },
        destroyed() {//销毁后，第一次和切换路由后都能加载出来
            this.UEditor.destroy();
        }
    }
</script>
<style>
    .container{
        height: 400px;
    }
</style>

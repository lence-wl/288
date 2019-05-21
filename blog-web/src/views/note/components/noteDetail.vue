<template>
    <div class="createBlog" style="padding: 20px">
        <p style="text-align: center">{{ blogData.title }}</p>
        <!-- 用来放置服务器返回的内容 -->
        <div id="result" style="border-top: 1px solid #ddd; padding: 20px;"></div>
    </div>
</template>

<script>
    import {dateFormat} from '../../../utils/funcTool'

    import '../../../../public/prism.css'
    import '../../../../public/prism.js'

    export default {
        name: "blogDetail",
        directives: {
            highlight: function (el, binding, vnode, oldVnode) {
                console.log(vnode)
                let blocks = el.querySelectorAll('pre')
                blocks.forEach((block) => {
                    hljs.highlightBlock(block)
                })
            }
        },
        data() {
            return {
                blogData: {},
                show: false,
            }
        },
        created() {
            let query = this.$route.query
            this.get('api/blog/detail', query).then(res => {
                this.blogData = res.data;
                if (res.data) {
                    this.insertCodeElement(this.blogData.content, '#result')
                }
            })
        },
        methods: {
            insertCodeElement(content, container) {
                container = container || document;
                // 创建一个 div 来放置获取到的内容，这样就可以把 content 字符串内容转换成 dom
                // 方便我们对这个 dom 进行操作（只是创建 div，并没有插入到文档，他只存在于内存中）
                var parent = document.createElement('div');
                parent.innerHTML = content;

                // 找到 parent 中的所有 pre 标签，并遍历
                var $pres = $(parent).find('pre');
                $pres.each(function (index, el) {
                    var $el = $(el),
                        html = $el.html(),
                        code = document.createElement('code'),
                        elClass = $el.attr('class'),
                        // 获取 pre 标签中，class 属性中包含的本段代码所有的编程语言
                        language = elClass.substring(6, elClass.indexOf(';'));
                    code.className = 'language-' + language;
                    code.innerHTML = html;
                    $el.html(code);
                });
                $(container).html(parent.innerHTML);
                // 最后，调用 Prism 的方法来高亮代码
                Prism.highlightAll();
            }
        }
    }
</script>

<style scoped lang="scss">
    .contentBox {
        width: 86%;
        margin: 0 auto;
        .title {
            text-align: center;
        }
    }

</style>

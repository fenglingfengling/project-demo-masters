<template>
  <div>
    <!-- <div contenteditable="true">哈哈</div>
    document.execCommand('')
    1. 刚开始第三方的tinyMce, wangEditor
    2. 开源的定制 state.js 
    3. 由专门的编辑器开发团队,自己定制吧,非常复杂,word在线版计算位置,定位,样式, 实现一个简单的浏览器工作量差不多的 
    4. 我们用marked做更高阶的定制
    -->
    <div class="write-btn">
      <el-button @click="submit" type="primary">提交</el-button>
    </div>
    <el-row>
      <el-col :span="12">
        <!-- markdown编辑器的基本操作 -->
        <textarea
          ref="editor"
          class="md-editor"
          :value="content"
          @input="update"
        ></textarea>
      </el-col>
      <el-col :span="12">
        <div class="markdown-body" v-html="compiledContent"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import marked from "marked"
import loadsh from "lodash"
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/monokai-sublime.css'
export default {
  data() {
    return {
      content: `# 开课吧
* 上课
* 吃饭
* 写代码  
\`\`\`javascript
    let a = 2;
    for(var i=0;i<10;i++){console.log(i);}
    console.log(a);
\`\`\`
                `,
    };
  },
  mounted() {
    timer: null;
    this.bindEvents();
    marked.setOptions({
        rendered: new marked.Renderer(),
        highlight(code){
            return hljs.highlightAuto(code).value
        }
    })
  },
  computed: {
    compiledContent() {
      return marked(this.content, {});
    },
  },
  methods: {
    bindEvents() {
      this.$refs.editor.addEventListener("paste", async (e) => {
        const files = e.clipboardData.files;
        // 直接上传
        console.log(files);
      });
      this.$refs.editor.addEventListener("drop", async (e) => {
        const files = e.dataTransfer.files;
        console.log(files);
        // @todo文件上传
        e.preventDefault();
      });
    },
    //  update:_.debounce(function(e){
    //      this.content = e.target.value;
    //  },300),
    update(e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.content = e.target.value;
      }, 350);
    },
    async submit() {
      // 文章列表,点赞,关注,草稿
      // user=>aticle 一对多
      let ret = await this.$http.post('/article/create',{
        content:this.content,// selected:false
        compiledContent:this.compiledContent // 显示只读取两个
      })
    },
  },
};
</script>
<style scoped>
.md-editor {
  width: 100%;
  height: 100vh;
  outline: none;
}
.write-btn {
  position: fixed;
  z-index: 100;
  right: 30px;
  top: 10px;
}
</style>
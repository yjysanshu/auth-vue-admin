<template>
  <div class="json-editor">
    <textarea ref="textarea"></textarea>
  </div>
</template>


<script>
  import CodeMirror from 'codemirror'
  import 'codemirror/addon/lint/lint.css'
  import 'codemirror/lib/codemirror.css'
  // import 'codemirror/theme/rubyblue.css'
  // import 'codemirror/theme/solarized.css'
  import 'codemirror/theme/mdn-like.css'
  // import 'codemirror/theme/eclipse.css'
  // import 'codemirror/theme/erlang-dark.css'
  // import 'codemirror/theme/idea.css'
  // import 'codemirror/theme/duotone-light.css'
  require('script-loader!jsonlint')
  import 'codemirror/mode/javascript/javascript'
  import 'codemirror/addon/lint/lint'
  import 'codemirror/addon/lint/json-lint'

  export default {
    name: 'jsonEditor',
    props: ['value'],
    data() {
      return {
        jsonEditor: false
      }
    },
    watch: {
      value(value) {
        const editorValue = this.jsonEditor.getValue();
        if (value !== editorValue) {
          this.jsonEditor.setValue(JSON.stringify(this.value, null, 2));
        }
      }
    },
    mounted() {
      this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
        // json 高亮显示
        mode: 'application/json',
        // 显示行号
        lineNumbers: true,
        // 括号匹配
        matchBrackets: true,
        // // 全屏模式
        // fullScreen: true,
        gutters: ['CodeMirror-lint-markers'],
        foldGutter: true,
        // 设置主题
        theme: 'mdn-like', //'duotone-light', //'idea', //'erlang-dark', //'eclipse', //'mdn-like',  //'solarized',  //rubyblue
        lint: true
      });

      this.jsonEditor.setValue(JSON.stringify(this.value, null, 2));
      this.jsonEditor.on('change', cm => {
        this.$emit('changed', cm.getValue())
        this.$emit('input', cm.getValue())
      })
    },
    methods: {
      getValue() {
        return this.jsonEditor.getValue()
      }
    }
  }
</script>

<style>
  .CodeMirror {
    height: 100%;
  }

  .json-editor .cm-s-rubyblue span.cm-string {
    color: #F08047;
  }
</style>

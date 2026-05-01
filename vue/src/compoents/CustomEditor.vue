<template>
  <div class="custom-editor">
    <div class="editor-toolbar">
      <button type="button" class="toolbar-btn" @click="execCommand('bold')" title="粗体 (Ctrl+B)">
        <strong>B</strong>
      </button>
      <button type="button" class="toolbar-btn" @click="execCommand('italic')" title="斜体 (Ctrl+I)">
        <em>I</em>
      </button>
      <button type="button" class="toolbar-btn" @click="execCommand('underline')" title="下划线 (Ctrl+U)">
        <u>U</u>
      </button>
      <span class="toolbar-sep"></span>
      <button type="button" class="toolbar-btn" @click="execCommand('justifyLeft')" title="左对齐">
        ⬅
      </button>
      <button type="button" class="toolbar-btn" @click="execCommand('justifyCenter')" title="居中对齐">
        ⬌
      </button>
      <button type="button" class="toolbar-btn" @click="execCommand('justifyRight')" title="右对齐">
        ➡
      </button>
      <span class="toolbar-sep"></span>
      <button type="button" class="toolbar-btn" @click="execCommand('insertUnorderedList')" title="无序列表">
        • 列表
      </button>
      <button type="button" class="toolbar-btn" @click="execCommand('insertOrderedList')" title="有序列表">
        1. 列表
      </button>
      <span class="toolbar-sep"></span>
      <select class="toolbar-select" @change="applyFormat">
        <option value="">段落格式</option>
        <option value="h1">标题 1</option>
        <option value="h2">标题 2</option>
        <option value="h3">标题 3</option>
        <option value="p">正文</option>
      </select>
      <select class="toolbar-select" @change="applySize">
        <option value="">字号</option>
        <option value="1">小</option>
        <option value="3">中</option>
        <option value="5">大</option>
        <option value="7">特大</option>
      </select>
    </div>
    <div 
      ref="editorArea"
      class="editor-area"
      contenteditable="true"
      @input="onContentChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
      data-placeholder="请在此输入文章内容..."
    ></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CustomEditor',
  data() {
    return {
      isFocused: false
    };
  },
  methods: {
    execCommand(command: string) {
      document.execCommand(command, false, null);
      const editor = this.$refs.editorArea as HTMLElement;
      if (editor) {
        editor.focus();
      }
    },
    applyFormat(event: Event) {
      const target = event.target as HTMLSelectElement;
      const value = target.value;
      if (value) {
        document.execCommand('formatBlock', false, value);
        const editor = this.$refs.editorArea as HTMLElement;
        if (editor) {
          editor.focus();
        }
      }
      target.value = '';
    },
    applySize(event: Event) {
      const target = event.target as HTMLSelectElement;
      const value = target.value;
      if (value) {
        document.execCommand('fontSize', false, value);
        const editor = this.$refs.editorArea as HTMLElement;
        if (editor) {
          editor.focus();
        }
      }
      target.value = '';
    },
    onContentChange() {
      this.$emit('input', this.getHtml());
    },
    getHtml(): string {
      const editor = this.$refs.editorArea as HTMLElement;
      return editor ? editor.innerHTML : '';
    },
    getText(): string {
      const editor = this.$refs.editorArea as HTMLElement;
      return editor ? editor.innerText : '';
    },
    setHtml(html: string) {
      const editor = this.$refs.editorArea as HTMLElement;
      if (editor) {
        editor.innerHTML = html;
      }
    },
    setText(text: string) {
      const editor = this.$refs.editorArea as HTMLElement;
      if (editor) {
        editor.innerText = text;
      }
    },
    clear() {
      this.setHtml('');
    }
  }
});
</script>

<style scoped>
.custom-editor {
  width: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
}
.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 8px 12px;
  background: #f5f7fa;
  border-bottom: 1px solid #dcdfe6;
  gap: 4px;
}
.toolbar-btn {
  min-width: 36px;
  height: 30px;
  padding: 0 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  color: #606266;
}
.toolbar-btn:hover {
  background: #ecf5ff;
  border-color: #409eff;
  color: #409eff;
}
.toolbar-btn:active {
  background: #409eff;
  color: #fff;
}
.toolbar-btn strong,
.toolbar-btn em,
.toolbar-btn u {
  font-size: 14px;
}
.toolbar-sep {
  width: 1px;
  height: 20px;
  background: #dcdfe6;
  margin: 0 4px;
}
.toolbar-select {
  height: 30px;
  padding: 0 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 13px;
  color: #606266;
  min-width: 90px;
}
.toolbar-select:hover {
  border-color: #409eff;
}
.toolbar-select:focus {
  outline: none;
  border-color: #409eff;
}
.editor-area {
  min-height: 420px;
  padding: 16px 20px;
  font-size: 15px;
  line-height: 1.8;
  color: #303133;
  outline: none;
  background: #fff;
  word-wrap: break-word;
  word-break: break-all;
}
.editor-area:focus {
  background: #fafafa;
}
.editor-area:empty:before {
  content: attr(data-placeholder);
  color: #909399;
  pointer-events: none;
}
.editor-area h1 {
  font-size: 28px;
  font-weight: bold;
  margin: 20px 0 12px;
  color: #303133;
}
.editor-area h2 {
  font-size: 24px;
  font-weight: bold;
  margin: 16px 0 10px;
  color: #303133;
}
.editor-area h3 {
  font-size: 20px;
  font-weight: bold;
  margin: 14px 0 8px;
  color: #303133;
}
.editor-area p {
  margin: 10px 0;
}
.editor-area ul,
.editor-area ol {
  margin: 10px 0;
  padding-left: 28px;
}
.editor-area li {
  margin: 6px 0;
}
.editor-area strong {
  font-weight: bold;
}
.editor-area em {
  font-style: italic;
}
.editor-area u {
  text-decoration: underline;
}
.editor-area blockquote {
  margin: 12px 0;
  padding: 10px 16px;
  background: #f4f4f5;
  border-left: 4px solid #409eff;
  color: #606266;
}
.editor-area pre {
  margin: 12px 0;
  padding: 12px 16px;
  background: #1e1e1e;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  color: #dcdcdc;
}
.editor-area code {
  background: #f4f4f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  color: #e96900;
}
.editor-area pre code {
  background: transparent;
  padding: 0;
  color: #dcdcdc;
}
.editor-area a {
  color: #409eff;
  text-decoration: underline;
}
.editor-area img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}
.editor-area table {
  border-collapse: collapse;
  width: 100%;
  margin: 12px 0;
}
.editor-area th,
.editor-area td {
  border: 1px solid #dcdfe6;
  padding: 8px 12px;
  text-align: left;
}
.editor-area th {
  background: #f5f7fa;
  font-weight: bold;
}
.editor-area hr {
  border: none;
  border-top: 1px solid #dcdfe6;
  margin: 16px 0;
}
</style>

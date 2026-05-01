<template>
  <div class="editor_con">
    <div class="editor_toolbar">
      <button type="button" class="toolbar_btn" @click="execCommand('bold')" title="粗体">
        <strong>B</strong>
      </button>
      <button type="button" class="toolbar_btn" @click="execCommand('italic')" title="斜体">
        <em>I</em>
      </button>
      <button type="button" class="toolbar_btn" @click="execCommand('underline')" title="下划线">
        <u>U</u>
      </button>
      <span class="toolbar_separator"></span>
      <button type="button" class="toolbar_btn" @click="execCommand('justifyLeft')" title="左对齐">
        ◀
      </button>
      <button type="button" class="toolbar_btn" @click="execCommand('justifyCenter')" title="居中">
        ▶◀
      </button>
      <button type="button" class="toolbar_btn" @click="execCommand('justifyRight')" title="右对齐">
        ▶
      </button>
      <span class="toolbar_separator"></span>
      <button type="button" class="toolbar_btn" @click="execCommand('insertUnorderedList')" title="无序列表">
        •
      </button>
      <button type="button" class="toolbar_btn" @click="execCommand('insertOrderedList')" title="有序列表">
        1.
      </button>
      <span class="toolbar_separator"></span>
      <select class="toolbar_select" @change="formatBlock">
        <option value="">格式</option>
        <option value="h1">标题1</option>
        <option value="h2">标题2</option>
        <option value="h3">标题3</option>
        <option value="p">正文</option>
      </select>
      <select class="toolbar_select" @change="applyFontSize">
        <option value="">字号</option>
        <option value="1">小</option>
        <option value="3">中</option>
        <option value="5">大</option>
        <option value="7">特大</option>
      </select>
    </div>
    <div 
      ref="editorRef"
      class="editor_content"
      contenteditable="true"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      placeholder="请输入文章内容..."
    ></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TinyEditor",
  data() {
    return {
      isFocused: false
    };
  },
  methods: {
    execCommand(command: string) {
      document.execCommand(command, false, null);
      this.$refs.editorRef?.focus();
    },
    formatBlock(event: Event) {
      const target = event.target as HTMLSelectElement;
      const value = target.value;
      if (value) {
        document.execCommand('formatBlock', false, value);
        this.$refs.editorRef?.focus();
      }
      target.value = '';
    },
    applyFontSize(event: Event) {
      const target = event.target as HTMLSelectElement;
      const value = target.value;
      if (value) {
        document.execCommand('fontSize', false, value);
        this.$refs.editorRef?.focus();
      }
      target.value = '';
    },
    onInput() {
      this.$emit('input', this.getContent());
    },
    onFocus() {
      this.isFocused = true;
    },
    onBlur() {
      this.isFocused = false;
    },
    getContent(): string {
      const editor = this.$refs.editorRef as HTMLElement;
      return editor ? editor.innerHTML : '';
    },
    setContent(value: string) {
      const editor = this.$refs.editorRef as HTMLElement;
      if (editor) {
        editor.innerHTML = value;
      }
    }
  }
});
</script>

<style scoped>
.editor_con {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}
.editor_toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 8px;
  background: #f5f5f5;
  border-bottom: 1px solid #ccc;
}
.toolbar_btn {
  min-width: 32px;
  height: 28px;
  margin: 2px;
  padding: 0 8px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
}
.toolbar_btn:hover {
  background: #e8e8e8;
  border-color: #ff5f5f;
}
.toolbar_btn strong,
.toolbar_btn em,
.toolbar_btn u {
  font-size: 14px;
}
.toolbar_separator {
  width: 1px;
  height: 24px;
  background: #ccc;
  margin: 0 8px;
}
.toolbar_select {
  height: 28px;
  margin: 2px;
  padding: 0 8px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background: #fff;
  cursor: pointer;
  font-size: 13px;
  color: #666;
}
.toolbar_select:hover {
  border-color: #ff5f5f;
}
.editor_content {
  min-height: 450px;
  padding: 15px;
  font-size: 14px;
  line-height: 1.8;
  color: #333;
  outline: none;
  background: #fff;
}
.editor_content:focus {
  background: #fffefc;
}
.editor_content:empty:before {
  content: attr(placeholder);
  color: #999;
  pointer-events: none;
}
.editor_content h1 {
  font-size: 28px;
  font-weight: bold;
  margin: 16px 0;
}
.editor_content h2 {
  font-size: 24px;
  font-weight: bold;
  margin: 14px 0;
}
.editor_content h3 {
  font-size: 20px;
  font-weight: bold;
  margin: 12px 0;
}
.editor_content p {
  margin: 10px 0;
}
.editor_content ul,
.editor_content ol {
  margin: 10px 0;
  padding-left: 30px;
}
.editor_content li {
  margin: 5px 0;
}
.editor_content strong {
  font-weight: bold;
}
.editor_content em {
  font-style: italic;
}
.editor_content u {
  text-decoration: underline;
}
</style>

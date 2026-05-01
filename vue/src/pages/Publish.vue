<template>
  <div class="publish">
    <!-- 调试标识：代码已更新 - 2026-05-01 -->
    <div style="background: #ff5f5f; color: white; padding: 10px; margin-bottom: 10px; font-weight: bold;">
      ⚠️ 代码已更新：使用新的 CustomEditor 编辑器
    </div>
    <ContentManage :tabs="tabs" extSoltName="extInfo" :changeHeaderTab="changeHeaderTab">
      <div slot="extInfo">
        <div class="type_info">
          今日发布数量:&nbsp;&nbsp;
          <span class="marginR5 theme_color">{{todayPublishCount}}</span>/6
          <span class="theme_color">发文规范</span>
        </div>
      </div>
      <div slot="publish_article">
        <div class="publish_article">
          <Toast v-if="showToast">{{toastMessage}}</Toast>
          <div class="title_con">
            <input 
              type="text" 
              class="title_txt" 
              v-model="articleTitle"
              placeholder="请输入标题，为了更好的展示效果，建议标题字数在30个汉字以内" 
              @input="updateTitleCount"
            />
            <div class="txt_num_ts">
              <span :class="titleLength > 30 ? 'error_color' : 'theme_color'" class="marginR5">{{titleLength}}</span>/30
            </div>
          </div>
          <div class="html_editor">
            <Editor ref="editorRef" />
          </div>
          <div class="article_type">
            <div class="flex_label">分类:</div>
            <div class="flex_content">
              <select v-model="category1" class="select">
                <option value="01">汽车资讯</option>
                <option value="02">新车评测</option>
                <option value="03">用车技巧</option>
                <option value="04">行业动态</option>
              </select>
              <select v-model="category2" class="select">
                <option value="01">国产</option>
                <option value="02">合资</option>
                <option value="03">进口</option>
                <option value="04">新能源</option>
              </select>
            </div>
          </div>
          <div class="article_img">
            <div class="flex_label">封面:</div>
            <div class="flex_content">
              <div class="img_con">
                <img :src="coverImg" alt="封面图片" />
              </div>
              <input 
                class="file_upload" 
                type="file" 
                name="img_upload" 
                id="img_upload" 
                accept="image/*"
                @change="handleImageUpload"
              />
              <button class="upload_btn" @click="uploadImg">上传图片</button>
              <span class="upload_text">图片尺寸建议：800*400 图片大小不超过1MB</span>
            </div>
          </div>
          <div class="btns">
            <div class="flex_label">&nbsp;</div>
            <div class="flex_content">
              <div class="publish_btn send" @click="publishArticle">发布</div>
              <div class="publish_btn drash" @click="saveDraft">保存草稿</div>
            </div>
          </div>
        </div>
      </div>
      <div slot="publish_imgs">
        <div class="public_imgs">
          <Toast>标题字数需在11字到30字之间。</Toast>
          <div class="cloumn">
            <div class="flex_label">标题</div>
            <div class="flex_content">
              <div class="txt_con">
                <input type="text" class="title_txt" placeholder="请输入标题，为了更好的展示效果，建议标题字数在30个汉字以内" />
                <div class="txt_num_ts">
                  <span class="theme_color marginR5">0</span>/30
                </div>
              </div>
            </div>
          </div>
          <div class="cloumn">
            <div class="flex_label">描述</div>
            <div class="flex_content">
              <div class="txt_con">
                <input type="text" class="title_txt" placeholder="请输入描述，统一描述" />
                <div class="txt_num_ts">
                  <span class="theme_color marginR5">0</span>/30
                </div>
              </div>
            </div>
          </div>
          <div class="article_img">
            <div class="flex_label">封面</div>
            <div class="flex_content">
              <div class="img_con">
                <img :src="galleryCoverImg" alt />
              </div>
              <input class="file_upload" type="file" name="img_upload" id="img_upload" />
              <button class="upload_btn" @click="uploadImg">上传图片</button>
              <span class="upload_text">图片尺寸建议：800*400 图片大小不超过1MB</span>
            </div>
          </div>
          <div class="btns">
            <div class="flex_label">&nbsp;</div>
            <div class="flex_content">
              <div class="publish_btn send" @click="publishGallery">发布</div>
              <div class="publish_btn drash" @click="saveGalleryDraft">保存草稿</div>
            </div>
          </div>
        </div>
      </div>
    </ContentManage>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Editor from "../compoents/CustomEditor.vue";
import { ITab } from "../store/Itype";
import ContentManage from "../compoents/ContentManage.vue";
import Toast from "../compoents/Toast.vue";
import { createArticle, getPublishedArticles } from "../store/articleStore";

export default Vue.extend({
  data() {
    console.log("===== Publish.vue 已加载 - 使用 CustomEditor =====");
    let publish_article: ITab = {
      name: "发布文章",
      isActive: true,
      slotName: "publish_article"
    };

    let publish_imgs: ITab = {
      name: "发布图集",
      isActive: false,
      slotName: "publish_imgs"
    };
    return {
      tabs: {
        publish_article,
        publish_imgs
      },
      articleTitle: "",
      titleLength: 0,
      category1: "01",
      category2: "01",
      coverImg: "../images/noimg.gif",
      galleryCoverImg: "../images/noimg.gif",
      showToast: false,
      toastMessage: "",
      todayPublishCount: 0
    };
  },
  components: {
    Editor,
    ContentManage,
    Toast
  },
  mounted() {
    this.updateTodayCount();
  },
  methods: {
    updateTodayCount() {
      const today = new Date().toDateString();
      const articles = getPublishedArticles();
      this.todayPublishCount = articles.filter(a => {
        const publishDate = new Date(a.publishTime).toDateString();
        return publishDate === today;
      }).length;
    },
    updateTitleCount() {
      this.titleLength = this.articleTitle.length;
    },
    changeHeaderTab(keyName) {
      for (let key in this.tabs) {
        if (key != keyName) {
          let info = this.tabs[key];
          info.isActive = false;
        } else {
          this.tabs[keyName].isActive = true;
        }
      }
    },
    uploadImg() {
      document.getElementById("img_upload")?.click();
    },
    handleImageUpload(event: Event) {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        if (file.size > 1024 * 1024) {
          this.showToastMessage("图片大小不能超过1MB");
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          this.coverImg = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    },
    showToastMessage(message: string) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },
    validateForm(): boolean {
      if (!this.articleTitle || this.articleTitle.trim() === "") {
        this.showToastMessage("请输入文章标题");
        return false;
      }
      if (this.articleTitle.length < 11) {
        this.showToastMessage("标题字数需在11字到30字之间");
        return false;
      }
      if (this.articleTitle.length > 30) {
        this.showToastMessage("标题不能超过30字");
        return false;
      }
      const editorContent = (this.$refs.editorRef as any)?.getHtml?.() || (this.$refs.editorRef as any)?.getText?.() || "";
      if (!editorContent || editorContent.trim() === "") {
        this.showToastMessage("请输入文章内容");
        return false;
      }
      return true;
    },
    publishArticle() {
      if (!this.validateForm()) {
        return;
      }
      if (this.todayPublishCount >= 6) {
        this.showToastMessage("今日发布数量已达上限(6篇)");
        return;
      }
      const editorContent = (this.$refs.editorRef as any)?.getHtml?.() || (this.$refs.editorRef as any)?.getText?.() || "";
      createArticle(
        this.articleTitle,
        editorContent,
        this.coverImg,
        this.category1,
        this.category2,
        'published'
      );
      this.showToastMessage("发布成功！");
      this.updateTodayCount();
      this.resetForm();
    },
    saveDraft() {
      if (!this.articleTitle || this.articleTitle.trim() === "") {
        this.showToastMessage("请输入文章标题");
        return;
      }
      const editorContent = (this.$refs.editorRef as any)?.getHtml?.() || (this.$refs.editorRef as any)?.getText?.() || "";
      createArticle(
        this.articleTitle,
        editorContent,
        this.coverImg,
        this.category1,
        this.category2,
        'draft'
      );
      this.showToastMessage("草稿已保存！");
    },
    publishGallery() {
      this.showToastMessage("图集发布功能开发中...");
    },
    saveGalleryDraft() {
      this.showToastMessage("图集草稿保存功能开发中...");
    },
    resetForm() {
      this.articleTitle = "";
      this.titleLength = 0;
      this.category1 = "01";
      this.category2 = "01";
      this.coverImg = "../images/noimg.gif";
      if (this.$refs.editorRef) {
        const editor = this.$refs.editorRef as any;
        if (editor.clear) {
          editor.clear();
        } else if (editor.setHtml) {
          editor.setHtml("");
        }
      }
    }
  }
});
</script>

<style scoped>
.type_cons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #d0d0d0;
}
.type_info {
  color: #999;
}
.type_ul {
  height: 45px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.type_ul li {
  list-style: none;
  display: inline-block;
  height: 47px;
  line-height: 47px;
  padding: 0px 30px;
  font-size: 16px;
  color: #666;
  z-index: 2;
  cursor: pointer;
}
.title_con {
  width: 100%;
  margin-top: 15px;
  position: relative;
}
.txt_con {
  width: 100%;
  position: relative;
}
.title_txt {
  width: 100%;
  height: 38px;
  border: 1px solid #ccc;
  outline: none;
  padding-left: 20px;
  box-sizing: border-box;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: all 0.5s;
}
.title_txt:focus {
  border-color: #ff5f5f;
}
.txt_num_ts {
  position: absolute;
  right: 5px;
  top: 0px;
  height: 38px;
  line-height: 38px;
  color: #999;
}
.error_color {
  color: #ff0000;
}
.type_active {
  border-bottom: 2px solid #ff5f5f;
}
.contents {
  margin-top: 20px;
}
.html_editor {
  margin-top: 20px;
  width: 100%;
  height: 500px;
}
.article_type {
  height: 35px;
  line-height: 35px;
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.flex_label {
  flex: 1;
  color: #666;
  font-size: 16px;
  padding-left: 20px;
}
.flex_content {
  flex: 9;
}
.article_select {
  width: 115px;
  height: 35px;
  border: 1px solid #d0d0d0;
  margin-right: 10px;
  border-radius: 5px;
}
.article_img {
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.img_con {
  width: 200px;
  height: 152px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  overflow: hidden;
}
.img_con img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.file_upload {
  position: absolute;
  top: -100px;
}
.upload_btn {
  margin-top: 20px;
  width: 75px;
  height: 30px;
  color: #666;
  background: rgb(240, 240, 240);
  border: 1px solid #d0d0d0;
  border-radius: 3px;
  outline: none;
  font-size: 12px;
  box-shadow: 2px 1px 1px #888888;
  cursor: pointer;
}
.upload_text {
  color: #999;
  margin-left: 10px;
}
.btns {
  margin-top: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.publish_btn {
  width: 140px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ff5f5f;
  text-align: center;
  line-height: 30px;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s;
}
.publish_btn:hover {
  opacity: 0.8;
}
.send {
  background: #ff5f5f;
  color: white;
  margin-right: 30px;
}
.drash {
  background: white;
  color: #ff5f5f;
}
.cloumn {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
}
</style>

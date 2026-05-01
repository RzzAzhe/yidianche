<template>
  <div class="article_manage">
    <ContentManage :tabs="tabs">
      <div slot="content_manage">
        <div class="content_search">
          <div class="search_types">
            <select v-model="searchType" class="search_select">
              <option value>全部类型</option>
              <option value="published">已发布</option>
              <option value="draft">草稿</option>
            </select>
            <select v-model="searchStatus" class="search_select">
              <option value>全部状态</option>
              <option value="true">已通过</option>
              <option value="false">未通过</option>
            </select>
          </div>
          <div class="search_txt">
            <input type="text" v-model="searchKeyword" placeholder="请输入关键词搜索" />
            <button @click="doSearch">搜索</button>
          </div>
        </div>
        <div class="total_count_info pdl20 mgt40">
          共
          <span class="theme_color">{{totalCount}}</span>条内容
        </div>

        <div class="articleList mgt40">
          <ArticleItem 
            v-for="item in currentArticles" 
            :content="item" 
            :key="item.id"
          ></ArticleItem>
          <div v-if="currentArticles.length === 0" class="empty_tip">
            暂无内容
          </div>
        </div>
        <div class="pagion mgt40" v-if="totalCount > 0">
          <Pagin 
            :currentPage="currentPage"
            :pageSize="pageSize"
            :totalCount="totalCount"
            @page-change="handlePageChange"
          ></Pagin>
        </div>
        <div class="ads mgt40">
          <SwiperAds :adImgs="adImgs" />
        </div>
      </div>
    </ContentManage>
    <div style="display:none">
      <img src="../images/ad1.jpg" alt />
      <img src="../images/ad2.jpg" alt />
      <img src="../images/ad3.jpg" alt />
      <img src="../images/img-ad1.jpg" alt />
      <img src="../images/img-ad2.jpg" alt />
      <img src="../images/img-ad3.jpg" alt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ITab, IArticleItem } from "../store/Itype";
import ContentManage from "../compoents/ContentManage.vue";
import ArticleItem from "../compoents/ArticleItem.vue";
import Pagin from "../compoents/Pagin.vue";
import SwiperAds from "../compoents/SwiperAds.vue";
import { getArticles, getArticlesByPage } from "../store/articleStore";

export default Vue.extend({
  data() {
    let contentManage: ITab = {
      name: "内容管理",
      isActive: true,
      slotName: "content_manage"
    };
    
    return {
      tabs: {
        contentManage
      },
      articles: [] as IArticleItem[],
      filteredArticles: [] as IArticleItem[],
      currentPage: 1,
      pageSize: 10,
      searchType: "",
      searchStatus: "",
      searchKeyword: "",
      adImgs: ["../images/ad1.jpg", "../images/ad2.jpg", "../images/ad3.jpg"]
    };
  },
  computed: {
    totalCount(): number {
      return this.filteredArticles.length;
    },
    currentArticles(): IArticleItem[] {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredArticles.slice(startIndex, endIndex);
    }
  },
  mounted() {
    this.loadArticles();
  },
  methods: {
    loadArticles() {
      this.articles = getArticles();
      this.applyFilters();
    },
    applyFilters() {
      let result = [...this.articles];
      
      if (this.searchType === 'published') {
        result = result.filter(a => a.status === 'published');
      } else if (this.searchType === 'draft') {
        result = result.filter(a => a.status === 'draft');
      }
      
      if (this.searchStatus === 'true') {
        result = result.filter(a => a.isPass === true);
      } else if (this.searchStatus === 'false') {
        result = result.filter(a => a.isPass === false);
      }
      
      if (this.searchKeyword && this.searchKeyword.trim() !== '') {
        const keyword = this.searchKeyword.trim().toLowerCase();
        result = result.filter(a => 
          a.title.toLowerCase().includes(keyword)
        );
      }
      
      this.filteredArticles = result;
      this.currentPage = 1;
    },
    doSearch() {
      this.applyFilters();
    },
    handlePageChange(page: number) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  components: {
    ContentManage,
    ArticleItem,
    Pagin,
    SwiperAds
  }
});
</script>

<style scoped>
.article_manage {
  color: #666;
}
.content_search {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search_types {
  flex: 2;
}

.search_txt {
  text-align: right;
  flex: 3.5;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.search_txt > input {
  width: 70%;
  height: 40px;
  color: #666;
  outline: none;
  padding-left: 20px;
  box-sizing: border-box;
  border: 1px solid #d0d0d0;
}
.search_txt > input:focus {
  border-color: #ff5f5f;
}
.search_txt > button {
  width: 80px;
  height: 40px;
  outline: none;
  font-size: 16px;
  background: #f4f4f4 !important;
  border: 1px solid #ddd;
  border-left-width: 0px;
  cursor: pointer;
  transition: all 0.3s;
}
.search_txt > button:hover {
  background: #ff5f5f !important;
  color: white;
  border-color: #ff5f5f;
}
.search_select {
  width: 150px;
  height: 40px;
  border: 1px solid #d0d0d0;
  margin-right: 10px;
  color: #666;
  padding: 0 10px;
  cursor: pointer;
}
.search_select:focus {
  border-color: #ff5f5f;
}
.empty_tip {
  text-align: center;
  padding: 60px 0;
  color: #999;
  font-size: 16px;
}
</style>

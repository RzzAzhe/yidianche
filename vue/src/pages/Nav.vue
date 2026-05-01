<template>
  <div>
    <Header />
    <div class="main">
      <div class="main_menu">
        <Menu></Menu>
      </div>
      <div class="main_content">
        <router-view></router-view>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "../compoents/Header.vue";
import Menu from "../compoents/Menu.vue";
import Footer from "../compoents/Footer.vue";
import HomeRouter from "../routers/homeRouter";
export default Vue.extend({
  name: "Nav",
  components: {
    Header,
    Menu,
    Footer
  },
  router: HomeRouter,
  mounted() {
    console.log("===== 代码已更新 - Nav.vue 已加载 =====");
    console.log("布局设置：导航栏宽度240px，内容区flex:1自动拉伸");
  }
});
</script>
<style scoped>
.main {
  width: 100%;
  min-height: calc(100vh - 70px - 60px);
  display: flex;
  margin-top: 0;
}
.main::-webkit-scrollbar{
  display: none;
}
.main_menu {
  width: 240px;
  min-width: 240px;
  background: #f4f4f4;
}
.main_content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>



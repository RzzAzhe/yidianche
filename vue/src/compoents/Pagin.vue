<template>
  <div class="pagion flexCenter">
    <div class="pagion_left flexCenter">
      <div 
        :class="['pagin_btn', { disabled: currentPage <= 1 }]" 
        @click="goPrevPage"
      >上一页</div>
      <template v-for="page in displayPages" :key="page">
        <div 
          v-if="page === '...'"
          class="pagin_ellipsis"
        >...</div>
        <div 
          v-else
          :class="['pagin_pgindex', { active: page === currentPage }]"
          @click="goToPage(page)"
        >{{page}}</div>
      </template>
      <div 
        :class="['pagin_btn', { disabled: currentPage >= totalPages }]" 
        @click="goNextPage"
      >下一页</div>
    </div>
    <div class="pagion_right flexCenter" v-if="totalPages > 1">
      <span class="pagin_text">第</span>
      <input 
        class="pagin_txt" 
        type="number" 
        v-model.number="jumpPage"
        @keyup.enter="handleJump"
        min="1"
        :max="totalPages"
      />
      <span class="pagin_text">页</span>
      <div class="pagin_btn" @click="handleJump">跳转</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Pagin",
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    totalCount: {
      type: Number,
      default: 0
    },
    onPageChange: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      jumpPage: 1
    };
  },
  computed: {
    totalPages(): number {
      if (this.totalCount === 0) return 1;
      return Math.ceil(this.totalCount / this.pageSize);
    },
    displayPages(): Array<number | string> {
      const result: Array<number | string> = [];
      const total = this.totalPages;
      const current = this.currentPage;
      
      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          result.push(i);
        }
      } else {
        if (current <= 4) {
          for (let i = 1; i <= 5; i++) {
            result.push(i);
          }
          result.push('...');
          result.push(total);
        } else if (current >= total - 3) {
          result.push(1);
          result.push('...');
          for (let i = total - 4; i <= total; i++) {
            result.push(i);
          }
        } else {
          result.push(1);
          result.push('...');
          for (let i = current - 1; i <= current + 1; i++) {
            result.push(i);
          }
          result.push('...');
          result.push(total);
        }
      }
      return result;
    }
  },
  watch: {
    currentPage: {
      handler(newVal: number) {
        this.jumpPage = newVal;
      },
      immediate: true
    }
  },
  methods: {
    goPrevPage() {
      if (this.currentPage <= 1) return;
      this.goToPage(this.currentPage - 1);
    },
    goNextPage() {
      if (this.currentPage >= this.totalPages) return;
      this.goToPage(this.currentPage + 1);
    },
    goToPage(page: number) {
      if (page < 1 || page > this.totalPages || page === this.currentPage) return;
      this.$emit('page-change', page);
      if (this.$props.onPageChange) {
        this.$props.onPageChange(page);
      }
    },
    handleJump() {
      let page = this.jumpPage;
      if (page < 1) page = 1;
      if (page > this.totalPages) page = this.totalPages;
      this.jumpPage = page;
      this.goToPage(page);
    }
  }
});
</script>

<style scoped>
.pagion {
  width: 100%;
  margin: 25px auto;
}
.pagion_left {
  flex: 3;
}
.pagion_right {
  flex: 2;
}
.pagin_btn {
  width: 65px;
  height: 30px;
  border: 1px solid #d7dde4;
  background: #f2f2f2;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  color: #324050;
  font-size: 14px;
  margin: 5px;
  cursor: pointer;
  transition: all .5s;
  user-select: none;
}
.pagin_btn:hover:not(.disabled) {
  border-color: #ff5f5f;
}
.pagin_btn.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.pagin_ellipsis {
  margin: 5px;
  text-align: center;
  line-height: 30px;
  min-width: 30px;
  color: #666;
}
.pagin_pgindex {
  margin: 5px;
  border-radius: 5px;
  background: #f2f2f2;
  border: 1px solid #d7dde4;
  text-align: center;
  line-height: 30px;
  min-width: 30px;
  cursor: pointer;
  transition: all .3s;
  user-select: none;
}
.pagin_pgindex:hover:not(.active) {
  border-color: #ff5f5f;
}
.pagin_text {
  font-size: 14px;
  display: inline-block;
  margin: 5px;
  color: #324050;
}
.pagin_txt {
  width: 80px;
  height: 30px;
  border: 1px solid #d7dde4;
  border-radius: 5px;
  outline: none;
  padding: 0 10px;
  text-align: center;
  box-sizing: border-box;
}
.pagin_txt:focus {
  border-color: #ff5f5f;
}
.active {
  background: #ff5f5f;
  color: white;
  border-color: #ff5f5f;
}
</style>

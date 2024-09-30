<template>
  <div class="container">
    <h2 id="title">新闻资讯</h2>
    <span id="intro">为您推荐公司及行业的前沿资讯，让您随时了解行业动态</span>
    <div
      class="news-header"
      :style="{
        backgroundImage: `url(${require('@/assets/1.jpeg')})`,
      }"
    ></div>
    <div class="search">
      <el-popover placement="bottom" title="检索结果" width="50%">
        <template #reference>
          <el-input
            v-model="searchText"
            class="w-50 m-2"
            placeholder="请输入新闻关键词"
            :prefix-icon="Search"
            type="search"
            size="large"
            @input="visible = true"
            @blur="visible = false"
          />
        </template>
        <div v-if="searchNewsList.length">
          <div class="search-item" v-for="data in searchNewsList" :key="data._id">
            {{ data.title }}
          </div>
        </div>
        <div v-else></div>
      </el-popover>
    </div>
    <div class="topnews">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in toNewsList" :key="item._id">
          <el-card style="max-width: 480px">
            <template #header>Yummy hamburger</template>
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              style="width: 100%"
            /> </el-card
        ></el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
onMounted(async () => {
  const res = await axios.get('/webapi/news/list');
  newList.value = res.data.data;
});
const searchNewsList = computed(() =>
  searchText.value ? newList.value.filter((item) => item.title.includes(searchText.value)) : [],
);
const toNewsList = computed(() => newList.value.slice(0, 4));
const newList = ref([]);
const visible = ref(false);
const searchText = ref('');
</script>
<style lang="scss" scoped>
.container {
  position: relative;
}
.news-header {
  width: 100%;
  height: 400px;
  background-size: cover;
}
#title {
  position: absolute;
  top: 100px;
  width: 100%;
  text-align: center;
  font-size: 40px;
  color: white;
  font-weight: bold;
}
#intro {
  position: absolute;
  top: 190px;
  width: 100%;
  text-align: center;
  font-size: 30px;
  color: white;
  font-weight: bold;
}

.search {
  position: absolute;
  top: 300px;
  width: 100%;
  text-align: center;
  .el-input {
    width: 50%;
  }
}
.search-item {
  height: 50px;
  line-height: 50px;
  &:hover {
    background-color: white;
    color: red;
  }
}
.topnews {
  margin-top: 20px;
}
</style>

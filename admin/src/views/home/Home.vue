<template>
  <el-page-header content="首页" icon="" title="企业门户管理系统" />
  <el-card class="box-card">
    <el-row>
      <el-col :span="4"
        ><el-avatar :size="100" :src="'http://localhost:3000' + avatarUrl"
      /></el-col>
      <el-col :span="20">
        <h3 style="line-height: 100px">
          欢迎{{ store.state.userInfo.username }}回来 ,{{ welcomeText }}
        </h3>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>公司产品</span>
      </div>
    </template>
    <el-carousel :interval="4000" type="card" height="200px" v-if='tableData.length'>
      <el-carousel-item v-for="item in tableData" :key="item._id">
        <div :style="{
          backgroundImage:`url(http://localhost:3000${item.cover})`,
          backgroundSize: 'cover',
        }">
          <h3 text="2xl" justify="center">{{ item.title }}</h3>
        </div>
        
      </el-carousel-item>
    </el-carousel></el-card
  >
</template>

<script setup>
import { computed,onMounted ,ref} from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
onMounted(() => {
  getTableData();
});
const tableData = ref([]);
const getTableData = async () => {
  const res = await axios.get('/adminapi/product/list');
  tableData.value = res.data.data;
  console.log(res.data);
};
const store = useStore();
const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? store.state.userInfo.avatar
    : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
);
const welcomeText = computed(() => (new Date().getHours < 12 ? '要开心每一天' : '死了算了'));
</script>
<style lang="scss" scoped>
.box-card {
  margin-top: 50px;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

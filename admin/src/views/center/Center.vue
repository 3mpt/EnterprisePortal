<template>
  <div>
    <el-page-header content="个人中心" icon="" title="企业门户管理系统" />
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <el-avatar :size="100" :src="avatarUrl" /> 
          <h3>{{ store.state.userInfo.username }}</h3>
          <h3>{{ store.state.userInfo.role===1?'管理员':'编辑' }}</h3>

          </el-card></el-col>
      <el-col :span="16">2</el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { reactive, ref, computed } from 'vue';
const store = useStore();
const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
);
</script>
<style lang="scss" scoped></style>

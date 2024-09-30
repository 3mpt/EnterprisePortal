<template>
  <div class="container">
    <el-carousel height="calc(100vh - 59px)">
      <el-carousel-item :key="1">
        <div :style="{ backgroundImage: `url(${require('@/assets/1.jpeg')})` }"></div>
      </el-carousel-item>
      <el-carousel-item :key="2">
        <div :style="{ backgroundImage: `url(${require('@/assets/2.jpeg')})` }"></div>
      </el-carousel-item>
      <el-carousel-item :key="3">
        <div :style="{ backgroundImage: `url(${require('@/assets/3.jpeg')})` }"></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.el-carousel div {
  width: 100%;
  height: 100%;
  background-size: cover;
}
</style>

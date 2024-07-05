<template>
  <div>home</div>
</template>

<script setup>
import axios from 'axios';

axios.get('/adminapi/user/home').then((res) => {
  console.log(res.data);
});
</script>
<style lang="scss" scoped></style>

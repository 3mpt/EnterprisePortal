<template>
  <div id="div1"></div>
</template>

<script setup>
import { onMounted, defineEmits, h } from 'vue';
import E from 'wangeditor';
const emit = defineEmits(['event']);
onMounted(() => {
  const editor = new E('#div1');
  editor.create();
  editor.config.onchange = (html) => {
    console.log(html);
    emit('event', html);
  };
});
</script>
<style lang="scss" scoped></style>

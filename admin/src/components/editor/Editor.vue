<template>
  <div id="div1"></div>
</template>

<script setup>
import { onMounted, defineEmits, defineProps } from 'vue';
import E from 'wangeditor';
const emit = defineEmits(['event']);
const props = defineProps({
  content: String,
});
onMounted(() => {
  const editor = new E('#div1');
  editor.create();
  props.content && editor.txt.html(props.content);
  editor.config.onchange = (html) => {
    console.log(html);
    emit('event', html);
  };
});
</script>
<style lang="scss" scoped></style>

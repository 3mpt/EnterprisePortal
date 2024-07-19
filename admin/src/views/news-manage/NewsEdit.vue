<template>
  <el-page-header content="编辑新闻" title="新闻管理" @back="handleBack()" />
  <el-form
    ref="newsFormRef"
    :model="newsForm"
    :rules="newsFormRules"
    label-width="auto"
    class="demo-ruleForm"
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model="newsForm.title" />
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <editor @event="handleChange" :content="newsForm.content" v-if="showEditor" />
    </el-form-item>
    <el-form-item label="分类" prop="category">
      <el-select v-model="newsForm.category" placeholder="Select" style="width: 100%">
        <el-option
          v-for="item in categoryOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="封面" prop="cover">
      <Upload :avatar="newsForm.cover" @change="handleCoverChange" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import editor from '@/components/editor/Editor.vue';
import Upload from '@/components/upload/Upload.vue';
import upload from '@/util/upload';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import axios from 'axios';
const router = useRouter();
const route = useRoute();
const newsFormRef = ref(null);
const showEditor = ref(false);
const newsForm = reactive({
  title: '',
  content: '',
  category: 1, // 1 最新动态 2 典型案例 3 通知公告
  cover: '',
  file: null,
  isPublish: 0, // 0 未发布 1 已发布
});
const categoryOptions = [
  {
    label: '最新动态',
    value: 1,
  },
  {
    label: '典型案例',
    value: 2,
  },
  {
    label: '通知公告',
    value: 3,
  },
];
const newsFormRules = reactive({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  category: [{ required: true, message: '请选择分类', trigger: 'blur' }],
  cover: [{ required: true, message: '请上传图片', trigger: 'blur' }],
});
// 每次editor内容改变时触发
const handleChange = (value) => {
  newsForm.content = value;
};

const handleCoverChange = (file) => {
  newsForm.cover = URL.createObjectURL(file);
  newsForm.file = file;
};
const submitForm = () => {
  newsFormRef.value.validate(async (valid) => {
    console.log('valid:', newsForm);

    if (valid) {
      const res = await upload('/adminapi/news/list', newsForm);
      if (res.data.ActionType === 'OK') {
        ElMessage.success('添加成功');
        router.push('/news-manage/newslist');
      }
    }
  });
};
const handleBack = () => {
  router.back();
};
onMounted(async () => {
  console.log(route.params);
  const res = await axios.get(`/adminapi/news/list/${route.params.id}`);
  console.log('res:', res.data.data[0]);
  if(res.data.data.length >0){
    Object.assign(newsForm, res.data.data[0]);
    showEditor.value = true;
  }
  
});
</script>
<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 20px;
}
</style>

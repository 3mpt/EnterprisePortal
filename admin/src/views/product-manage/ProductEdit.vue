<template>
  <el-page-header content="编辑产品" title="产品管理" @back="handleBack()" />
  <el-form
    ref="productFormRef"
    :model="productForm"
    :rules="productFormRules"
    label-width="auto"
    class="demo-ruleForm"
  >
    <el-form-item label="产品名称" prop="title">
      <el-input v-model="productForm.title" />
    </el-form-item>
    <el-form-item label="产品简要描述" prop="introduction">
      <el-input v-model="productForm.introduction" type="textarea" />
    </el-form-item>
    <el-form-item label="产品细节" prop="detail">
      <el-input v-model="productForm.detail" type="textarea" />
    </el-form-item>
    <el-form-item label="产品图片" prop="cover">
      <Upload :avatar="productForm.cover" @change="handleCoverChange" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import Upload from '@/components/upload/Upload.vue';
import upload from '@/util/upload';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import axios from 'axios';
const router = useRouter();
const route = useRoute();
const productFormRef = ref(null);
const showEditor = ref(false);
const productForm = reactive({
  title: '',
  introduction: '',
  detail: '',
  cover: '',
  file: null,
});
const productFormRules = reactive({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  introduction: [{ required: true, message: '请输入产品简要描述', trigger: 'blur' }],
  detail: [{ required: true, message: '请输入产品细节', trigger: 'blur' }],
  cover: [{ required: true, message: '请上传产品图片', trigger: 'blur' }],
});

const handleCoverChange = (file) => {
  productForm.cover = URL.createObjectURL(file);
  productForm.file = file;
};
const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    console.log('valid:', productForm);

    if (valid) {
      const res = await upload('/adminapi/product/list', productForm);
      if (res.data.ActionType === 'OK') {
        ElMessage.success('更新成功');
        router.push('/product-manage/productlist');
      }
    }
  });
};
const handleBack = () => {
  router.back();
};
onMounted(async () => {
  console.log(route.params);
  const res = await axios.get(`/adminapi/product/list/${route.params.id}`);
  console.log('res:', res.data.data[0]);
  if (res.data.data.length > 0) {
    Object.assign(productForm, res.data.data[0]);
    showEditor.value = true;
  }
});
</script>
<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 20px;
}
</style>

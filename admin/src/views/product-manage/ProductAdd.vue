<template>
  <el-page-header content="添加产品" icon="" title="产品管理" />
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
      <el-button type="primary" @click="submitForm()">添加产品</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Upload from '@/components/upload/Upload.vue';
import upload from '@/util/upload';
import router from '@/router';
import { ElMessage } from 'element-plus';
const productFormRef = ref(null);
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
    if (valid) {
      const res = await upload('/adminapi/product/add', productForm);
      if (res.data.ActionType === 'OK') {
        ElMessage.success('添加成功');
        router.push('/product-manage/productlist');
      }
    }
  });
};
</script>
<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 20px;
}
</style>

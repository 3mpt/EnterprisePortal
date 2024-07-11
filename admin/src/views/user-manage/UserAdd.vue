<template>
  <el-page-header content="添加用户" icon="" title="用户管理" />
  <el-form
    ref="userFormRef"
    :model="userForm"
    :rules="userFormRules"
    label-width="auto"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="userForm.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="userForm.password" type="password" />
    </el-form-item>
    <el-form-item label="性别" prop="username">
      <el-select v-model="userForm.gender" placeholder="Select" style="width: 100%">
        <el-option
          v-for="item in genderOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="角色" prop="role">
      <el-select v-model="userForm.role" placeholder="Select" style="width: 100%">
        <el-option
          v-for="item in roleOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="个人简介" prop="introduction">
      <el-input v-model="userForm.introduction" type="textarea" />
    </el-form-item>
    <el-form-item label="上传头像" prop="avatar">
      <Upload :avatar="userForm.avatar" @change="handleAvatarChange" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">添加用户</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Upload from '@/components/upload/Upload.vue';
import upload from '@/util/upload';
import router from '@/router';
import { ElMessage } from 'element-plus';
const userFormRef = ref(null);
const userForm = reactive({
  username: '',
  password: '',
  gender: 0,
  role: 1,
  introduction: '',
  avatar: '',
  file: null,
});
const roleOptions = [
  {
    label: '管理员',
    value: 1,
  },
  {
    label: '编辑',
    value: 2,
  }
];
const genderOptions = [
  {
    label: '保密',
    value: 0,
  },
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
    value: 2,
  },
];
const userFormRules = reactive({
  username: [{ required: true, message: '请输入名字', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'blur' }],
  introduction: [{ required: true, message: '请输入简介', trigger: 'blur' }],
  avatar: [{ required: true, message: '请上传头像', trigger: 'blur' }],
});
const handleAvatarChange = (file) => {
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};
const submitForm = () => {
  console.log(userForm);
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await upload('/adminapi/user/add', userForm);
      if (res.data.ActionType === 'OK') {
        ElMessage.success('添加成功');
        router.push('/user-manage/userlist');

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

<template>
  <div>
    <el-page-header content="个人中心" icon="" title="企业门户管理系统" />
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <el-avatar :size="100" :src="'http://localhost:3000' + avatarUrl" />
          <h3>{{ store.state.userInfo.username }}</h3>
          <h3>{{ store.state.userInfo.role === 1 ? '管理员' : '编辑' }}</h3>
        </el-card></el-col
      >
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
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
            <el-form-item label="性别" prop="username">
              <el-select v-model="userForm.gender" placeholder="Select" style="width: 100%">
                <el-option
                  v-for="item in options"
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
              <el-button type="primary" @click="submitForm()">更新</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { reactive, ref, computed } from 'vue';

import { ElMessage } from 'element-plus';
import Upload from '@/components/upload/Upload.vue';
import upload from '@/util/upload';
const store = useStore();
const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? store.state.userInfo.avatar
    : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
);

const { username, gender, introduction, avatar } = store.state.userInfo;
const userFormRef = ref(null);
const userForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  file: null,
});
const userFormRules = reactive({
  username: [{ required: true, message: '请输入名字', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  introduction: [{ required: true, message: '请输入简介', trigger: 'blur' }],
  avatar: [{ required: true, message: '请上传头像', trigger: 'blur' }],
});
const options = [
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
const handleAvatarChange = (file) => {
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};
const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await upload('/adminapi/user/upload', userForm);
      if (res.data.ActionType === 'OK') {
        store.commit('changeUserInfo', res.data.data);
        ElMessage.success('更新成功');
      }
    }
  });
};
</script>
<style lang="scss" scoped>
.el-row {
  margin-top: 20px;
  .box-card {
    text-align: center;
  }
}
</style>

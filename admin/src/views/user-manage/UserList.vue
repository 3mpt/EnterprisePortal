<template>
  <el-card>
    <el-page-header content="用户列表" icon="" title="用户管理" />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column label="头像">
        <template #default="scope">
          <div v-if="scope.row.avatar">
            <el-avatar :size="50" :src="'http://localhost:3000' + scope.row.avatar"></el-avatar>
          </div>
          <div v-else>
            <el-avatar
              :size="50"
              src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
            ></el-avatar>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="角色">
        <template #default="scope">
          <el-tag v-if="scope.row.role === 1" type="danger" size="small">{{ '管理员' }}</el-tag>
          <el-tag v-else="scope.row.role === 2" type="success" size="small">{{ '编辑' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"> 编辑 </el-button>
          <el-popconfirm
            title="确定删除?"
            confirmButtonText="确定"
            cancel-button-text="取消"
            @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button size="small" type="danger"> 删除 </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="编辑用户" width="500px">
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
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="editFormSubmit"> 提交 </el-button>
        </div>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
const dialogVisible = ref(false);
const tableData = ref([]);
onMounted(() => {
  getTableData();
});
const userFormRef = ref(null);
const userForm = ref({
  username: '',
  password: '',
  gender: 0,
  role: 1,
  introduction: '',
});
const roleOptions = [
  {
    label: '管理员',
    value: 1,
  },
  {
    label: '编辑',
    value: 2,
  },
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
});
const getTableData = async () => {
  const res = await axios.get('/adminapi/user/list');
  tableData.value = res.data.data;
};
const handleEdit = async (data) => {
  const res = await axios.get(`/adminapi/user/list/${data._id}`);
  userForm.value = res.data.data[0];
  dialogVisible.value = true;
};
const handleDelete = async (data) => {
  const res = await axios.delete(`/adminapi/user/list/${data._id}`);
  if (res.data.ActionType === 'OK') {
    ElMessage.success('删除成功');
      }
  getTableData();
};
const editFormSubmit = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await axios.put(`/adminapi/user/list/${userForm.value._id}`, userForm.value);
      if (res.data.ActionType === 'OK') {
        dialogVisible.value = false;
        getTableData();
      }
    }
  });
};
</script>
<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
</style>

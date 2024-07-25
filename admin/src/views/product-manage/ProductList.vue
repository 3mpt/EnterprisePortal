<template>
  <el-page-header content="产品列表" icon="" title="产品管理" />
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="title" label="标题" width="180" />
    <el-table-column prop="introduction" label="简要概述" width="180" />
    <el-table-column label="更新时间" width="180">
      <template #default="scope">
        {{ formatTime.getTime(scope.row.editTime) }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button @click="handleEdit(scope.row)" circle :icon="Edit"> </el-button>
        <el-popconfirm
          title="确定删除?"
          confirmButtonText="确定"
          cancel-button-text="取消"
          @confirm="handleDelete(scope.row)"
        >
          <template #reference>
            <el-button type="danger" circle :icon="Delete"></el-button>
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
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisible" title="预览产品" width="500px">
    <div>
      <h2>{{ previewData.title }}</h2>
      <div style="font-size: 12px; color: gray">{{ formatTime.getTime(previewData.editTime) }}</div>
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <div v-html="previewData.content" class="htmlcontent"></div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import formatTime from '@/util/formatTime';
import axios from 'axios';
import {  Edit, Delete, StarFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
const tableData = ref([]);
const previewData = ref({});
const dialogVisible = ref(false);
const router = useRouter();
onMounted(() => {
  getTableData();
});
const getTableData = async () => {
  const res = await axios.get('/adminapi/product/list');
  tableData.value = res.data.data;
  console.log(res.data);
};
const handleDelete = async (data) => {
  const res = await axios.delete(`/adminapi/product/list/${data._id}`);
  if (res.data.ActionType === 'OK') {
    ElMessage.success('删除成功');
  }
  await getTableData();
};
const handleEdit = async (data) => {
  // 跳转到/product-manage/editproduct/:id
  router.push(`/product-manage/editproduct/${data._id}`);
};
</script>
<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
::v-deep .htmlcontent {
  img {
    max-width: 100%;
  }
}
</style>

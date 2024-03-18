<template>
  <!-- <Navbar></Navbar> -->
  <div class="submissionList">
    <h1><br>用户提交记录列表</br></h1>

    <div class="form-row">

      <div class="form-group">
        <label for="openidInput">OpenID:</label>
        <input id="openidInput" v-model="query.openid" />
      </div>

      <div class="form-group">
        <label for="workCodeInput">作品编号:</label>
        <input id="workCodeInput" v-model="query.workCode" />
      </div>
      <div class="form-group">
        <label for="approvalStatusInput">审核状态:</label>
        <select id="approvalStatusInput" v-model="query.approvalStatus">
          <option value="0">未审核</option>
          <option value="1">审核通过</option>
          <option value="2">审核未通过</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="submissionTimeStartInput">提交时间开始:</label>
        <input type="date" id="submissionTimeStartInput" v-model="query.submissionTimeStart" />
      </div>

      <div class="form-group">
        <label for="submissionTimeEndInput">提交时间结束:</label>
        <input type="date" id="submissionTimeEndInput" v-model="query.submissionTimeEnd" />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="approvalTimeStartInput">审核时间开始:</label>
        <input type="date" id="approvalTimeStartInput" v-model="query.approvalTimeStart" />
      </div>

      <div class="form-group">
        <label for="approvalTimeEndInput">审核时间结束:</label>
        <input type="date" id="approvalTimeEndInput" v-model="query.approvalTimeEnd" />
      </div>
    </div>



    <!-- 其他输入项，根据实际情况添加 -->

    <div class="form-group">
      <button @click="loadUserSubmissions">查询</button>
      <button @click="resetQuery">重置</button>
    </div>

    <table v-if="submissionList">
      <thead>
        <tr>
          <th>提交记录ID</th>
          <th>openid</th>
          <th>作品链接</th>
          <th>平台信息</th>
          <th>提交时间</th>
          <th>审核状态</th>
          <th>审核人openid</th>
          <th>作品编号</th>
          <!-- 添加其他需要显示的列的表头 -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in submissionList.records" :key="record.submissionId">
          <td>{{ record.submissionId }}</td>
          <td>{{ record.openid }}</td>
          <td>{{ record.workLink }}</td>
          <td>{{ mapPlatform(record.platform) }}</td>
          <td>{{ record.submissionTime }}</td>
          <td>{{ mapApprovalStatus(record.approvalStatus) }}</td>
          <td>{{ record.approvalBy }}</td>
          <td>{{ record.workCode }}</td>
          <!-- 添加其他需要显示的列 -->
        </tr>
      </tbody>
    </table>
    <Pagination v-if="submissionList" :total="submissionList.total" :current="submissionList.current"
      :pageSize="submissionList.size" :pageCount="submissionList.pages" @pageChange="handlePageChange" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Pagination from './Pagination.vue';
import Navbar from './Navbar.vue';

const submissionList = ref<{
  records: any[]; 
  total: number;
  current: number;
  size: number;
  pages: number;
} | null>(null);

const query = ref({
  openid: "",
  workCode: "",
  submissionTimeStart: "",
  submissionTimeEnd: "",
  approvalTimeStart: "",
  approvalTimeEnd: "",
  approvalStatus: "0", // 默认为未审核
  approvalBy: ""
  // 添加其他输入项，根据实际情况添加
});

const pageIndex = ref(1);
const pageSize = ref(10);

const loadUserSubmissions = async () => {
  try {

    // 创建一个新对象，只包含非空参数
    const requestPayload = Object.fromEntries(
      Object.entries(query.value).filter(([key, value]) => value !== "")
    );
    const token = localStorage.getItem('token');

    console.log('妞儿',token)

    const response = await axios.post('http://localhost:8888/api/submissions/getSubmissionPage', {
      ...requestPayload,
      pageIndex: pageIndex.value,
      pageSize: pageSize.value
    },{
        headers: {
          Authorization: `Bearer ${token}` // 添加 Authorization 头部
        }
    }
    );

    submissionList.value = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const handlePageChange = (page: number) => {
  pageIndex.value = page;
  loadUserSubmissions();
};

const mapPlatform = (platform: number) => {
  const platformMap: Record<number, string> = {
    1: '小红书',
    2: '快手',
    3: '抖音',
    // 可以继续添加其他平台的映射
  };
  return platformMap[platform] || '未知平台';
};

const mapApprovalStatus = (approvalStatus: number) => {
  const statusMap: Record<number, string> = {
    0: '未审核',
    1: '审核通过',
    2: '审核未通过',
  }
  return statusMap[approvalStatus] || '未知状态';
}

onMounted(() => {
  loadUserSubmissions();
});

const resetQuery = () => {
  query.value = {
    openid: "",
    // 重置其他查询条件字段

    workCode: "",
    submissionTimeStart: "",
    submissionTimeEnd: "",
    approvalTimeStart: "",
    approvalTimeEnd: "",
    approvalStatus: "0", // 默认为未审核
    approvalBy: ""
    // 添加其他输入项，根据实际情况添加
  };
};
</script>



<style scoped>
body {
  font-family: 'Helvetica', 'Arial', sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.form-group {
  width: calc(30% - 20px);
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.button-group {
  margin-top: 15px;
}

button {
  margin-right: 10px;
  padding: 8px 15px;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
}

th,
td {
  padding: 12px;
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
  border: 1px solid #ddd;
}

th {
  background-color: #007BFF;
  color: #fff;
}

tr:hover {
  background-color: #f5f5f5;
}

.submissionList {
  width: 100%;
}
</style>
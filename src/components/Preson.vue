<template>
    <div class="submissionList">
        <h1>用户提交记录列表</h1>
        <table v-if="submissionList">
            <thead>
                <tr>
                    <th>提交记录ID</th>
                    <th>作品链接</th>
                    <th>平台信息</th>
                    <th>提交时间</th>
                    <th>审核状态</th>
                    <!-- 添加其他需要显示的列的表头 -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="record in submissionList.records" :key="record.submissionId">
                    <td>{{ record.submissionId }}</td>
                    <td>{{ record.workLink }}</td>
                    <td>{{ mapPlatform(record.platform) }}</td>
                    <td>{{ record.submissionTime }}</td>
                    <td>{{ mapApprovalStatus(record.approvalStatus) }}</td>
                    <!-- 添加其他需要显示的列 -->
                </tr>
            </tbody>
        </table>
        <Pagination v-if="submissionList" :total="submissionList.total" :current="submissionList.current"
            :pageSize="submissionList.size" @pageChange="loadUserSubmissions" />
    </div>
</template>
  
  

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Pagination from './Pagination.vue';

const submissionList = ref(null);
const openid = "ojLpP4_JbmmQVvQXA94TQ-i3S1Dw";
const pageIndex = ref(1);
const pageSize = ref(10);

const loadUserSubmissions = async () => {
    try {
        const response = await axios.post('http://172.18.104.73:8888/api/submissions/getUserSubmissionList', {
            openid: openid,
            pageIndex: pageIndex.value,
            pageSize: pageSize.value
        });

        submissionList.value = response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const mapPlatform = (platform) => {
    const platformMap = {
        1: '小红书',
        2: '快手',
        3: '抖音',
        // 可以继续添加其他平台的映射
    };
    return platformMap[platform] || '未知平台';
};

const mapApprovalStatus = (approvalStatus) => {
    const statusMap = {
        0: '未审核',
        1: '审核通过',
        2: '审核未通过',
    }
    return statusMap[approvalStatus] || '未知状态';
}
// 这是一个简单的示例，使用 fetch 进行数据获取
onMounted(() => {
    loadUserSubmissions();
});
</script>


<style scoped>
  body {
    font-family: 'Helvetica', 'Arial', sans-serif;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
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

  th, td {
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


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
          <option value="">请选择审核状态</option>
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
      <div class="form-group">
        <label for="approvalPlatform">平台:</label>
        <select id="approvalPlatform" v-model="query.platform">
          <option value="1">小红书</option>
          <option value="2">快手</option>
          <option value="3">抖音</option>

        </select>
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
      <div class="form-group">
        <label for="nickname">昵称:</label>
        <input id="nickname" v-model="query.nickname" />
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
          <th>头像</th>
          <th>昵称</th>
          <th>作品链接</th>
          <th>平台信息</th>
          <th>提交时间</th>
          <th>审核状态</th>
          <th>审批</th>
          <th>审核人openid</th>
          <th>作品编号</th>
          <!-- 添加其他需要显示的列的表头 -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in submissionList.records" :key="record.submissionId">
          <td>{{ record.submissionId }}</td>
          <td>{{ record.openid }}</td>
          <td>
            <!-- 渲染图片，设置最大宽度和最大高度，并保持宽高比例不变 -->
            <img :src="record.avatarUrl" alt="Payment Image"
              :style="{ maxWidth: '100px', maxHeight: '100px', height: 'auto' }">
            <!-- <button @click="toggleImageZoom">{{ isImageZoomed ? '缩小' : '放大' }}</button> -->
          </td>
          <td>{{ record.nickname }}</td>
          <td>
            <a :href="getRedirectUrl(record.workLink)" target="_blank">{{ record.workLink }}</a>
            <button @click="copyLink(record.workLink)" style="float: right;">复制链接</button>
            <span v-if="copied" class="float-tip">链接已复制到剪贴板</span>
          </td>
          <td>{{ mapPlatform(record.platform) }}</td>
          <td>{{ record.submissionTime }}</td>
          <td>{{ mapApprovalStatus(record.approvalStatus) }}</td>
          <td>
            <button
              @click="updateApprovalStatus(record.submissionId, getNextApprovalStatus(record.approvalStatus), record.openid)">
              {{ getApprovalButtonText(record.approvalStatus) }}
            </button>
          </td>

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
import { ref, onMounted, defineProps } from 'vue';
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
  approvalStatus: "", // 默认为未审核
  approvalBy: "",
  platform: null,
  nickname: ""
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

    console.log('妞儿', token)

    const response = await axios.post('https://jobback.anli.live/api/submissions/getSubmissionPage', {
      ...requestPayload,
      pageIndex: pageIndex.value,
      pageSize: pageSize.value
    }, {
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

const getNextApprovalStatus = (approvalStatus: number) => {
  if (approvalStatus === 0) {
    // 未审核状态，返回 1（通过）
    return 1;
  } else if (approvalStatus === 1) {
    // 审批通过状态，返回 2（不通过）
    return 2;
  } else {
    // 审批不通过状态，返回 1（通过）
    return 1;
  }
}
const getApprovalButtonText = (approvalStatus: number) => {
  if (approvalStatus === 0) {
    return '通过';
  } else if (approvalStatus === 1) {
    return '不合格';
  } else {
    return '通过';
  }
}

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
    approvalBy: "",
    platform: null,
    nickname: ""
    // 添加其他输入项，根据实际情况添加
  };
};
// 定义提取链接文本的方法
const extractLinkText = (link: string) => {
  if (link.includes("http://xhslink.com")) {
    return "小红书";
  } else if (link.includes("v.douyin.com")) {
    return "抖音";
  } else if (link.includes("v.kuaishou.com")) {
    return "快手";
  } else {
    return link;
  }
};

// 定义获取跳转链接的方法
const getRedirectUrl = (link: string) => {
  if (link.includes("http://xhslink.com")) {
    const xhsLink = link.match(/http:\/\/xhslink\.com\/\w+/);
    if (xhsLink) {
      return xhsLink[0];
    }
  } else if (link.includes("v.douyin.com")) {
    const douyinLink = link.match(/v.douyin.com\/\w+/);
    if (douyinLink) {
      return "https://" + douyinLink[0];
    }
  } else if (link.includes("v.kuaishou.com")) {
    const kuaishouLink = link.match(/v.kuaishou.com\/\w+/);
    if (kuaishouLink) {
      return "https://" + kuaishouLink[0];
    }
  }
  return link;
};
const props = defineProps({
  record: Object
});
const copied = ref(false);
const copyLink = (link: string) => {
  const el = document.createElement('textarea');
  el.value = link;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 1000);
};
const updateApprovalStatus = async (submissionId: number, approvalStatus: number, openid: string) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.post('https://jobback.anli.live/api/submissions/updateApprovalStatus', {
      submissionId: submissionId,
      approvalStatus: approvalStatus,
      approvalBy: "admin",
      openid: openid
    }, {
      headers: {
        Authorization: `Bearer ${token}` // 添加 Authorization 头部
      }
    });
     // 处理响应数据
     
     loadUserSubmissions();
  } catch (error) {
    console.error('Error occurred while updating approval status:', error);
  }
}






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

.float-tip {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
</style>
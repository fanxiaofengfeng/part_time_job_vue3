<template>
    <div class="submissionList">
        <h1><br>用户提现列表</br></h1>
        <div class="form-row">
            <div class="form-group">
                <label for="openidInput">OpenID:</label>
                <input id="openidInput" v-model="query.openid" />
            </div>

            <div class="form-group">
                <label for="workCodeInput">作品编号:</label>
                <input id="workCodeInput" v-model="query.workCode" />
            </div>
        </div>

        <div class="form-group">
            <button @click="loadUserSubmissions">查询</button>
            <button @click="resetQuery">重置</button>
        </div>
    </div>

    <table v-if="submissionList">
        <thead>
            <tr>
                <th>openid</th>
                <th>昵称</th>
                <th>付款二维码</th>
                <th>可提现</th>
                <th>已经提现</th>
                <th>转账</th>
                <!-- 添加其他需要显示的列的表头 -->
            </tr>
        </thead>
        <tbody>
            <tr v-for="record in submissionList.records" :key="record.submissionId">
                <td>{{ record.openid }}</td>
                <td>{{ record.nickname }}</td>

                <td>
                    <!-- 渲染图片，设置最大宽度和最大高度，并保持宽高比例不变 -->
                    <img :src="record.paymentImageUrl" alt="Payment Image"
                        :style="{ maxWidth: isImageZoomed ? '500px' : '100px', maxHeight: isImageZoomed ? '500px' : '100px', height: 'auto' }">
                    <button @click="toggleImageZoom">{{ isImageZoomed ? '缩小' : '放大' }}</button>
                </td>
                <td>{{ record.expectedTransfers }}元</td>
                <td>{{ record.completedTransfers }}元</td>
                <td>
                    <button @click="transferMoney(record.openid)">转账</button>
                </td>

                <!-- 添加其他需要显示的列 -->
            </tr>
        </tbody>
    </table>
    <Pagination v-if="submissionList" :total="submissionList.total" :current="submissionList.current"
        :pageSize="submissionList.size" :pageCount="submissionList.pages" @pageChange="handlePageChange" />
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

import Navbar from './Navbar.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Pagination from './Pagination.vue';

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
    // 添加其他输入项，根据实际情况添加
});

const pageIndex = ref(1);
const pageSize = ref(10);


const loadUserSubmissions = async () => {
    try {

        const token = localStorage.getItem('token');

        console.log('妞', token)

        const response = await axios.post('https://jobback.anli.live/api/submissions/getSubmissionMoneyPage', {

            pageIndex: pageIndex.value,
            pageSize: pageSize.value
        },
            {
                headers: {
                    Authorization: `Bearer ${token}` // 添加 Authorization 头部
                }
            }
        );
        console.log('你好')

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

onMounted(() => {
    loadUserSubmissions();
});

const resetQuery = () => {
    query.value = {
        openid: "",
        // 重置其他查询条件字段
        workCode: ""
        // 添加其他输入项，根据实际情况添加
    };

}
const transferMoney = async (openid: string) => {
    try {

        const token = localStorage.getItem('token');

        console.log('token', token)

        const response = await axios.post('https://jobback.anli.live/api/submissions/transferMoney', {
            openid: openid // 将 openid 作为请求参数发送到后端


        },
            {
                headers: {
                    Authorization: `Bearer ${token}` // 添加 Authorization 头部
                }
            }
        );
        console.log('转账成功')

        submissionList.value = response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


const isImageZoomed = ref(false); // 图片放大状态

const toggleImageZoom = () => {
    isImageZoomed.value = !isImageZoomed.value;
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
<template>
    <div class="container">
        <div class="login-wrapper">
            <div class="header">Login</div>
            <div class="form-wrapper">
                <input v-model="username" type="text" name="username" placeholder="username" class="input-item">
                <input v-model="password" type="password" name="password" placeholder="password" class="input-item">
                <button class="btn" @click="login">登录</button>
            </div>
            <div class="msg">
                Don't have an account?
                <a href="#">Sign up</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 解构导入，只引入所需部分
import { ref } from 'vue';
import { useRouter } from 'vue-router';  // 导入 useRouter
// 引入整个模块
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css'; 
import { ElMessage } from 'element-plus';

const router = useRouter();
const username = ref('');
const password = ref('');

const login = async () => {
    try {
        const response = await axios.post('https://jobback.anli.live/api/login',
            {
                username: username.value,
                password: password.value
            },
            { timeout: 5000 });

        // 根据返回的状态码判断登录是否成功
        if (response.status === 200) {
            const data = response.data;
            if (data.code === 1) {
                localStorage.setItem('token', data.data);

                console.log(data.data)
                router.replace('/index');
            } else if (data.code === 401) {
                showErrorMessage('密码错误');
            } else {
                showErrorMessage('登录失败: ' + data.message);
            }
        } else {
            showErrorMessage('请求失败: ' + response.statusText);

        }
    } catch (error) {
        if (error instanceof Error && error.message.includes('timeout')) {
            console.error('请求超时:', error.message);
            // 处理超时逻辑，显示错误提示等
        } else {
            console.error('登录错误提示:', error);
            // 处理其他错误逻辑，显示错误提示等
        }
    }
};

const showErrorMessage = (message: string) => {
    console.error(message); // 输出错误信息到控制台
    // 在页面中显示错误信息，使用 Element Plus 的 Message 组件
    ElMessage.error(message);
};

</script>



<style>
* {
    margin: 0;
    padding: 0;
}


.container {
    height: 100%;
    height: 100%;
    min-height: 100vh;
    /* 设置最小高度为视口高度，确保铺满整个屏幕 */
    margin: 0px;
    padding: 0px;
    background-image: linear-gradient(to right, #999999, #330867);
    /* background-color: aqua; */
}


/* .login-wrapper {
    background-color: bisque;
    width: 358px;
    height: 588px;
    border-radius: 15px;
    padding: 50 20px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    
}  */

.login-wrapper {
    background-color: bisque;
    width: 358px;
    height: 588px;
    border-radius: 15px;
    padding: 10px 50px 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}


.header {
    font-size: 38px;
    font-weight: bold;
    text-align: center;
    line-height: 200px;
}

.input-item {
    display: block;
    width: 100%;
    margin-bottom: 20px;
    border: 0;
    padding: 10px;
    border-bottom: 1px solid rgb(128, 125, 125);
    font-size: 15px;
    outline: none;
}

.input-item::placeholder {
    text-transform: uppercase;
}

.btn {
    text-align: center;
    padding: 10px;
    width: 100%;
    margin-top: 40px;
    background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
    color: #fff;
}

.msg {
    text-align: center;
    line-height: 88px;
}

a {
    text-decoration-line: none;
    color: #abc1ee;
}
</style>

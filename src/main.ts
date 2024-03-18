import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import taskDetails from './components/task-details.vue'; // 确保导入了 Person 组件
import PaymentDetails from './components/payment-details.vue'; // 确保导入了 PaymentDetails 组件
import Index from './components/Index.vue';
import Login from './components/login.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: Login }, // 这里的 Home 是你的首页组件
      { path: '/task-details', component: taskDetails },
      { path: '/payment-details', component: PaymentDetails },
      { path: '/index', component: Index },
      // { path: '/login', component: Login },
    ],
  });


const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')

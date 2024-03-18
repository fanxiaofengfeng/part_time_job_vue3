<template>
  <!-- html -->
  <div>
    <header>
      <!-- header content -->
    </header>
      <Navbar></Navbar>
      <router-view></router-view> 
    <!-- <Login/> -->

  </div>
</template>


<script lang="ts">
//js或者ts
import TaskDetails from "./components/task-details.vue";
import Navbar from './components/Navbar.vue';
import PaymentDetails from './components/payment-details.vue';
import Login from './components/login.vue';

export default {
  name: 'App', //组件名
  components: { Navbar, TaskDetails, PaymentDetails,Login } //注册组件
}
</script>



<style scoped>
/* 样式 */


/* .app {
  background-color: #ddd;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
} */
</style>

<template>
    <!-- html -->
    <div>
        <header>
            <!-- header content -->
        </header>
     <!-- <Navbar /> -->

        <router-view></router-view>
        <!-- <Login></Login> -->

        <!-- <Person /> -->

    </div>
</template>


<script lang="ts">
//js或者ts
import TaskDetails from "./task-details.vue";
import Navbar from './Navbar.vue';
import PaymentDetails from './payment-details.vue';

export default {
  name: 'Index', //组件名
  components: { Navbar, TaskDetails, PaymentDetails } //注册组件
}
</script>
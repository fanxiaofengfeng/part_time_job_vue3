<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
    @select="handleSelect">
    <el-menu-item index="0">
      <h1>后台系统</h1>
    </el-menu-item>
    <div class="flex-grow" />
    <router-link to="/task-details" exact="true">
      <el-menu-item index="1"><h3>任务详情</h3></el-menu-item>
    </router-link>
    <router-link to="/payment-details" exact="true">
      <el-menu-item index="2"><h3>转账明细</h3></el-menu-item>
    </router-link>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>

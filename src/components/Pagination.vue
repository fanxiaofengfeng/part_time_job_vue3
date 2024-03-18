<template>
    <div class="pagination">
      <button @click="goToPage(current - 1)" :disabled="current === 1">上一页</button>
      <span>第 {{ current }} 页/共 {{ pageCount }} 页</span>
      <button @click="goToPage(current + 1)" :disabled="current === pageCount">下一页</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const { total, current, pageSize, pageCount } = defineProps(['total', 'current', 'pageSize', 'pageCount']);
  console.log(total,current,pageSize,pageCount)
  const emit = defineEmits();
  
  const goToPage = (pageIndex: number) => {
    if (pageIndex > 0 && pageIndex <= pageCount) {
      emit('pageChange', pageIndex);
    }
  };
  </script>
  
  <style scoped lang="scss">
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .pagination button {
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
  }
  
  .pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  
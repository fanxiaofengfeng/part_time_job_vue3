<template>
    <div class="pagination">
      <button @click="goToPage(current - 1)" :disabled="current === 1">Previous</button>
      <span>Page {{ current }} of {{ total / pageSize }}</span>
      <button @click="goToPage(current + 1)" :disabled="current === total / pageSize">Next</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const { total, current, pageSize } = defineProps(['total', 'current', 'pageSize']);
  const { emit } = defineEmits();
  
  const goToPage = (page: number) => {
    if (page > 0 && page <= total / pageSize) {
      emit('pageChange', page);
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
  
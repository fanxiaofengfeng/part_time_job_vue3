<template>
  <!-- html -->
  <header>
  </header>


      <Person/>



</template>

<script  lang="ts">
  //js或者ts
 import Person  from "./components/Preson.vue";
 export default {
   name:'App', //组件名
   components:{Person} //注册组件
  }
</script>



<style scoped>
/* 样式 */


 .app{
  background-color: #ddd;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
 }
</style>

<template>
    <div class="person">
        <h2>一辆{{ car.brand }}车,价值{{ car.price }}</h2>
        <button @click="changePrice">改价</button>
        <br>
        <h2>游戏列表</h2>
        <ul>
            <li v-for="g in games" :key="g.id">{{g.name}}</li>
        </ul>
    </div>

</template>




<script setup lang="ts" name = "Person234">
    import {ref} from 'vue'
    import { reactive } from 'vue';

    let car =reactive({brand:'奔驰',price:100})
    let games = [
        {id:'01',name:'王者'},
        {id:'02',name:'原神'},
        {id:'03',name:'lol'}
    ]


    function changePrice(){
        car.price +=100;

    }


</script>

<style scoped>
 .person {
   background-color: skyblue;
   box-shadow: 0 0 10px;
   border-radius: 10px;
   padding: 20px;
 }
 button {
    margin: 0 5px;
 }
 li {
    font-size: 20px;
 }
</style>
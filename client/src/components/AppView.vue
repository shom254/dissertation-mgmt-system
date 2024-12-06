<template>
    <div id="background">
        <HeaderBar></HeaderBar>
        <h1 id="greeting">Welcome, {{ first_name }} {{ last_name }}</h1>
        <RouterView/> 
        <!--studentcard, teachercard, studentteachercard, admincard-->
    </div>
</template>

<script setup>
import HeaderBar from "./HeaderBar.vue";
import { ref } from 'vue';

//const role = ref('')
const first_name = ref("")
const last_name = ref("")

</script>

<style scoped>

#background {
  height: 100%;
  width: auto;
  background-color: rgb(238, 239, 242);
}

#greeting {
    margin-left: 30px;
    margin-top: 30px;
}
</style>
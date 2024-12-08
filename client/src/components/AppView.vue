<template>
    <div id="background">
        <HeaderBar></HeaderBar>
        <h1 v-if="role==='admin'" class="greeeting">Welcome, ADMIN</h1>
        <h1 v-else-if="role" class="greeting">Welcome, {{ first_name }} {{ last_name }}</h1>
        <h1 v-else class="greeting">Welcome.</h1>
        <RouterView/> 
        <!--studentcard, teachercard, studentteachercard, admincard-->
    </div>
</template>

<script setup>
import HeaderBar from "./HeaderBar.vue";
import { onMounted, ref } from 'vue';

//const role = ref('')
const first_name = ref("")
const last_name = ref("")
const role = ref("")

onMounted(() =>  {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user.role) {
        role.value = user.role
        first_name.value = user.first_name
        last_name.value = user.last_name
    }
})

</script>

<style scoped>

#background {
  height: 100%;
  width: auto;
  background-color: rgb(238, 239, 242);
}

.greeting {
    margin-left: 30px;
    margin-top: 30px;
}
</style>
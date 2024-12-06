<template>
    <div id="background">
        
        <main v-if="admin" id="admin">
            <h1>Dissertation Management System</h1>
            <h2>Admin Sign In</h2>
            
            <input class="inputtext" name="password" type="password"/>
            <button class="button"> Testing </button>

            <h1>{{ dsdsd }}</h1>
            <span id="switchuser" @click="admin=!admin">Regular User Login ></span>
        </main>
        <main v-else id="user">
            <h1>Dissertation Management System</h1>
            <h2>Please Sign In (Student / Teacher)</h2>
            
            <input class="inputtext" name="password" type="password"/>
            <button class="button"> Testing </button>

            <h1>{{ dsdsd }}</h1>
            <span id="switchadmin" @click="admin=!admin">Admin Login ></span>
        </main>
    
    </div>
</template>

<script setup>
import { ref } from 'vue';
const admin = ref(false);
</script>

<style scoped>
#background {
    height: 100%;
    display:flex;
    flex-direction: column;
    width: auto;
    background-color: rgb(238, 239, 242);
}

.inputtext {
    width: 25%;
}

#switchadmin {
    font-weight: bold;
    color: darkblue;
    margin-top: 10px;
}

#switchuser {
    font-weight: bold;
    color: darkblue;
}

#switchadmin:hover, #switchuser:hover {
    text-decoration: underline;
    cursor: pointer;
}

h1, h2 {
    width: fit-content;
    height: fit-content;
}

main {
    height: fit-content;
    width: 40%;
    margin: auto;
    gap: 20px;
    box-shadow: 0 6px 8px -1px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1);
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: start;
    align-items: center;
    padding:10px;
    padding-bottom: 50px;
}

#admin {
    gap: 10px;
}

</style>
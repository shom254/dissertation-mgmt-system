<template>
    <header id="header">
        <h1 id="title">Dissertation Management System</h1>
        <button id="logout">Log Out</button>
    </header>
</template>

<script setup>
    import { useRoute} from 'vue-router';
    //import { watchEffect, ref } from 'vue';
    
    const route = useRoute();
    console.log('header loaded')
</script>

<style scoped>
/* border-b-gray-300 border-b-2 fixed top-0 w-full bg-white display z-10 */
#header {
    border-bottom: 4px solid rgb(209 213 219);
    
    width: 100%;
    height: auto;
    padding-top: 2px;
    padding-bottom: 2px;
    background-color: white;
    display: flex;
    align-items: center;
}

#title {
    margin-left: 1rem;
}

#logout{
    margin-left: auto;
    margin-right: 1rem;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    height: fit-content;
}

</style>
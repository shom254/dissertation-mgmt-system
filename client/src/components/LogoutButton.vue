<template>
    <button id="logout" @click="logout">Log Out</button>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const origin = window.location.origin
async function logout() {
    const response = await(fetch(origin + '/api/admin', {
        method: 'DELETE'
    }))
    switch (response.status) {
        case 204:
            alert('You have been logged out successfully')
            router.push({name: 'home'})
            break;
        case 401:
            alert('Your session has already expired. Please log in again')
            router.push({name: 'home'})
            break;
    }
}

//fetch() send DELETE Then push '/'


</script>

<style scoped>
button {
    background-color: var(--blue);
    border-width: 0;
    box-shadow: 0 6px 8px -1px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1);
    margin-left: auto;
    margin-right: 1rem;
    font-size: 1.15rem;
    padding: 0.5rem 1rem;
    height: fit-content;
}
</style>
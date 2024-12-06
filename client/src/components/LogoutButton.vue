<template>
    <button id="logout">Log Out</button>
</template>

<script setup>
import { useRoute } from 'vue-router';
const router = useRoute();

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
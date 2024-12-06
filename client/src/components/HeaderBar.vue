<template>
    <header id="header">
        <h1 id="title">Dissertation Management System</h1>
        <LogoutButton/>
    </header>
</template>

<script setup>
    import LogoutButton from './LogoutButton.vue';
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
    background-color: var(--blue);
    border-width: 0;
    box-shadow: 0 6px 8px -1px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1);
    margin-left: auto;
    margin-right: 1rem;
    font-size: 1.15rem;
    padding: 0.5rem 1rem;
    height: fit-content;
}

#logout:hover{
    background-color: var(--darkblue);
    cursor: pointer;
}

</style>
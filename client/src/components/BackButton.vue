<template>
    <button class="button--red" type="button" @click="$router.push(link)" style="margin-top: 30px">Back</button>
</template>

<script setup>
const { link } = defineProps({link: {type: String, default: '/'}})


</script>
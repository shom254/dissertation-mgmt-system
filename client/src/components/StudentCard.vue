<template>
    <main id="main">
        <!-- Progress Report -->
        <h2>Progress Report</h2>
        <div style="overflow-x: auto">
            <table>
                <template v-for="(value, key) in reportdetails.progress">
                    <tr>
                        <th class="leftalign">{{ key }}</th>
                        <td class="leftalign">{{ value }}</td>
                    </tr>
                </template>
                <!--
                <tr>
                    <th>Name</th>
                    <td>Loading...</td>
                </tr>
                <tr>
                    <th>Submission</th>
                    <td>Loading...</td>
                </tr>
                <tr>
                    <th>Grade</th>
                    <td>Loading...</td>
                </tr>
                -->
            </table>
        </div>
        

        <!-- Final Report -->
        <h2>Final Report</h2>
        <div style="overflow-x: auto">
            
        </div>

    </main>
</template>

<script setup>
import { ref } from 'vue'
const reportdetails = ref(null)
/*
{
    "progress": {
        name: "Loading...",
        filename: "Loading...",
        grade: "Loading...",
    },
    "final": {
        name: "Loading...",
        filename: "Loading...",
        grade: "Loading...",
    }
}
*/

</script>

<style scoped>

.leftalign {
    text-align: left
}

main {
    height: fit-content;
    width: 95%;
    margin: auto;
    box-shadow: 0 6px 8px -1px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1);
    background-color: white;
    
    padding:10px;
    padding-bottom: 50px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    
}

</style>
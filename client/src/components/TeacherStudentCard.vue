<template>
    <main id="main">
        <h1>Student: {{ last_name.toUpperCase() }} {{ first_name }}</h1>

        <!-- Progress Report -->
        <h2>Progress Report</h2>
        <p v-if="!progressready">Loading...</p>
        <div v-else class="data">
            <table>
                <template v-for="(value, key) in reportdetails.progress">
                    <tr>
                        <th class="leftalign">{{ key }}</th>
                        <td v-if="key != 'grade'" class="leftalign">{{ value }}</td>
                        <td v-else>{{ (value !== null) ? (value + '/100') : 'Not graded yet' }} 
                            <span v-if="value == null">
                                <input type="number" min="0" max="100" style="width: 25%; margin-left: 20px"/>
                                <button class="button--green" style="margin-left: 20px">Grade</button>
                            </span>
                        </td>
                    </tr>
                </template>
            </table>
        </div>
        
        <!-- Final Report -->
        <h2 style="margin-top: 50px">Final Report</h2>
        <p v-if="!finalready">Loading...</p>
        <div v-else class="data">
            <table>
                <template v-for="(value, key) in reportdetails.final">
                    <tr>
                        <th class="leftalign">{{ key }}</th>
                        <td v-if="key != 'grade'" class="leftalign">{{ value }}</td>
                        <td v-else>{{ (value !== null) ? (value + '/100') : 'Not graded yet' }} 
                            <span v-if="value == null">
                                <input type="number" min="0" max="100" style="width: 25%; margin-left: 20px"/>
                                <button class="button--green" style="margin-left: 20px">Grade</button>
                            </span>
                        </td>
                    </tr>
                </template>
            </table>
        </div>
        <BackButton style="margin-top: 30px;" link="/app/teacher"></BackButton>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import BackButton from './BackButton.vue';


const route = useRoute()
const id = route.params.id || null;

// data
onMounted(() => {
  console.log(`FETCHING REPORT DATA....progress ${progressready}...final ${finalready}`)
/*
  fetch('', {
    method: 'GET'
  })
  .then(res => res.json())
  .then(data => {reportdetais = data})
  */
  //..
})

/* get from session storage from teacher */


const first_name = sessionStorage.getItem('first_name') || ''
const last_name = sessionStorage.getItem('first_name') || ''

const progressready = ref(false)
const finalready = ref(false)
const reportdetails = ref({
    
})
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

table {
    table-layout: fixed;
    width: 45%;
    margin: auto;
}

.data {
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

table th {
    width: 20%;
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
    justify-content: center;
    
}

input::file-selector-button {
  background-color: var(--green);
  padding: 10px 10px;
  height: fit-content;
  border-width: 0;
  box-shadow: 0 6px 8px -1px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1);
  font-size: 1.1rem;
}


</style>
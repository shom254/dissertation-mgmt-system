<template>
    <main id="main">
        <!-- Progress Report -->
        <h2>Your Assigned Students</h2>
        <p v-if="!ready">Loading...</p>
        <div v-else-if="ready && (studentlist.length > 0)" class="data">
            <h3>Click on a student to view or assign grades</h3>
            <table>
            <thead>
            <tr>
                <th style="width: 70%">Name</th>
                <th style="width: 15%">Progress Grade</th>
                <th style="width: 15%">Final Grade</th>
            </tr>
            </thead>
                <template v-for="( { id, first_name, last_name, grade1, grade2 } ) in studentlist">
                    <tr @click="$router.push(`teacher/${id}`)">
                        <td class="leftalign">{{ `${first_name.toUpperCase()} ${last_name}` }}</td>
                        <td class="centeralign">{{ grade1 }}</td>
                        <td class="centeralign">{{ grade2 }}</td>
                    </tr>
                </template>
            </table>
        </div>
        <p v-else>You have no assigned students.</p>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// data
onMounted(() => {
  console.log(`FETCHING REPORT DATA...${ready.value}`)
/*
  fetch('', {
    method: 'GET'
  })
  .then(res => res.json())
  .then(data => {reportdetais = data})
  */
  //..
})
const ready = ref(true)
const studentlist = ref([
{id: 1, first_name: "John", last_name: "Doe", grade1: 72, grade2: 85},
    {id: 3, first_name: "sds", last_name: "d", grade1: 85, grade2: 85},
    {id: 5, first_name: "John", last_name: "ddddd", grade1: 72, grade2: 85},
])
/*
[
 {id, first_name, last_name, grade1, grade2}   
]
*/

</script>

<style scoped>

table tr td { cursor: pointer; }

.leftalign {
    text-align: left
}

.centeralign {
    text-align: center;
}

table {
    table-layout: fixed;
    width: 85%;
    margin: auto;
}

.data {
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

table th {
    text-align: center;
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
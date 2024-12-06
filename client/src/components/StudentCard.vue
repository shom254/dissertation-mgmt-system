<template>
    <main id="main">
        <!-- Progress Report -->
        <h2>Progress Report</h2>
        <p v-if="!progressready">Loading...</p>
        <div v-else class="data">
            <table>
                <template v-for="(value, key) in reportdetails.progress">
                    <tr>
                        <th class="leftalign">{{ key }}</th>
                        <td class="leftalign">{{ value }}</td>
                    </tr>
                </template>
            </table>

            <div class="upload">
                <label for="uploadfile" style="margin-right: 10px">Upload your progress report:</label>
                <input 
                id="uploadfile" 
                :disabled="disableuploadprogress"
                type="file" 
                accept=".doc,.docx,.pdf"                
                style="margin-top: 20px"/>
                <button class="button" :disabled="disableuploadprogress">Upload</button>
            </div>
        </div>
        
        <!-- Final Report -->
        <h2 style="margin-top: 50px">Final Report</h2>
        <p v-if="!finalready">Loading...</p>
        <div v-else class="data">
            <table>
                <template v-for="(value, key) in reportdetails.progress">
                    <tr>
                        <th class="leftalign">{{ key }}</th>
                        <td class="leftalign">{{ value }}</td>
                    </tr>
                </template>
            </table>

            <div class="upload">
                <label for="uploadfile" style="margin-right: 10px">Upload your progress report:</label>
                <input 
                :disabled="disableuploadfinal"
                id="uploadfile" 
                type="file" 
                accept=".doc,.docx,.pdf" 
                style="margin-top: 20px"/>
                <button class="button" :disabled="disableuploadprogress">Upload</button>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// data
onMounted(() => {
  console.log("FETCHING REPORT DATA")
/*
  fetch('', {
    method: 'GET'
  })
  .then(res => res.json())
  .then(data => {reportdetais = data})
  */
  //..
})
const disableuploadprogress = ref(true)
const disableuploadfinal = ref(true)

const progressready = ref(false)
const finalready = ref(false)
const reportdetails = ref({})
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
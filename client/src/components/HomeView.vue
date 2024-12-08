<template>
    <div id="background">
        
        <main v-if="admin" id="admin">
            <h1>Dissertation Management System</h1>
            <h2>Admin Sign In</h2>
            
            <input class="inputtext" name="password" v-model="pw.password" type="password"/>
            <button class="button" @click="userlogin"> Log In </button>

            <h1>{{ dsdsd }}</h1>
            <span id="switchuser" @click="toggle">Regular User Login ></span>
        </main>
        <main v-else id="user">
            <h1>Dissertation Management System</h1>
            <h2>Please Sign In (Student / Teacher)</h2>
            
            <input class="inputtext" name="password" v-model="pw.password" type="password"/>
            <button class="button" @click="adminlogin"> Log In </button>

            <h1>{{ dsdsd }}</h1>
            <span id="switchadmin" @click="toggle">Admin Login ></span>
        </main>
    
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const admin = ref(false);

const pw = ref({ password: '' })

function toggle() {
    admin = !admin
    pw.value.password = ''
}

async function userlogin() {
    try {
        let response = await fetch('http:localhost:8080/api/users', {
            method: 'POST',
            body: JSON.stringify(pw.value),
            headers: {
            "Content-Type": "application/json",
            }
        })
        switch (response.status) {
            case 201:
                sessionStorage.setItem("user", response.body)
                const role = JSON.parse(response.body).role
                alert(`Log in success. Welcome ${role}`)
                if (role === 'student') router.push({name: 'student'})
                else if (role === 'teacher') router.push({name: 'teacher'})
                break;
            case 401:
                alert('Wrong Password Entered. Please try again')
                break;
            case 500:
                alert('Server Internal Error')
                break;
        }
    }
    catch (err) {
        console.error(err)
        alert('Server is offline')
    }
    
}

function adminlogin() {
    try {
        let response = await fetch('http:localhost:8080/api/admin', {
            method: 'POST',
            body: JSON.stringify(pw.value),
            headers: {
            "Content-Type": "application/json",
            }
        })
        switch (response.status) {
            case 201:
                sessionStorage.setItem("user", response.body)
                alert(`Log in success. Welcome admin`)
                router.push({name: 'admin'})
                break;
            case 401:
                alert('Wrong Password Entered. Please try again')
                break;
            case 500:
                alert('Server Internal Error')
                break;
        }
    }
    catch (err) {
        console.error(err)
        alert('Server is offline')
    }
}


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
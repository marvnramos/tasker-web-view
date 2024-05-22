<script setup lang="ts">
    import router from '@/router';
    import { createApp, reactive } from 'vue';
    import success from '@/components/success.vue';

    const form = reactive({
        name: '',
        surname: '',
        email: '',
        password: '',
        repeatPassword: ''
    });   

    function clickedSubmit() {
        const request_payload = {
            name: form.name,
            surname: form.surname,
            email: form.email,
            password: form.password
        }
        
        fetch('http://localhost:3000/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request_payload)
        }).then(async response => {
            if (!response.ok) {
                throw new Error('Invalid email or password');
            }

            const successAlert = document.getElementById('success-alert');
            if(successAlert) {
                createApp(success).mount(successAlert);
                setTimeout(() => {
                    successAlert.classList.add('fade-out');
                }, 1000);
            }

            return response.json();

        }).catch(error => {
            console.error(error);
        });
    }
</script>


<template>
    <div id="success-alert" class="flex items-center justify-center w-screen mt-10">
    </div>
        <div class="flex items-center justify-center h-screen w-screen">
        <div class="flex items-center justify-center bg-[#FCFFE0] w-700 rounded-lg">
            <div class="auth  p-10 bg-[#7ABA78] rounded-l-lg">
                <form class="max-w-sm mx-auto" @submit.prevent="clickedSubmit()">
                    <div class="mb-5">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                        <input type="text" id="name" v-model="form.name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#4F6F52] dark:border-[#4F6F52] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light w-60" required />
                    </div>
                    <div class="mb-5">
                        <label for="surname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
                        <input type="text" id="surname" v-model="form.surname" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#4F6F52] dark:border-[#4F6F52] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light w-80" required />
                    </div>
                    <div class="mb-5">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" id="email" v-model="form.email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#4F6F52] dark:border-[#4F6F52] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@example.com" required />
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                        <input type="password" id="password" v-model="form.password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#4F6F52] dark:border-[#4F6F52] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                    </div>
                    <div class="mb-5">
                        <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repetir Contraseña</label>
                        <input type="password" id="repeat-password" v-model="form.repeatPassword" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#4F6F52] dark:border-[#4F6F52] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                    </div>
                    <button type="submit" class="text-white bg-[#799351] hover:bg-[#1A4D2E] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#0A6847] dark:hover:bg-blue dark:focus:ring-blue-800">Register new account</button>
                </form>
            </div>
            <div class=" w-500 m-10">
                <img alt="Vue logo" class="logo" src="@/assets/register-frog.webp" width="250" height="250" />
            </div>
        </div>
        </div>
 </template>

 <style>
    .fade-out {
        animation: fade-out 1s forwards;
    }

    @keyframes fade-out {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
</style>
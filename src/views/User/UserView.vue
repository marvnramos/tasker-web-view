<script setup lang="ts">
    import { createApp, reactive } from 'vue';
    import success from '@/components/success.vue';
    import error from '@/components/UserExists.vue';

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

        if(form.password !== form.repeatPassword){
            alert('Las contraseñas no coinciden');
            return; 
        }

        // console.log(form);
        
        fetch('http://localhost:3000/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request_payload)
        }).then(async response => {
            if(response.status === 400) {
                const errorAlert = document.getElementById('error-alert');
                if(errorAlert) {
                    if(errorAlert.firstChild) {
                        errorAlert.removeChild(errorAlert.firstChild);
                    }
                    createApp(error).mount(errorAlert);
                    setTimeout(() => {
                        errorAlert.classList.add('fade-out');
                    }, 1000);
                }
                return;
            }else if(!response.ok && response.status !== 400) {
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
    <div id="error-alert" class="flex items-center justify-center w-screen mt-10 absolute"></div> 
    <div id="success-alert" class="flex items-center justify-center w-screen mt-10 absolute">
    </div>
   <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="@/assets/register-frog.webp" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Registrarse</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="#" method="POST" @submit.prevent="clickedSubmit">
            <div class="flex space-x-2">
                <div class="w-1/2">
                    <label for="name" class="block text-sm font-medium leading-6 text-white">Nombre</label>
                    <div class="mt-2">
                        <input id="name" v-model="form.name" name="name" type="text" required class="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-700" />
                    </div>
                </div>
                <div class="w-1/2">
                    <label for="surname" class="block text-sm font-medium leading-6 text-white">Apellido</label>
                    <div class="mt-2">
                        <input id="surname" v-model="form.surname" name="surname" type="text" required class="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-700" />
                    </div>
                </div>
            </div>

            <div>
                <label for="email" class="block text-sm font-medium leading-6 text-white">Correo electrónico</label>
                <div class="mt-2">
                    <input id="email" v-model="form.email" name="email" type="email" required class="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-700" />
                </div>
            </div>

            <div>
                <label for="password" class="block text-sm font-medium leading-6 text-white">Contraseña</label>
                <div class="mt-2">
                    <input id="password" v-model="form.password" name="password" type="password" required class="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-700" />
                </div>
            </div>

            <div>
                <label for="repeat-password" class="block text-sm font-medium leading-6 text-white">Repetir Contraseña</label>
                <div class="mt-2">
                    <input id="repeat-password" v-model="form.repeatPassword" name="repeat-password" type="password" required class="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-700" />
                </div>
            </div>

            <div>
                <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Crear cuenta</button>
            </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-400">
            ¿Ya tienes una cuenta?
            <a href="/" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Inicia sesión</a>
        </p>
    </div>
</div>


    <!-- <div id="success-alert" class="flex items-center justify-center w-screen mt-10 absolute">
    </div>
        <div class="flex items-center justify-center h-screen w-screen">
        <div class="flex items-center justify-center rounded-lg w-1/2 bg-[#ACE1AF] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] z-10">
            <div class="auth  p-10 bg-[#7ABA78] rounded-l-lg w-1/2">
                <form class="max-w-sm mx-auto" @submit.prevent="clickedSubmit()">
                    <div class="mb-5">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                        <input type="text" id="name" v-model="form.name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#4F6F52] dark:border-[#4F6F52] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light w-80" required />
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
                    <p id="helper-text-explanation" class="mt-2 text-sm text-gray-900 dark:text-white">¿Ya tienes una cuenta? <a href="/" class="font-medium text-blue-600 hover:underline dark:text-[#1A4D2E]">Inicia sesión</a>.</p>
                    <br/>
                    <button type="submit" class="text-white bg-[#799351] hover:bg-[#1A4D2E] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#0A6847] dark:hover:bg-blue dark:focus:ring-blue-800">Crear Registro</button>
                </form>
            </div>
            <div class=" w-1/2 flex items-center justify-center">
                <img alt="Vue logo" class="logo" src="@/assets/register-frog.webp" width="250" height="250" />
            </div>
        </div>
        </div> -->
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
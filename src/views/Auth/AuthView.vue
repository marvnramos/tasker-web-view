<script setup lang="ts">
    import router from '@/router';
    import { reactive } from 'vue';

    const form = reactive({
        email: '',
        password: ''
    });

    function handleClick() {
        fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(async response => {
            if (!response.ok) {
                throw new Error('Invalid email or password');
            }
            return response.json();

         }).then(data => {
            console.log(data);
            localStorage.setItem('token', data.token);

            router.push('/tasks')
        })
        .catch(error => {
            console.error(error);
        });
    }

</script>

<template>
    <!-- <div class="absolute top-0 z-0 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"> -->
    <div class="flex items-center justify-center h-screen w-screen">
        <div class="flex items-center justify-center rounded-lg w-1/2 bg-[#ACE1AF] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] z-10">
            <div class="w-1/2 flex items-center justify-center">
                <img alt="Vue logo" class="logo" src="@/assets/login-frog.webp" width="250" height="250" />
            </div>
            <div class="auth bg-[#7ABA78] rounded-r-lg w-1/2 h-96 flex items-center">
                <!-- <h1 class="text-[#0A6847] flex items-center justify-center font-urbanist"><b>Login</b></h1> -->
                <form class="max-w-sm mx-auto" @submit.prevent="handleClick">
                    <div class="mb-5">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" id="email" v-model="form.email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#4F6F52] dark:border-[#4F6F52] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light w-1/2" placeholder="name@example.com" required />
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" id="password" v-model="form.password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#4F6F52] dark:border-[#4F6F52] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light w-80" required />
                    </div>
                    <p id="helper-text-explanation" class="mt-2 text-sm text-gray-900 dark:text-white">¿No tienes una cuenta? <a href="/register" class="font-medium text-blue-600 hover:underline dark:text-[#1A4D2E]">Regístrate</a>.</p>
                    <br/>
                    <button type="submit" class="text-white bg-[#799351] hover:bg-[#1A4D2E] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#0A6847] dark:hover:bg-blue dark:focus:ring-blue-800">
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    </div>
<!-- </div> -->
</template>
<script setup lang="ts">
import router from '@/router';
import { defineEmits } from 'vue';
import { ref } from 'vue';

const emits = defineEmits(['closeModal']);

const openModal = () => {
    emits('closeModal');
};

const form = ref({
    title: '',
    description: '',
    priority: '',
    status: ''
});



function createTask() {
    const request_payload = {
    title: form.value.title,
    description: form.value.description,
    priority: form.value.priority,
    status: form.value.status,
    userId: "664e21381bff24656d65fdaf"
    // userId: localStorage.getItem('token') // desencriptar token
    };

    fetch('http://localhost:8080/tasks/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // add auth bearer token
        body: JSON.stringify(request_payload)
    }).then(
        response => {
            if (!response.ok) {
                throw new Error('Error al crear la tarea');
            }
            return response.json();
        }
    ).then(data => {
        console.log(data);
        openModal();
        router.push('/tasks');
    }).catch(error => {
        console.error(error);
    });
}


</script>
<template>
<!-- Main modal -->
<div id="crud-modal" tabindex="-1" aria-hidden="true" class="bg-black bg-opacity-70 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    📈 Crear nueva tarea
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal"
                @click.prevent="openModal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <form class="p-4 md:p-5" method="POST" @submit.prevent="createTask" >
                <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titulo</label>
                        <input type="text" v-model="form.title" name="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe el titulo de la tarea aquí" required>
                    </div>
                    <div class="col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                        <textarea id="description" v-model="form.description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escribe la descripción de la tarea aquí"></textarea>                    
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="priority" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prioridad</label>
                        <select id="priority" v-model="form.priority" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option value="Baja">Baja</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                        </select>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
                        <select id="status" v-model="form.status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option value="Por hacer">Por hacer</option>
                            <option value="En progreso">En progreso</option>
                            <option value="Hecho">Hecho</option>
                        </select>
                    </div>
                </div>
                <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click.prevent="createTask">
                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Agregar nueva tarea
                </button>
            </form>
        </div>
    </div>
</div> 

</template>
<script setup lang="ts">

import {ref, onMounted, defineEmits} from 'vue';
import type { Task } from '@/utils/task-interface';
import EditTask from '@/components/EditTaskModal.vue';
import DelTask from '@/components/DeleteTaskModal.vue';
import {useStore} from '@/utils/store';

    const store = useStore();

    let tasks = ref<Task[]>([]);
    const selectedTaskId = ref<string | null>(null);

    const emits = defineEmits(['closeModal']);

    const showDelModal = ref(false);
    const showModal = ref(false);

    const openModal = (taskId: string) => {
        selectedTaskId.value = taskId;
        showModal.value = true;
    };
    const openDelModal = (taskId: string) => {
        selectedTaskId.value = taskId;
        showDelModal.value = true;
    };

    const closeModal = () => {
        showModal.value = false;
        selectedTaskId.value = null;
        emits('closeModal');
    };
    const closeDelModal = () => {
        showDelModal.value = false;
        selectedTaskId.value = null;
        emits('closeModal');
    };

    async function loadTableData(){
        try { //'http://localhost:8080/tasks/user/664e21381bff24656d65fdaf'
            const response = await fetch('http://localhost:3002/api/v1/tasks/user', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
            });

            if (!response.ok) {
            throw new Error('Error al obtener las tareas');
            }

            const data = await response.json();
            console.log(data.tasks);
            tasks.value = data.tasks;
        } catch (error) {
            console.error(error);
        }
    }

    onMounted(() => {
        store.fun = loadTableData;
        loadTableData();
    });

    const setStatusTagColor = (status: string) => {
        switch (status) {
            case 'Por hacer':
            return 'bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300';
            case 'En progreso':
            return 'bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300';
            case 'Hecho':
            return 'bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300';
            default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const setPriority = (priority: string) =>{
        switch(priority){
            case 'Alta':
                return 'bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-pink-400 border border-pink-400';
            case 'Media':
                return 'bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400';
            case 'Baja':
                return 'bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400';
            default:
                return 'bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400';
        }
    }
    
</script>

<template>
    <div class="w-10/12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-96">
        <table class="w-full table-fixed">
            <thead class="table w-full table-layout-fixed text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                <tr>
                    <th scope="col" class="px-6 py-3 w-1/5">
                        Titulo
                    </th>
                    <th scope="col" class="px-6 py-3 w-1/5">
                        Prioridad
                    </th>
                    <th scope="col" class="px-6 py-3 w-1/5">
                        Descripción
                    </th>
                    <th scope="col" class="px-6 py-3 w-1/5">
                        Estado
                    </th>
                    <th scope="col" class="px-6 py-3 w-1/6">
                        Acción
                    </th>
                </tr>
            </thead>
            <tbody class="block max-h-96  w-full overflow-auto relative">
                <tr v-for="task in tasks" :key="task.id" :class="{ 'table w-full table-layout-fixed odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700': true }">
                    <th scope="row" class="px-6 py-3 w-1/5 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ task.title }}
                    </th>
                    <td scope="row" class="px-6 py-4 w-1/5">
                        <span :class="setPriority(task.priority)">{{ task.priority }}</span>
                    </td>
                    <td scope="row" class="px-6 py-4 w-1/5">
                        {{ task.description }}
                    </td>
                    <td scope="row" class="px-6 py-4 w-1/5">
                        <span :class="setStatusTagColor(task.status)">{{ task.status }}</span>
                    </td>
                    <td scope="row" class="px-6 py-4 w-1/6">
                        <button id="edit" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        @click.prevent="openModal(task.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </button>
                        <button id="delete" type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        @click.prevent="openDelModal(task.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <DelTask :taskId="selectedTaskId" v-if="showDelModal" @close-modal="closeDelModal"/>
    <EditTask :taskId="selectedTaskId" v-if="showModal" @close-modal="closeModal"/>
</template>

<style>
::-webkit-scrollbar {
    @apply w-1;
}
::-webkit-scrollbar-track {
    @apply bg-gray-600 rounded;
}
::-webkit-scrollbar-thumb {
    @apply bg-gray-400 rounded;
}
::-webkit-scrollbar-thumb:hover {
    @apply bg-blue-700;
}
</style>

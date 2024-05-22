<script setup lang="ts">

import {ref, onMounted} from 'vue';
import type { Task } from '@/utils/task-interface';

    let tasks = ref<Task[]>([]);

    onMounted(async () => {
    try {
        const response = await fetch('http://localhost:8080/tasks/user/664e21381bff24656d65fdaf', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        });

        if (!response.ok) {
        throw new Error('Error al obtener las tareas');
        }

        const data = await response.json();
        // console.log(data.tasks);
        tasks.value = data.tasks;
    } catch (error) {
        console.error(error);
    }
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
    <div class="fixed overflow-x-auto shadow-md sm:rounded-lg w-screen p-20  flex items-center justify-center">
        <table class="w-3/5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Titulo
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Prioridad
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Descripción
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Estado
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Acción
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in tasks" :key="task.id" :class="{ 'odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700': true }">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ task.title }}
                    </th>
                    <td class="px-6 py-4">
                        <span :class="setPriority(task.priority)">{{ task.priority }}</span>
                    </td>
                    <td class="px-6 py-4">
                    {{ task.description }}
                    </td>
                    
                    <td class="px-6 py-4">
                        <span :class="setStatusTagColor(task.status)">{{ task.status }}</span>
                    </td>
                    <td class="px-6 py-4">
                        <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Editar</button>
                        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar</button>
                    </td>
                    
                </tr>
                </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
import router from '@/router';
import { ref, defineEmits } from 'vue';
import StoreTask from '@/components/StoreTaskModal.vue';

const showModal = ref(false);

const emits = defineEmits(['closeModal']);

const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  emits('closeModal');
};
</script>
<template>
    <nav class="fixed w-full z-20 top-0 start-0">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <img src="@/assets/allay-menu.webp" class="h-8" alt="Flowbite Logo">
            <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button type="button" class="m-5 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    @click.prevent="openModal">Agregar Tarea</button>
                <button type="button" class="m-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click.prevent="router.push('/')">Cerrar sesión</button>
            </div>
        </div>
    </nav>
    <StoreTask v-if="showModal" @close-modal="closeModal" />
</template>
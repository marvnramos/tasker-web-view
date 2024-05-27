<script setup lang="ts">
    import NavMenu from '@/components/NavMenu.vue';
    import Table from '@/components/Table.vue';
    import router from '@/router';

    const token = localStorage.getItem('token');
    if (!token) {
        router.push('/not-found');
    }
</script>
<template>
    <div class="absolute flex items-center justify-center h-screen w-screen">
        <NavMenu/>
        <Table/>
    </div>
</template>
<script setup lang="ts">
    import NavMenu from '@/components/NavMenu.vue';
    import Table from '@/components/Table.vue';
    import router from '@/router';

    // const validateAuth = () => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         router.push('/');
    //     }
    // };

    // validateAuth();

//     <table>
//   <!-- ... -->
//   <tbody>
//     {#each people as person}
//       <!-- Use a white background for odd rows, and slate-50 for even rows -->
//       <tr class="odd:bg-white even:bg-slate-50">
//         <td>{person.name}</td>
//         <td>{person.title}</td>
//         <td>{person.email}</td>
//       </tr>
//     {/each}
//   </tbody>
// </table>


</script>
<template>
    <div class="absolute flex items-center justify-center h-screen w-screen">
        <NavMenu/>
        <Table/>
    </div>
</template>
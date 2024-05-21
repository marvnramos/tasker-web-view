
<template>
    <div class="flex items-center justify-center h-screen w-screen">
     <div class="flex items-center justify-center bg-[#FCFFE0] rounded-lg w-700">
         <div class=" w-500 m-10">
             <img alt="Vue logo" class="logo" src="@/assets/login-frog.webp" width="250" height="250" />
         </div>
         <div class="auth  p-10 bg-[#7ABA78] rounded-r-lg">
             <h1 class="text-[#0A6847] flex items-center justify-center font-urbanist"><b>Login</b></h1>
             <form class="max-w-sm mx-auto">
                 <div class="mb-5">
                     <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                     <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#4F6F52] dark:border-[#4F6F52] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@example.com" required />
                 </div>
                 <div class="mb-5">
                     <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                     <input type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#4F6F52] dark:border-[#4F6F52] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                 </div>
                 <div class="mb-5">
                     <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                     <input type="password" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#4F6F52] dark:border-[#4F6F52] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                 </div>
                 <div class="flex items-start mb-5">
                     <div class="flex items-center h-5">
                         <input id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                     </div>
                 </div>
                 <button type="submit" class="text-white bg-[#799351] hover:bg-[#1A4D2E] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#0A6847] dark:hover:bg-blue dark:focus:ring-blue-800">Register new account</button>
             </form>
         </div>
     </div>
    </div>
 </template>
import { defineStore } from "pinia";
import { ref } from "vue";
import type {Ref} from "vue";

export const useStore = defineStore("store", () => {
    const fun: Ref<Function> = ref(()=>{});

    return {
        fun
    };
});
<template>
    <nav class="bg-white dark:bg-gray-800 shadow-md">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
                <!-- Logo -->
                <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <router-link to="/dashboard" class="flex-shrink-0 text-2xl font-semibold text-gray-800 dark:text-white">
                        Todo App
                    </router-link>
                </div>

                <!-- Tombol Toggle Menu untuk Mobile -->
                <button @click="toggleMenu"
                    class="lg:hidden text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span class="sr-only">Open main menu</span>
                    <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <!-- Menu Items (Desktop & Mobile) -->
                <div :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen, 'lg:block': true }" class="lg:flex lg:ml-auto">
                    <div class="flex space-x-4">
                        <router-link to="/dashboard" class="text-gray-800 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400">Dashboard</router-link>
                        <router-link to="/profile" class="text-gray-800 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400">Profile</router-link>
                        <button @click="logout" class="text-gray-800 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400">Logout</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Dropdown Menu untuk Mobile -->
        <div v-if="isMenuOpen" class="lg:hidden bg-white dark:bg-gray-800 shadow-md mt-2 transition-all transform origin-top-right z-10">
            <div class="flex flex-col space-y-2 p-4">
                <router-link to="/dashboard" class="text-gray-800 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400">Dashboard</router-link>
                <router-link to="/profile" class="text-gray-800 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400">Profile</router-link>
                <button @click="logout" class="text-gray-800 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400">Logout</button>
            </div>
        </div>
    </nav>
</template>


<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

const store = useStore();
const isMenuOpen = ref(false);
const router = useRouter()

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const logout = async () => {
    await store.dispatch('logout')
    router.push('/login')
};
</script>

<style scoped>
.transition-all {
    transition: all 0.3s ease-in-out;
}

.origin-top-right {
    transform-origin: top right;
}

/* Untuk mobile */
@media (max-width: 1024px) {
    .lg\:block {
        display: none;
    }

    .lg\:hidden {
        display: block;
    }
}
</style>

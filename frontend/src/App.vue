<script setup>
import { onMounted, ref, watch, provide } from 'vue'
import Navbar from './components/Navbar.vue'

import './style.css'
const isDarkMode = ref(localStorage.getItem('darkMode') === 'true')

// Watcher untuk mengubah kelas "dark" di document saat isDarkMode berubah
watch(isDarkMode, (newVal) => {
  localStorage.setItem('darkMode', newVal)
  document.documentElement.classList.toggle('dark', newVal)
})

// Fungsi toggle untuk dark mode
const toggleDarkMode = async () => {
  isDarkMode.value = !isDarkMode.value;
  try {
    const token = localStorage.getItem('token');  // Token JWT untuk otentikasi
    const response = await axios.put(
      'http://localhost:8000/user/profile',  // Ganti URL dengan API backend-mu
      {
        darkMode: isDarkMode.value,  // Mengirimkan status darkMode ke backend
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Mengirimkan token di header
        }
      }
    );

  } catch (error) {
    console.error('Error updating profile with dark mode:', error);
  }
}

onMounted(() => {
  // Inisialisasi status dark mode saat halaman dimuat
  document.documentElement.classList.toggle('dark', isDarkMode.value)
})

// Menyediakan darkMode dan toggleDarkMode ke komponen lain
provide('isDarkMode', isDarkMode)
provide('toggleDarkMode', toggleDarkMode)
</script>

<template>
  <div :class="{ 'dark': isDarkMode }">
    <Navbar />
    <div class="min-h-screen bg-gray-100 dark:bg-gray-800">
      <router-view />
    </div>
  </div>
</template>

<style scoped></style>

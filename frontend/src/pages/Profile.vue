<template>
    <div :class="{ 'dark': isDarkMode }" class="min-h-screen">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-5 sm:px-0 flex justify-between items-center">
                <h1 class="text-3xl font-semibold text-gray-900 dark:text-white">Profile</h1>
                <button @click="toggleDarkMode" :class="{
                    'px-4 py-2 font-semibold rounded-md': true,
                    'bg-gray-700 text-white hover:bg-gray-800': isDarkMode,
                    'bg-white text-gray-700 hover:bg-gray-200': !isDarkMode
                }">
                    {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
                </button>
            </div>

            <div class="mt-6">
                <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                    <div class="flex flex-col sm:flex-row items-center sm:items-start">
                        <div class="flex-shrink-0">
                            <img class="h-20 w-20 rounded-full" src="../../public/cute.jpg" alt="Profile Picture">
                        </div>
                        <div class="mt-4 sm:mt-0 sm:ml-6">
                            <h2 class="text-xl font-semibold text-gray-800 dark:text-white">{{ user.name }}</h2>
                            <p class="text-gray-600 dark:text-gray-300">Email: {{ user.email }}</p>
                            <p class="text-gray-600 dark:text-gray-300">Joined: {{ formatDate(user.createdAt) }}</p>
                        </div>
                    </div>

                    <div class="mt-6 flex space-x-4">
                        <button @click="openEditModal"
                            class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            <!-- Modal Edit Profile -->
            <div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                    <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Edit Profile</h3>
                    <input v-model="editData.name" type="text" placeholder="Name"
                        class="w-full px-4 py-2 border rounded-md mb-2 dark:bg-gray-700 dark:text-white" />
                    <input v-model="editData.email" type="email" placeholder="Email"
                        class="w-full px-4 py-2 border rounded-md mb-2 dark:bg-gray-700 dark:text-white" />
                    <button @click="updateProfile"
                        class="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                        Save Changes
                    </button>
                    <button @click="isEditModalOpen = false"
                        class="w-full mt-2 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  

<script setup>
import { ref, onMounted, inject } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const isEditModalOpen = ref(false)


const isDarkMode = inject('isDarkMode')
const toggleDarkMode = inject('toggleDarkMode')

const user = ref({
    name: '',
    email: '',
    createdAt: ''
})

const editData = ref({
    name: '',
    email: ''
})

onMounted(async () => {
    try {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/login')
            return
        }

        const response = await axios.get('http://localhost:8000/user/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
        user.value = response.data
    } catch (error) {
        console.error('Failed to fetch user profile:', error)
        router.push('/login')
    }
})

const openEditModal = () => {
    editData.value = { ...user.value }
    isEditModalOpen.value = true
}

const updateProfile = async () => {
    try {
        const token = localStorage.getItem('token')
        if (!token) {
            alert('You are not logged in')
            return
        }

        const response = await axios.put('http://localhost:8000/user/profile', editData.value, {
            headers: { Authorization: `Bearer ${token}` }
        })

        user.value = response.data
        isEditModalOpen.value = false
    } catch (error) {
        console.error('Failed to update profile:', error)
        alert('Failed to update profile: ' + (error.response?.data?.message || 'Unknown error'))
    }
}

// const toggleDarkMode = async () => {
//     isDarkMode.value = !isDarkMode.value;
//     localStorage.setItem('darkMode', isDarkMode.value);
//     document.documentElement.classList.toggle('dark', isDarkMode.value);

//     try {
//         const token = localStorage.getItem('token');  // Token JWT untuk otentikasi
//         const response = await axios.put(
//             'http://localhost:8000/user/profile',  // Ganti URL dengan API backend-mu
//             {
//                 darkMode: isDarkMode.value,  // Mengirimkan status darkMode ke backend
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,  // Mengirimkan token di header
//                 }
//             }
//         );

//     } catch (error) {
//         console.error('Error updating profile with dark mode:', error);
//     }
// }

const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString()
}
</script>

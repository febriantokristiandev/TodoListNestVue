<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const store = useStore()
const router = useRouter()


onMounted(() => {
    if (store.getters.isAuthenticated) {
        router.push('/dashboard')
    }
})

const handleRegister = async () => {
    loading.value = true
    errorMessage.value = ''
    successMessage.value = ''
    try {
        const result = await store.dispatch('register', { name: name.value, email: email.value, password: password.value })
        if (result.success) {
            successMessage.value = 'Registration successful! Redirecting to login...'
            setTimeout(() => {
                router.push('/login')
            }, 2000)
        } else {
            errorMessage.value = result.message || 'An error occurred during registration.'
        }
    } catch (error) {
        if (error.response && error.response.data) {
            errorMessage.value = error.response.data.message || 'An error occurred. Please try again.'
        } else {
            errorMessage.value = 'An unknown error occurred.'
        }
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
            <h2 class="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h2>

            <!-- Show success message if registration was successful -->
            <div v-if="successMessage" class="text-green-500 text-center mb-4">
                {{ successMessage }}
            </div>

            <!-- Show error message if registration failed -->
            <div v-if="errorMessage" class="text-red-500 text-center mb-4">
                {{ errorMessage }}
            </div>

            <form @submit.prevent="handleRegister">
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-600">Name</label>
                    <input v-model="name" type="text" id="name" placeholder="Enter your name"
                        class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required />
                </div>

                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
                    <input v-model="email" type="email" id="email" placeholder="Enter your email"
                        class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required />
                </div>

                <div class="mb-6">
                    <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
                    <input v-model="password" type="password" id="password" placeholder="Enter your password"
                        class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required />
                </div>

                <button type="submit"
                    class="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :disabled="loading">
                    {{ loading ? 'Registering...' : 'Register' }}
                </button>

                <p class="mt-4 text-center text-sm text-gray-600">
                    Already have an account?
                    <router-link to="/login" class="text-blue-500 hover:underline">Login</router-link>
                </p>
            </form>
        </div>
    </div>
</template>

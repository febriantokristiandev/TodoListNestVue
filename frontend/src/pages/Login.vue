<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
            <h2 class="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>

            <!-- Tampilkan pesan error -->
            <div v-if="errorMessage" class="text-red-500 text-center mb-4">
                {{ errorMessage }}
            </div>

            <form @submit.prevent="handleLogin">
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
                    {{ loading ? 'Logging in...' : 'Login' }}
                </button>

                <p class="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?
                    <router-link to="/register" class="text-blue-500 hover:underline">Register</router-link>
                </p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const store = useStore()
const router = useRouter()

onMounted(() => {
    if (store.getters.isAuthenticated) {
        router.push('/dashboard')
    }
})

const handleLogin = async () => {
    loading.value = true
    errorMessage.value = ''
    try {
        const result = await store.dispatch('login', { email: email.value, password: password.value })
        if (result.success) {
            setTimeout(() => {
                router.push('/dashboard')
            }, 2000)
        } else {
            loading.value = false
            console.log(result)
            if (result.message == "Invalid credentials") {
                errorMessage.value = 'Username or password incorrect'
            } else {
                errorMessage.value = result.message || 'An error occurred during login.'
            }
        }
    } catch (error) {
        loading.value = false
        console.error('Login failed:', error)
        errorMessage.value = 'Login failed: ' + error.message
    } finally {
        // loading.value = false
    }
}
</script>

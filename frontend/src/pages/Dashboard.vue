<template>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <!-- Header -->
            <div class="px-4 py-5 sm:px-0">
                <h1 class="text-3xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
            </div>

            <!-- Content Section -->
            <div class="mt-6">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-2xl p-6">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Tasks Overview</h2>

                    <button @click="showCreateTodoModal = true"
                        class="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                        + Add New Task
                    </button>

                    <!-- Dropdown Filter Status -->
                    <div class="mt-4">
                        <label for="statusFilter" class="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by
                            Status</label>
                        <select id="statusFilter" v-model="statusFilter"
                            class="mt-2 px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg">
                            <option value="">All</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>

                    <ul class="mt-4 space-y-3">
                        <!-- Filtered Todo List -->
                        <li v-for="todo in filteredTodos" :key="todo.id"
                            class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg flex justify-between items-center">
                            <span class="text-gray-800 dark:text-gray-200">
                                {{ todo.title }} -
                                <span
                                    :class="{ 'text-green-500': todo.status === 'Completed', 'text-red-500': todo.status !== 'Completed' }">
                                    {{ todo.status === 'Completed' ? 'Completed' : 'Pending' }}
                                </span>
                                <!-- Display priority -->
                                <span class="ml-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                                    | Priority:
                                    <span :class="{
                                        'text-red-500': todo.priority === 'High',
                                        'text-yellow-500': todo.priority === 'Medium',
                                        'text-green-500': todo.priority === 'Low'
                                    }">
                                        {{ todo.priority }}
                                    </span>
                                </span>
                            </span>
                            <div class="space-x-2">
                                <button v-if="todo.status !== 'Completed'" @click="markAsDone(todo.id)"
                                    class="text-green-500 hover:text-green-700 transition">
                                    ✅ Done
                                </button>
                                <button v-if="todo.status !== 'Completed'" @click="editTodo(todo)"
                                    class="text-yellow-500 hover:text-yellow-700 transition">
                                    ✏️ Edit
                                </button>
                                <button @click="deleteTodo(todo.id)" class="text-red-500 hover:text-red-700 transition">
                                    🗑️ Delete
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>

    <!-- Create Todo Modal -->
    <div v-if="showCreateTodoModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
            <h3 class="text-2xl font-semibold text-gray-800 dark:text-white">Create New Todo</h3>
            <form @submit.prevent="createTodo">
                <div class="mt-4">
                    <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                    <input v-model="todoForm.title" type="text" id="title"
                        class="mt-2 p-2 w-full border border-gray-300 rounded-md" required />
                </div>

                <div class="mt-4">
                    <label for="description"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                    <textarea v-model="todoForm.description" id="description" rows="3"
                        class="mt-2 p-2 w-full border border-gray-300 rounded-md" required></textarea>
                </div>

                <div class="mt-4">
                    <label for="priority"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
                    <select v-model="todoForm.priority" id="priority"
                        class="mt-2 p-2 w-full border border-gray-300 rounded-md">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div class="mt-4 flex justify-end">
                    <button @click="closeModal" class="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg">Create</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Edit Todo Modal -->
    <div v-if="showEditTodoModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
            <h3 class="text-2xl font-semibold text-gray-800 dark:text-white">Edit Todo</h3>
            <form @submit.prevent="updateTodo">
                <div class="mt-4">
                    <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                    <input v-model="todoForm.title" type="text" id="title"
                        class="mt-2 p-2 w-full border border-gray-300 rounded-md" required />
                </div>

                <div class="mt-4">
                    <label for="description"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                    <textarea v-model="todoForm.description" id="description" rows="3"
                        class="mt-2 p-2 w-full border border-gray-300 rounded-md" required></textarea>
                </div>

                <div class="mt-4">
                    <label for="priority"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
                    <select v-model="todoForm.priority" id="priority"
                        class="mt-2 p-2 w-full border border-gray-300 rounded-md">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div class="mt-4 flex justify-end">
                    <button @click="closeModal" class="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg">Update</button>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import socketService from '@/services/socket'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
const todos = ref([])
const showCreateTodoModal = ref(false)
const showEditTodoModal = ref(false)
const isEditMode = ref(false)
const isDarkMode = ref(localStorage.getItem('darkMode') === 'true')

const user = computed(() => store.getters.getUser)
const userId = computed(() => user.value?.id || null)

const todoForm = ref({
    id: null,
    userId: userId.value,
    title: '',
    description: '',
    priority: 'Medium',
})

onMounted(async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        await store.dispatch('fetchUserProfile');

        if (!store.getters.getUser) {
            store.dispatch('logout');
            console.error('User data not available');
            router.push('/login');
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        store.dispatch('logout');
        router.push('/login');
    }

    fetchTodos()
    socketService.connect()

    socketService.onTodoCreated(newTodo => {
        todos.value.push(newTodo)
    })
    socketService.onTodoUpdated(updatedTodo => {
        const index = todos.value.findIndex(todo => todo.id === updatedTodo.id)
        if (index !== -1) {
            todos.value.splice(index, 1, updatedTodo)
        }
    })
    socketService.onTodoDeleted(deletedTodo => {
        console.log("Received deleted todo:", deletedTodo);
        todos.value = todos.value.filter(todo => todo.id !== deletedTodo.id);
    });


    socketService.onTodoMarkedAsDone(updatedTodo => {
        const index = todos.value.findIndex(todo => todo.id === updatedTodo.id)
        if (index !== -1) {
            todos.value[index] = updatedTodo
        }
    })
})

const openCreateTodoModal = () => {
    showCreateTodoModal.value = true;
    showEditTodoModal.value = false; // Pastikan modal Edit disembunyikan
};

const openEditTodoModal = () => {
    showEditTodoModal.value = true;
    showCreateTodoModal.value = false; // Pastikan modal Create disembunyikan
};

const fetchTodos = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:8000/todo', {
            headers: { Authorization: `Bearer ${token}` }
        })
        todos.value = response.data
    } catch (error) {
        console.error('Error fetching todos:', error)
    }
}

const createTodo = () => {
    if (!userId.value) {
        console.error('User ID is missing!');
        return;
    }

    const newTodo = { ...todoForm.value, userId: userId.value };
    socketService.createTodo(newTodo);
    closeModal();
};

const updateTodo = () => {
    console.log(todoForm.value)
    if (!todoForm.value.id || !userId.value) {
        console.error("Todo ID or User ID is missing!");
        return;
    }

    const newTodo = { ...todoForm.value, userId: userId.value };
    socketService.updateTodo(newTodo);
    closeModal();
}

const deleteTodo = (id) => {
    if (!id || !userId.value) {
        console.error("Todo ID or User ID is missing!");
        return;
    }

    socketService.deleteTodo({ id, userId: userId.value });
}

const markAsDone = (id) => {
    if (!id || !userId.value) {
        console.error("Todo ID or User ID is missing!");
        return;
    }

    socketService.markAsDone({ id, userId: userId.value });
}

const editTodo = (todo) => {
    isEditMode.value = true;
    todoForm.value = { ...todo }; // User ID tetap
    showEditTodoModal.value = true;
}

// ✅ Close modal dikembalikan ke versi sebelumnya
const closeModal = () => {
    showCreateTodoModal.value = false;
    showEditTodoModal.value = false;
    todoForm.value = { id: null, title: '', description: '', priority: 'Medium' };
}



const statusFilter = ref(""); // Status filter state (All, Completed, Pending)


// Computed property to filter todos based on status filter
const filteredTodos = computed(() => {
    if (statusFilter.value === "") {
        return todos.value; // No filter, return all todos
    }
    return todos.value.filter(todo => todo.status === statusFilter.value);
});
</script>

  
<style scoped>
/* Additional custom styles for dashboard can be added here */
</style>
  
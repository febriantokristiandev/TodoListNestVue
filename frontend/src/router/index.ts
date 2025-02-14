// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Profile from '../pages/Profile.vue'
import Dashboard from '../pages/Dashboard.vue'

const routes = [
    { path: '/', component: Login, meta: { requiresNavbar: false } },
    { path: '/login', component: Login, meta: { requiresNavbar: false } },
    { path: '/register', component: Register, meta: { requiresNavbar: false } },
    { path: '/profile', component: Profile, meta: { requiresNavbar: true } },
    { path: '/dashboard', component: Dashboard, meta: { requiresNavbar: true } },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

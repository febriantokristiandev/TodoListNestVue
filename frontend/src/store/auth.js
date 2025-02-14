import axios from 'axios'

export default {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || '',
    }),
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setToken(state, token) {
            state.token = token
        },
        logout(state) {
            state.token = ''
            state.user = null
        }
    },
    actions: {
        async login({ commit }, { email, password }) {
            try {
                const response = await axios.post('http://localhost:8000/auth/login', { email, password })
                const token = response.data.access_token
                const user = response.data.user
                commit('setToken', token)
                commit('setUser', user)
                localStorage.setItem('token', token)
                return { success: true, data: response.data }
            } catch (error) {
                console.error('Login failed:', error)
                return { success: false, message: error.response ? error.response.data.message : 'Login failed' }
            }
        },
        async register({ commit }, { name, email, password }) {
            try {
                const response = await axios.post('http://localhost:8000/auth/register', { name, email, password })
                const token = response.data.token
                const user = response.data.user
                commit('setToken', token)
                commit('setUser', user)
                localStorage.setItem('token', token)
                return { success: true, data: response.data }
            } catch (error) {
                console.error('Registration failed:', error)
                return { success: false, message: error.response ? error.response.data.message : 'Registration failed' }
            }
        },
        logout({ commit }) {
            commit('logout')
            localStorage.removeItem('token')
        },
        async fetchUserProfile({ commit, state }) {
            try {
                const response = await axios.get('http://localhost:8000/user/profile', {
                    headers: { Authorization: `Bearer ${state.token}` }
                })
                commit('setUser', response.data)
            } catch (error) {
                console.error('Failed to fetch user profile:', error)
                if (error.response && error.response.status === 401) {
                    commit('logout')
                    localStorage.removeItem('token')
                }
            }
        }
    },
    getters: {
        isAuthenticated(state) {
            return !!state.token
        },
        getUser(state) {
            return state.user
        }
    }
}

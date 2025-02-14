import io from 'socket.io-client';

const socket = io('http://localhost:8000');

export default {
    socket,

    connect() {
        socket.connect();

        socket.on('connect', () => {
            console.log('Socket connected');
        });

        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });
    },


    disconnect() {
        socket.disconnect();
    },

    onTodoCreated(callback) {
        socket.on('todoCreated', callback);
    },

    onTodoUpdated(callback) {
        socket.on('todoUpdated', callback);
    },

    onTodoDeleted(callback) {
        socket.on('todoDeleted', callback);
    },

    onTodoMarkedAsDone(callback) {
        socket.on('todoMarkedAsDone', callback);
    },

    createTodo(todo) {
        socket.emit('createTodo', todo);
    },

    updateTodo(todo) {
        socket.emit('updateTodo', todo);
    },

    deleteTodo({ id, userId }) {
        socket.emit('deleteTodo', { id, userId });
    },


    markAsDone({ id, userId }) {
        socket.emit('markAsDone', { id, userId });
    }
};

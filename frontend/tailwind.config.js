// tailwind.config.js
module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}', // Menambahkan jalur file Vue
    ],
    theme: {
        extend: {
            // Konfigurasi tema jika perlu
        },
    },
    darkMode: 'class', // Mengaktifkan dark mode dengan menggunakan kelas 'dark'
    plugins: [],
}

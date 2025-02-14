  Project Todo App

Project Todo App
================

Aplikasi Todo yang terhubung dengan backend untuk menyimpan data dan mengelola status tugas. Frontend menggunakan **Vue.js** dan Tailwind CSS, sementara backend menggunakan **NestJS**.

Prasyarat
---------

Sebelum memulai, pastikan kamu sudah menginstall:

*   [Node.js](https://nodejs.org/en/) (versi 14.x atau lebih tinggi)
*   [npm](https://www.npmjs.com/) (termasuk dalam instalasi Node.js)

Instalasi
---------

### 1\. Backend

Backend menggunakan **NestJS** dan menggunakan database SQL. Pastikan kamu sudah mengatur database dan mengonfigurasi koneksi ke database.

1.  Buka terminal, kemudian arahkan ke folder `backend`.

    cd backend

3.  Install dependencies yang dibutuhkan oleh backend dengan menjalankan perintah berikut:

    npm install

5.  Pastikan koneksi database sudah dikonfigurasi dengan benar di `src/app.module.ts` atau file konfigurasi yang sesuai.
6.  Jalankan backend dengan perintah:

    npm run start:dev

Backend akan berjalan di port **8000**. Kamu dapat mengakses API-nya di [http://localhost:8000/](http://localhost:8000/).

### 2\. Frontend

Frontend menggunakan **Vue.js** dan Tailwind CSS untuk styling.

1.  Buka terminal, kemudian arahkan ke folder `frontend`.

    cd frontend

3.  Install dependencies yang dibutuhkan oleh frontend dengan menjalankan perintah berikut:

    npm install

5.  Jalankan frontend dengan perintah:

    npm run dev

Frontend akan berjalan di port **5173**. Kamu dapat mengakses aplikasi di [http://localhost:5173/](http://localhost:5173/).

Akses Aplikasi
--------------

*   **Frontend**: [http://localhost:5173/](http://localhost:5173/)
*   **Backend**: [http://localhost:8000/](http://localhost:8000/)

Penjelasan Perintah:
--------------------

*   `npm install`: Menginstal semua dependencies yang dibutuhkan oleh project (baik di frontend maupun backend).
*   `npm run dev`: Menjalankan aplikasi frontend dalam mode pengembangan.
*   `npm run start:dev`: Menjalankan backend dalam mode pengembangan (hot-reloading).
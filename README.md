# Cara Menjalankan Program

## Soal 1

1. Buka Text Editor
2. Masuk ke folder soal1
3. Buka index.html
4. Klik kanan pilih 'Open with Live Server' (Harus terinstall Ekstensi Live Server )

## Soal 2

1. Buka Text Editor
2. Masuk ke folder soal2
3. Buka terminal
4. jalankan 'npm install'
5. Buat database MySql dengan nama bebas
6. Jalankan perintah mysql -u [username] -p[password] [database_name] < src\database\test_overview.sql
7. Atur .env sesuai dengan datasbase
8. jalankan perintah 'npm run dev'
9. Atau dibuild terlebih dahulu dengan 'npm run build'
10. Kemudian jalankan 'npm run start'

- List endpoint API:
  - GET / :
    - Mencoba Koneksi server
  - GET /user :
    - Mengambil data semua pengguna
  - GET /user/id
    - Mengambil data pengguna dengan berdasarkan id
  - Post /user:
    - Membuat data pengguna
    - Contoh body yang dapt diterima : {
      "name": "Cakra Kusuma",
      "email": "<cakra@gmail.com>"
      "password": "inipassword123"
      }
  - DELETE user/id:
    - Menghapus pengguna berdasarkan id

## Soal 3

1. Buka Text Editor
2. Masuk ke folder soal3
3. Buka terminal
4. Masukkan perintah 'node app.js'

## Soal 4

1. Buka Text Editor
2. Masuk ke folder soal4
3. Buka terminal
4. Masukkan perintah 'node app.js'

# TUTORIAL GIT BASH

# INSTALASI & START FOLDER BARU (HARUS BUAT REPO DAHULU DI WEB GITHUB)

======================================================================
cd lokasiMauBuatFolder>> mkdir namaFolder >> cd namaFolder

git config --global user.email "aktifitasumum@gmail.com" <== Login ke github via gitbash

git remote add origin https://github.com/aktifitasumum/namaFolder.git <== Remote ke repository

git init <== Aktifkan git di folder tersebut

# JIKA MAU DOWNLOAD DARI REPO KE LOCAL

======================================
git clone https://github.com/aktifitasumum/namaFolder.git <== Copy file repositori di Github ke Lokal Computer (Download)

# JIKA MAU UPDATE DARI REPO KE LOCAL

===================================
git pull origin main <== Update dari Repository ke Local

# JIKA MAU UPDATE DARI LOCAL KE REPO

==================================
git add . (atau) git add \* <== Menambahkan semua isi folder ke perencanaan upload ke github

git commit -m "keterangan" <== Commit atau upload

git push -u origin main <== Update data ke github "main" sebagai nama branch di github

git add . && git commit -m "versi 1 calc blending" && git push -u origin main <== combo git push

# KONDISI DILUAR KEBIASAAN

=========================

git status <== Cek status isi atau file local Computer

git reset <== Reset command git kadang ada yang salah atau ada file yang ingin tidak di commit atau terlewat di add

git reset --hard <== Jika tidak ingin melakukan perubahan apa2, alias mau mengembalikan semua file seperti yang ada di repository saat ini.

git add . >>> akan memasukkan semua folder walaupun ada (.gitaddignore)

git add \* >>> akan memasukkan semua folder kecuali folder yang ada (.gitaddignore)

# TUTORIAL CMD

===============
D: atau E: //pindah ke drive lain
dir // untuk tampilkan isi folder
md atau mkdir namaFolder // membuat folder baru
md namaFolder1 namaFolder2 //membuat 2 folder
md D:\namaFolder\subFolder\
rd namaFolder //Hapus Folder
del namafile //hapus file

copy con namaFile.txt // membuat file baru beserta isinya lalu ctrl+z dan enter
namaFile.txt untuk buka file

copy namaFile.txt d:\namaFolder\folderSub\ // copy file to folder lain
move namaFile.txt tujuanFolder

ren namaFile.txt namaFileHasilRename.txt //rename file

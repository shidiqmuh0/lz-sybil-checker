const fs = require('fs');

// Fungsi untuk membaca file teks dan mengonversinya ke JSON
function convertTxtToJson(txtFilePath, jsonFilePath) {
    // Membaca file teks secara asinkron
    fs.readFile(txtFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Gagal membaca file: ${err}`);
            return;
        }

        // Memisahkan setiap baris, menghapus whitespace tambahan, dan mengonversi ke objek
        const evmAddresses = data.split('\n')
                                 .map((line, index) => ({
                                     id: index + 1,
                                     evm: line.trim()
                                 }))
                                 .filter(obj => obj.evm.length > 0); // Menghilangkan baris kosong

        // Mengonversi array objek ke string JSON
        const jsonContent = JSON.stringify(evmAddresses, null, 4);

        // Menyimpan string JSON ke file
        fs.writeFile(jsonFilePath, jsonContent, 'utf8', (err) => {
            if (err) {
                console.error(`Gagal menulis file: ${err}`);
                return;
            }
            console.log(`Berhasil mengonversi ${txtFilePath} ke ${jsonFilePath}`);
        });
    });
}

// Penggunaan fungsi
const txtFilePath = 'initialList.txt';
const jsonFilePath = 'initialList.json';
convertTxtToJson(txtFilePath, jsonFilePath);

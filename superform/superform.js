const fs = require('fs');
const Papa = require('papaparse');

// Fungsi untuk membaca file CSV dan mengonversinya ke JSON
function convertCsvToJson(csvFilePath, jsonFilePath) {
    fs.readFile(csvFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the CSV file:', err);
            return;
        }

        // Menggunakan PapaParse untuk mengonversi CSV ke JSON
        Papa.parse(data, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                // Mengubah data menjadi format yang diinginkan
                const formattedData = results.data.map((row, index) => ({
                    id: index + 1,
                    address: row['Address'] ? row['Address'].trim() : undefined,
                    allocation: row['Allocation %'] ? row['Allocation %'].trim() : undefined
                }));

                // Logging untuk debugging, menampilkan hasil format JSON
                console.log('Data JSON:', formattedData);

                // Menulis data yang telah diformat ke file JSON
                fs.writeFileSync(jsonFilePath, JSON.stringify(formattedData, null, 2));
                
                console.log(`File JSON berhasil disimpan di ${jsonFilePath}`);
            }
        });
    });
}

// Contoh penggunaan fungsi
const csvFilePath = 'superform.csv'; // Ganti dengan path ke file CSV Anda
const jsonFilePath = 'output.json'; // Ganti dengan path ke file JSON output

convertCsvToJson(csvFilePath, jsonFilePath);

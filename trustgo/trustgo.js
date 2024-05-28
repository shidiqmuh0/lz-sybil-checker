const xlsx = require('xlsx');
const fs = require('fs');

function convertXlsxToJson(inputFilePath, outputFilePath) {
    // Baca file XLSX
    const workbook = xlsx.readFile(inputFilePath);
    
    // Ambil sheet pertama
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Konversi sheet menjadi JSON
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    // Format ulang data JSON sesuai dengan struktur yang diinginkan
    const formattedData = jsonData.map((row, index) => ({
        id: index + 1,  // id berdasarkan urutan baris, mulai dari 1
        evm: row[0]    // evm diambil dari nilai di sel
    }));

    // Simpan hasil konversi ke file JSON
    fs.writeFileSync(outputFilePath, JSON.stringify(formattedData, null, 2));
}

// Contoh penggunaan fungsi

const inputFilePath = 'trustgo.xlsx';
const outputFilePath = 'trustgo.json';

convertXlsxToJson(inputFilePath, outputFilePath);

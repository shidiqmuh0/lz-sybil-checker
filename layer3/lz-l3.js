const fs = require('fs');
const csv = require('csv-parser');

const inputFile = 'lz-l3.csv'; // Ganti dengan nama file CSV Anda
const outputFile = 'output.json'; // Nama file untuk menyimpan output JSON

let jsonData = [];

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    // Mengubah data sesuai struktur JSON yang diinginkan
    let jsonRecord = {
      id: jsonData.length + 1, // ID bisa diganti sesuai kebutuhan
      wallet: row['Wallet Address'],
      cubes: parseInt(row['Total CUBEs Minted']), // Pastikan jumlah CUBEs bertipe integer
      allocation: parseFloat(row['Allocation']) // Pastikan alokasi bertipe float jika perlu
    };
    jsonData.push(jsonRecord);
  })
  .on('end', () => {
    // Menyimpan data JSON ke file
    fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));
    console.log(`Successfully converted CSV to JSON. Output saved to ${outputFile}`);
  });

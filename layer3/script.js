fetch('output.json')
    .then(response => response.json())
    .then(data => {
        // Mengubah struktur data ke format yang diharapkan
        const formattedData = data.map(item => ({
            address: item.wallet,  // Mengubah "wallet" menjadi "address"
            cubes: item.cubes,
            allocation: item.allocation  // Mengambil nilai "allocation"
        }));

        window.allocationData = formattedData;  // Menyimpan data di window

        // Memanggil fungsi checkAllocation setelah data diambil
        checkAllocation();
    })
    .catch(error => console.error('Error fetching the data:', error));

function checkAllocation() {
    const addressInput = document.getElementById('addressInput').value.trim();
    const resultDiv = document.getElementById('result');
    const allocationData = window.allocationData;

    const found = allocationData.find(item => item.address.toLowerCase() === addressInput.toLowerCase());

    if (found) {
        // Menampilkan hasil dengan format baru
        resultDiv.innerHTML = `Wallet: ${found.address}<br>Cubes: ${found.cubes}<br>Allocation: ${found.allocation}`;
        resultDiv.style.color = 'green';
    } else {
        resultDiv.innerHTML = 'Address not found!';
        resultDiv.style.color = 'red';
    }
}

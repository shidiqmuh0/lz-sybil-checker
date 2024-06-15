// Membaca data dari file JSON
fetch('output.json')
    .then(response => response.json())
    .then(data => {
        window.allocationData = data;
    })
    .catch(error => console.error('Error fetching the data:', error));

function checkAllocation() {
    const addressInput = document.getElementById('addressInput').value.trim();
    const resultDiv = document.getElementById('result');
    const allocationData = window.allocationData;

    const found = allocationData.find(item => item.wallet.toLowerCase() === addressInput.toLowerCase());

    if (found) {
        resultDiv.innerHTML = `Wallet: ${found.wallet}<br>Date: ${found.date}<br>You're Early`;
        resultDiv.style.color = 'green';
    } else {
        resultDiv.innerHTML = "Wallet not found! <br> You're Late Bozzo";
        resultDiv.style.color = 'red';
    }
}

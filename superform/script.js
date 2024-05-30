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

    const found = allocationData.find(item => item.address.toLowerCase() === addressInput.toLowerCase());

    if (found) {
        resultDiv.innerHTML = `Address: ${found.address}<br>Allocation: ${found.allocation}`;
    } else {
        resultDiv.innerHTML = 'Address not found!';
    }
}

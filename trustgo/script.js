// Memuat data JSON
let sybilAddresses = [];

fetch('trustgo.json')
    .then(response => response.json())
    .then(data => {
        sybilAddresses = data;
    })
    .catch(error => console.error('Error loading JSON:', error));

function checkAddress() {
    const addressInput = document.getElementById('addressInput').value.trim();
    const resultElement = document.getElementById('result');

    const isSybil = sybilAddresses.some(addressObj => addressObj.evm.toLowerCase() === addressInput.toLowerCase());

    if (isSybil) {
        resultElement.textContent = 'The address is Reported by TrustGo (Rumor).';
        resultElement.style.color = 'red';
    } else {
        resultElement.textContent = 'The address is NOT Reported by TrustGo (Rumor).';
        resultElement.style.color = 'green';
    }
}

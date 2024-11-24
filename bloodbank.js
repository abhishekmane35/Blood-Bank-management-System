// Donor Registration
document.getElementById('donorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let bloodGroup = document.getElementById('bloodGroup').value;
    let contact = document.getElementById('contact').value;

    let donor = {
        name: name,
        bloodGroup: bloodGroup,
        contact: contact
    };

    let donors = JSON.parse(localStorage.getItem('donors')) || [];
    donors.push(donor);
    localStorage.setItem('donors', JSON.stringify(donors));

    updateDonorList();
    updateInventory();
    this.reset();
});

// Update Donors List
function updateDonorList() {
    let donors = JSON.parse(localStorage.getItem('donors')) || [];
    let donorList = document.getElementById('donorList');
    donorList.innerHTML = '';

    donors.forEach(function(donor, index) {
        let listItem = document.createElement('li');
        listItem.textContent = `Name: ${donor.name}, Blood Group: ${donor.bloodGroup}, Contact: ${donor.contact}`;
        donorList.appendChild(listItem);
    });
}

// Update Blood Inventory
function updateInventory() {
    let donors = JSON.parse(localStorage.getItem('donors')) || [];
    let inventory = {};

    donors.forEach(function(donor) {
        if (inventory[donor.bloodGroup]) {
            inventory[donor.bloodGroup]++;
        } else {
            inventory[donor.bloodGroup] = 1;
        }
    });

    let inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = '';

    for (let bloodGroup in inventory) {
        let listItem = document.createElement('li');
        listItem.textContent = `Blood Group: ${bloodGroup}, Units: ${inventory[bloodGroup]}`;
        inventoryList.appendChild(listItem);
    }
}

// Initialize
updateDonorList();
updateInventory();
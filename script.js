const countrySelect = document.getElementById('countrySelect');
const citySelect = document.getElementById('citySelect');
const bloodList = document.getElementById('bloodList');
const hospitalList = document.getElementById('hospitalList');
const searchForm = document.getElementById('searchForm');

// Define dummy data for blood group availability and hospitals
const bloodGroups = ['A+', 'B+', 'O+', 'AB+' , 'O-'];
const randomCounts = {};
const hospitalsData = {
    'Punjab': {
        'Sri Guru Ram Das Institute of Medical Sciences and Research': getRandomCount(),
        'Ivy Hospital': getRandomCount(),
        'Satguru Partap Singh Apollo Hospitals': getRandomCount(),
    },
    'Delhi': {
        'Hospital A': getRandomCount(),
        'Hospital B': getRandomCount(),
        'Hospital C': getRandomCount(),
    },
    // Add more cities and hospitals as needed
};

// Populate the city dropdown based on the selected country
countrySelect.addEventListener('change', () => {
    const selectedCountry = countrySelect.value;

    if (selectedCountry === 'India') {
        const cities = Object.keys(hospitalsData);
        
        // Populate the city dropdown
        citySelect.innerHTML = '';
        cities.forEach((city) => {
            const option = document.createElement('option');
            option.textContent = city;
            citySelect.appendChild(option);
        });

        // Enable the city dropdown
        citySelect.disabled = false;
    } else {
        // If a country other than India is selected, disable and clear the city dropdown
        citySelect.disabled = true;
        citySelect.innerHTML = '<option value="">Select a City</option>';
    }
});

// Handle form submission
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check if a city is selected before proceeding
    if (citySelect.value === '') {
        alert('Please select a city.');
        return;
    }

    // Display hospitals and blood groups
    displayHospitals();
    //displayRandomBloodCounts();
});


// Add an event listener to the submit button
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check if a city is selected before proceeding
    if (citySelect.value === '') {
        alert('Please select a city.');
        return;
    }

    // Display hospitals
    document.querySelector('.hospitals').classList.remove('hidden');
});

// Add an event listener to hospital list items
hospitalList.addEventListener('click', (e) => {
    const selectedHospital = e.target.textContent;
    const hospitalData = hospitalsData[citySelect.value][selectedHospital];
    
    if (hospitalData) {
        displayRandomBloodCounts(hospitalData);
    }
});

// Function to display hospitals and their donor counts
function displayHospitals() {
    const selectedCity = citySelect.value;
    const hospitals = hospitalsData[selectedCity];

    hospitalList.innerHTML = '';
    
    if (hospitals) {
        Object.keys(hospitals).forEach((hospital) => {
            const listItem = document.createElement('li');
            listItem.textContent = hospital;
            listItem.className = 'hospital-list-item';
            hospitalList.appendChild(listItem);
        });
    }
    // Clear the blood group counts
    bloodList.innerHTML = '';

    // Show the hospitals section
    document.querySelector('.hospitals').classList.remove('hidden');
}


// Function to display random blood group counts with counting animation
function displayRandomBloodCounts() {
    bloodList.innerHTML = '';

    bloodGroups.forEach((group) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="blood-group">${group}</span>
            <span class="count" data-count="${getRandomCount()}">0</span>
        `;
        bloodList.appendChild(listItem);
    });

    const countElements = document.querySelectorAll('.count');
    countElements.forEach((countElement) => {
        const targetCount = parseInt(countElement.getAttribute('data-count'));
        animateCount(countElement, targetCount);
    });
    // Show the Blood Groups Availability section
    document.querySelector('.blood-groups').classList.remove('hidden');
}

// Function to generate a random count greater than 90
function getRandomCount() {
    return Math.floor(Math.random() * 10) + 61; // Generates numbers between 91 and 100 (inclusive)
}

// Function to animate the count
function animateCount(element, targetCount) {
    const duration = 2000; // Animation duration in milliseconds
    const step = 10; // Number of steps in the animation
    const increment = targetCount / (duration / step);

    let currentCount = 0;
    const interval = setInterval(() => {
        currentCount += increment;
        element.textContent = Math.round(currentCount);

        if (currentCount >= targetCount) {
            clearInterval(interval);
            element.textContent = targetCount;
        }
    }, step);
}

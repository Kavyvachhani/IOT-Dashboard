// Function to fetch data from ThingSpeak XML feed
async function fetchThingSpeakData() {
    try {
        const response = await fetch('https://thingspeak.mathworks.com/channels/2703306/feed.xml');
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const feeds = Array.from(xmlDoc.getElementsByTagName('feed')).map(feed => {
            const entry = {};
            Array.from(feed.children).forEach(child => {
                entry[child.tagName] = child.textContent;
            });
            return entry;
        });
        return feeds;
    } catch (error) {
        console.error('Error fetching data from ThingSpeak:', error);
        return [];
    }
}

// Function to update the patient table
function updatePatientTable(feeds) {
    const patientsTableBody = document.getElementById('patientsTableBody');
    if (patientsTableBody) {
        patientsTableBody.innerHTML = feeds.map((feed, index) => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${feed.field1 || 'N/A'}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${feed.field2 || 'N/A'}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        ${feed.field3 ? `${feed.field3} bpm` : 'N/A'}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${feed.field4 || 'N/A'}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onclick="showGraph(${index})" class="text-indigo-600 hover:text-indigo-900">Show Graph</button>
                </td>
            </tr>
        `).join('');
    }
}

// Function to update the patient count
function updatePatientCount(count) {
    const patientCount = document.getElementById('patientCount');
    if (patientCount) {
        patientCount.textContent = count;
    }
}

// Function to show the graph popup
function showGraph(index) {
    const popup = document.createElement('div');
    popup.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center';
    popup.innerHTML = `
        <div class="bg-white p-5 rounded-lg shadow-xl max-w-2xl w-full">
            <h2 class="text-xl font-bold mb-4">Patient Heart Rate Graph</h2>
            <img src="https://thingspeak.mathworks.com/channels/2703306/charts/3?results=60&dynamic=true" alt="Heart Rate Graph" class="w-full">
            <button onclick="this.closest('.fixed').remove()" class="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Close</button>
        </div>
    `;
    document.body.appendChild(popup);
}

document.addEventListener('DOMContentLoaded', async () => {
    // Fetch and display patient data from ThingSpeak
    const feeds = await fetchThingSpeakData();
    updatePatientTable(feeds);
    updatePatientCount(feeds.length);

    // Load and display doctor data (unchanged)
    const doctors = JSON.parse(localStorage.getItem('doctors')) || [
        { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiology' },
        { id: 2, name: 'Dr. Michael Brown', specialization: 'Neurology' },
    ];
    const doctorCount = document.getElementById('doctorCount');
    const doctorsTableBody = document.getElementById('doctorsTableBody');

    if (doctorCount) doctorCount.textContent = doctors.length;

    if (doctorsTableBody) {
        doctorsTableBody.innerHTML = doctors.map(doctor => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${doctor.name}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        ${doctor.specialization}
                    </span>
                </td>
            </tr>
        `).join('');
    }
});
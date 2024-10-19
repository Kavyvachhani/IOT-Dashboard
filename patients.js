// Function to fetch data from ThingSpeak API
async function fetchThingSpeakData() {
    try {
        const response = await fetch('https://api.thingspeak.com/channels/2703306/feeds.json?results=10');
        const data = await response.json();
        return data.feeds;
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
                    <div class="text-sm font-medium text-gray-900">${getRandomName()}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${Math.floor(Math.random() * 50 + 20)}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        ${feed.field1 ? `Heart Rate: ${feed.field1} bpm` : 'N/A'}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onclick="showGraph(${index})" class="text-indigo-600 hover:text-indigo-900">Show Graph</button>
                </td>
            </tr>
        `).join('');
    }
}

// Function to show the graph popup
function showGraph(index) {
    const popup = document.createElement('div');
    popup.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center';
    popup.innerHTML = `
        <div class="bg-white p-5 rounded-lg shadow-xl max-w-2xl w-full">
            <h2 class="text-xl font-bold mb-4">Patient Heart Rate Graph</h2>
            <img src="https://api.thingspeak.com/channels/2703306/charts/1?results=60&dynamic=true" alt="Heart Rate Graph" class="w-full">
            <button onclick="this.closest('.fixed').remove()" class="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Close</button>
        </div>
    `;
    document.body.appendChild(popup);
}

document.addEventListener('DOMContentLoaded', async () => {
    // Fetch and display patient data from ThingSpeak
    const feeds = await fetchThingSpeakData();
    updatePatientTable(feeds);
});
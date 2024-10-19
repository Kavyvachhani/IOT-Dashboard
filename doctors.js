document.addEventListener('DOMContentLoaded', () => {
    const doctorsTableBody = document.getElementById('doctorsTableBody');
    const addDoctorBtn = document.getElementById('addDoctorBtn');
    const doctorModal = document.getElementById('doctorModal');
    const doctorForm = document.getElementById('doctorForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const modalTitle = document.getElementById('modalTitle');

    let doctors = JSON.parse(localStorage.getItem('doctors')) || [];
    let editingDoctorId = null;

    function renderDoctors() {
        doctorsTableBody.innerHTML = doctors.map(doctor => `
            <li>
                <div class="px-4 py-4 sm:px-6">
                    <div class="flex items-center justify-between">
                        <p class="text-sm font-medium text-indigo-600 truncate">${doctor.name}</p>
                        <div class="ml-2 flex-shrink-0 flex">
                            <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                ${doctor.specialization}
                            </p>
                        </div>
                    </div>
                    <div class="mt-2 flex items-center text-sm text-gray-500">
                        <button onclick="editDoctor(${doctor.id})" class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                        <button onclick="deleteDoctor(${doctor.id})" class="text-red-600 hover:text-red-900">Delete</button>
                    </div>
                </div>
            </li>
        `).join('');
    }

    function showModal(editing = false) {
        modalTitle.textContent = editing ? 'Edit Doctor' : 'Add Doctor';
        doctorModal.classList.remove('hidden');
    }

    function hideModal() {
        doctorModal.classList.add('hidden');
        doctorForm.reset();
        editingDoctorId = null;
    }

    addDoctorBtn.addEventListener('click', () => showModal());
    cancelBtn.addEventListener('click', hideModal);

    doctorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('doctorName').value;
        const specialization = document.getElementById('doctorSpecialization').value;

        if (editingDoctorId) {
            const index = doctors.findIndex(d => d.id === editingDoctorId);
            doctors[index] = { ...doctors[index], name, specialization };
        } else {
            const newId = doctors.length > 0 ? Math.max(...doctors.map(d => d.id)) + 1 : 1;
            doctors.push({ id: newId, name, specialization });
        }

        localStorage.setItem('doctors', JSON.stringify(doctors));
        renderDoctors();
        hideModal();
    });

    window.editDoctor = (id) => {
        const doctor = doctors.find(d => d.id === id);
        if (doctor) {
            document.getElementById('doctorName').value = doctor.name;
            document.getElementById('doctorSpecialization').value = doctor.specialization;
            editingDoctorId = id;
            showModal(true);
        }
    };

    window.deleteDoctor = (id) => {
        if (confirm('Are you sure you want to delete this doctor?')) {
            doctors = doctors.filter(d => d.id !== id);
            localStorage.setItem('doctors', JSON.stringify(doctors));
            renderDoctors();
        }
    };

    renderDoctors();
});
// Data Mahasiswa (Contoh)
const students = [
    { nim: "2021001", nama: "Ahmad Rizky", prodi: "Informatika", status: "lulus", ipk: 3.85 },
    { nim: "2021002", nama: "Siti Nurhaliza", prodi: "Manajemen", status: "lulus", ipk: 3.72 },
    { nim: "2021003", nama: "Budi Santoso", prodi: "Akuntansi", status: "belum-lengkap", ipk: 2.95 },
    { nim: "2021004", nama: "Dewi Sartika", prodi: "Hukum", status: "lulus", ipk: 3.92 },
    { nim: "2021005", nama: "Eko Prasetyo", prodi: "Teknik Sipil", status: "tidak-lulus", ipk: 2.45 },
    { nim: "2021006", nama: "Fatimah Azzahra", prodi: "Psikologi", status: "lulus", ipk: 3.68 },
    { nim: "2021007", nama: "Gatot Subroto", prodi: "Ekonomi", status: "lulus", ipk: 3.45 },
    { nim: "2021008", nama: "Hani Mutmainnah", prodi: "Pendidikan", status: "belum-lengkap", ipk: 3.12 }
];

let filteredStudents = [...students];

function searchStudent() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (!query) {
        showAllStudents();
        return;
    }

    filteredStudents = students.filter(student => 
        student.nim.toLowerCase().includes(query) ||
        student.nama.toLowerCase().includes(query) ||
        student.prodi.toLowerCase().includes(query)
    );

    displayResults(filteredStudents);
}

function showAllStudents() {
    filteredStudents = [...students];
    displayResults(filteredStudents);
}

function displayResults(studentsList) {
    const resultsContainer = document.getElementById('results');
    const loading = document.getElementById('loading');
    
    if (studentsList.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-user-times"></i>
                <h3>Tidak Ditemukan</h3>
                <p>Mahasiswa dengan NIM/Nama tersebut tidak ditemukan</p>
            </div>
        `;
        return;
    }

    loading.style.display = 'none';
    
    resultsContainer.innerHTML = studentsList.map(student => `
        <div class="student-card ${student.status}">
            <div class="student-info">
                <div class="student-photo">
                    ${student.nama.charAt(0).toUpperCase()}
                </div>
                <div class="student-details">
                    <h4>${student.nama}</h4>
                    <p><strong>NIM:</strong> ${student.nim}</p>
                    <p><strong>Prodi:</strong> ${student.prodi}</p>
                    <p><strong>IPK:</strong> ${student.ipk}</p>
                </div>
                <div class="status ${student.status}">
                    <i class="fas fa-${getStatusIcon(student.status)}"></i>
                    ${getStatusText(student.status)}
                </div>
            </div>
        </div>
    `).join('');
}

function getStatusIcon(status) {
    switch(status) {
        case 'lulus': return 'check-circle';
        case 'belum-lengkap': return 'clock';
        case 'tidak-lulus': return 'times-circle';
        default: return 'question-circle';
    }
}

function getStatusText(status) {
    switch(status) {
        case 'lulus': return 'SELAMAT! ANDA LULUS';
        case 'belum-lengkap': return 'BELUM LENGKAP';
        case 'tidak-lulus': return 'TIDAK LULUS';
        default: return 'UNKNOWN';
    }
}

// Event Listeners
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchStudent();
    }
});

// Load data awal
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        showAllStudents();
    }, 1000);
});
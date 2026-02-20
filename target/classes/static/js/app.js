const API_BASE = '/api';

// State
let currentUser = JSON.parse(localStorage.getItem('user'));
let currentRole = currentUser ? currentUser.role : null;

// DOM Elements
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const toastContainer = document.getElementById('toast-container');
const sidebarMenu = document.getElementById('sidebar-menu');
const viewTitle = document.getElementById('view-title');
const viewSubtitle = document.getElementById('view-subtitle');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    if (currentUser) {
        showDashboard();
    } else {
        showLogin();
    }

    loginForm.addEventListener('submit', handleLogin);

    // Admin: Add Student Form
    document.getElementById('add-student-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const student = {
            rollNumber: document.getElementById('student-roll').value,
            department: document.getElementById('student-dept').value,
            currentSemester: document.getElementById('student-sem').value,
            user: { id: parseInt(document.getElementById('student-user-id').value) }
        };

        try {
            const res = await fetch(`${API_BASE}/admin/students`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(student)
            });
            if (res.ok) {
                closeModal('add-student-modal');
                loadViewData('users');
                e.target.reset();
                showNotice('Student enrolled successfully!', 'success');
            }
        } catch (err) {
            showNotice('Failed to enroll student', 'error');
        }
    });

    // Admin: Add Subject Form
    document.getElementById('add-subject-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const subject = {
            subjectCode: document.getElementById('subject-code').value,
            subjectName: document.getElementById('subject-name').value,
            department: document.getElementById('subject-dept').value,
            creditHours: parseInt(document.getElementById('subject-credits').value),
            semester: document.getElementById('subject-sem').value
        };

        try {
            const res = await fetch(`${API_BASE}/admin/subjects`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(subject)
            });
            if (res.ok) {
                closeModal('add-subject-modal');
                loadViewData('subjects');
                e.target.reset();
                showNotice('Subject added to curriculum', 'success');
            }
        } catch (err) {
            showNotice('Failed to add subject', 'error');
        }
    });
});

// Navigation Logic
function showLogin() {
    loginSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
}

function showDashboard() {
    loginSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');

    // Set Profile Info
    document.getElementById('user-name-display').innerText = currentUser.fullName || currentUser.username;
    document.getElementById('user-avatar-initials').innerText = (currentUser.fullName || currentUser.username)[0].toUpperCase();

    const roleBadge = document.getElementById('user-role-badge');
    roleBadge.innerText = currentUser.role;
    roleBadge.className = `role-badge badge-${currentUser.role.toLowerCase()}`;

    generateSidebar();
    showView('overview');
}

function generateSidebar() {
    sidebarMenu.innerHTML = '';
    const role = currentUser.role.toUpperCase();

    const commonLinks = [
        { id: 'overview', icon: 'fa-house', label: 'Overview' }
    ];

    let roleLinks = [];
    if (role === 'ADMIN') {
        roleLinks = [
            { id: 'users', icon: 'fa-users-gear', label: 'User Hub' },
            { id: 'subjects', icon: 'fa-book-open', label: 'Curriculum' },
            { id: 'analysis', icon: 'fa-chart-pie', label: 'System Analytics' }
        ];
    } else if (role === 'FACULTY') {
        roleLinks = [
            { id: 'marks', icon: 'fa-pen-to-square', label: 'Assign Marks' },
            { id: 'subjects', icon: 'fa-book', label: 'My Courses' },
            { id: 'analysis', icon: 'fa-magnifying-glass-chart', label: 'Student Trends' }
        ];
    } else if (role === 'STUDENT') {
        roleLinks = [
            { id: 'results', icon: 'fa-medal', label: 'Performance' },
            { id: 'subjects', icon: 'fa-graduation-cap', label: 'My Subjects' }
        ];
    }

    [...commonLinks, ...roleLinks].forEach(link => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="#" class="menu-item" id="menu-${link.id}" onclick="showView('${link.id}')">
                <i class="fa-solid ${link.icon}"></i>
                <span>${link.label}</span>
            </a>
        `;
        sidebarMenu.appendChild(li);
    });
}

function showView(viewId) {
    // 1. Hide all views
    document.querySelectorAll('.view-segment').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));

    // 2. Show selected
    const viewEl = document.getElementById(`view-${viewId}`);
    if (viewEl) viewEl.classList.remove('hidden');

    const menuEl = document.getElementById(`menu-${viewId}`);
    if (menuEl) menuEl.classList.add('active');

    // 3. Update Titles & Load Data
    updateViewMetadata(viewId);
    loadViewData(viewId);
}

function updateViewMetadata(viewId) {
    const titles = {
        'overview': { t: 'Dashboard Overview', s: 'Quick stats and latest announcements' },
        'users': { t: 'Security & Users', s: 'Manage institutional accounts and roles' },
        'subjects': { t: 'Subject Repository', s: 'View and manage academic curriculum' },
        'marks': { t: 'Examination Portal', s: 'Entry and modification of student scores' },
        'results': { t: 'My Academic Performance', s: 'View and track your semester progress' },
        'analysis': { t: 'Advanced Analytics', s: 'Deep dive into patterns and performance' }
    };
    viewTitle.innerText = titles[viewId].t;
    viewSubtitle.innerText = titles[viewId].s;
}

// Data Loading
async function loadViewData(viewId) {
    switch (viewId) {
        case 'overview': loadOverviewStats(); break;
        case 'users': loadAdminUsers(); break;
        case 'subjects': loadSubjectsByRole(); break;
        case 'marks': loadFacultyMarksPortal(); break;
        case 'results': loadStudentPerformance(); break;
        case 'analysis': loadCrossRoleAnalysis(); break;
    }
}

async function loadOverviewStats() {
    const grid = document.getElementById('stats-grid');
    grid.innerHTML = '<div class="card animate-fade-in"><p>Loading intelligence...</p></div>';

    // Simulate API delay and role-specific stats
    setTimeout(() => {
        if (currentUser.role === 'ADMIN') {
            grid.innerHTML = `
                <div class="card stats-card"><h3>1,240</h3><p class="text-muted">Total Students</p></div>
                <div class="card stats-card"><h3>84</h3><p class="text-muted">Faculty Members</p></div>
                <div class="card stats-card"><h3>15</h3><p class="text-muted">Departments</p></div>
            `;
        } else {
            grid.innerHTML = `
                <div class="card stats-card"><h3>92%</h3><p class="text-muted">Attendance</p></div>
                <div class="card stats-card"><h3>3.8</h3><p class="text-muted">Current CGPA</p></div>
                <div class="card stats-card"><h3>5</h3><p class="text-muted">Active Courses</p></div>
            `;
        }
    }, 400);
}

async function loadAdminUsers() {
    try {
        const res = await fetch(`${API_BASE}/admin/users`);
        const users = await res.json();
        const tbody = document.querySelector('#users-table tbody');
        tbody.innerHTML = '';
        users.forEach(u => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${u.id}</td>
                <td>${u.fullName || 'N/A'}</td>
                <td>${u.username}</td>
                <td><span class="role-badge badge-${u.role.toLowerCase()}">${u.role}</span></td>
                <td><button class="btn btn-outline" style="padding: 0.4rem;" onclick="editUser(${u.id})"><i class="fa-solid fa-pen-to-square"></i></button></td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) { console.error(err); }
}

async function loadSubjectsByRole() {
    const endpoint = currentUser.role === 'ADMIN' ? 'admin' : 'faculty';
    try {
        const res = await fetch(`${API_BASE}/${endpoint.toLowerCase()}/subjects`);
        const subjects = await res.json();
        const tbody = document.querySelector('#subjects-table tbody');
        tbody.innerHTML = '';
        subjects.forEach(s => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight: 600; color: var(--primary);">${s.subjectCode}</td>
                <td>${s.subjectName}</td>
                <td>${s.creditHours}</td>
                <td>Sem ${s.semester}</td>
                <td><span class="role-badge badge-faculty">${s.department}</span></td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) { console.error(err); }
}

async function loadFacultyMarksPortal() {
    try {
        // Load Subjects for dropdown
        const subRes = await fetch(`${API_BASE}/admin/subjects`); // Faculty can see all subjects for now
        const subjects = await subRes.json();
        const select = document.getElementById('select-subject');
        select.innerHTML = '<option value="">Select Subject</option>';
        subjects.forEach(s => {
            select.innerHTML += `<option value="${s.id}">${s.subjectName} (${s.subjectCode})</option>`;
        });

        const res = await fetch(`${API_BASE}/faculty/students`);
        const students = await res.json();
        const tbody = document.querySelector('#marks-entry-table tbody');
        tbody.innerHTML = '';
        students.forEach(s => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${s.user.fullName}</td>
                <td>${s.rollNumber}</td>
                <td><input type="number" id="mark-input-${s.id}" class="form-input" style="width: 80px;" placeholder="--"></td>
                <td><button class="btn btn-primary" style="padding: 0.5rem 1rem;" onclick="submitMark(${s.id})">Update</button></td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) { console.error(err); }
}

async function submitMark(studentId) {
    const markValue = document.getElementById(`mark-input-${studentId}`).value;
    const subjectId = document.getElementById('select-subject').value;

    if (!subjectId) {
        showNotice('Please select a subject first', 'error');
        return;
    }

    const markData = {
        student: { id: studentId },
        subject: { id: parseInt(subjectId) },
        marksObtained: parseFloat(markValue),
        totalMarks: 100 // Default for now
    };

    try {
        const res = await fetch(`${API_BASE}/faculty/marks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(markData)
        });
        if (res.ok) {
            showNotice('Mark updated successfully', 'success');
        }
    } catch (err) {
        showNotice('Failed to update mark', 'error');
    }
}

async function loadStudentPerformance() {
    const studentId = currentUser.id; // Usually we'd need to find the student profile ID linked to user
    try {
        // First get student profile to get the internal DB ID
        const profRes = await fetch(`${API_BASE}/student/profile/${currentUser.id}`);
        if (!profRes.ok) throw new Error('Student profile not found');
        const student = await profRes.json();

        const res = await fetch(`${API_BASE}/student/results/${student.id}`);
        const results = await res.json();
        const tbody = document.querySelector('#student-results-table tbody');
        tbody.innerHTML = '';

        results.forEach(m => {
            const grade = m.marksObtained >= 90 ? 'A+' : m.marksObtained >= 80 ? 'A' : m.marksObtained >= 70 ? 'B' : 'C';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${m.subject.subjectName}</td>
                <td>${m.subject.creditHours}</td>
                <td>${m.marksObtained} / ${m.totalMarks}</td>
                <td><span class="role-badge badge-student">${grade}</span></td>
            `;
            tbody.appendChild(tr);
        });

        const avgRes = await fetch(`${API_BASE}/student/analysis/average/${student.id}`);
        const avg = await avgRes.json();
        document.getElementById('student-gpa').innerText = (avg / 25).toFixed(2); // Mock GPA formula
        document.getElementById('student-credits').innerText = results.length * 4;
    } catch (err) {
        console.error(err);
        document.querySelector('#student-results-table tbody').innerHTML = '<tr><td colspan="4">No results found for your profile.</td></tr>';
    }
}

async function loadCrossRoleAnalysis() {
    const endpoint = currentUser.role === 'ADMIN' ? 'admin' : 'faculty';
    // Simplified: Faculty and Admin see weak students
    try {
        const res = await fetch(`${API_BASE}/faculty/analysis/weak-students`);
        const list = await res.json();
        const el = document.getElementById('weak-students-list');
        el.innerHTML = '';
        if (list.length === 0) {
            el.innerHTML = '<li class="text-muted">All students performing above threshold.</li>';
        }
        list.forEach(s => {
            const li = document.createElement('li');
            li.className = 'notice-item';
            li.innerHTML = `
                <div class="notice-icon" style="background: #ef4444;"><i class="fa-solid fa-triangle-exclamation"></i></div>
                <div>
                    <h4 style="margin:0">${s.user.fullName}</h4>
                    <p class="text-muted" style="font-size: 0.8rem;">Roll No: ${s.rollNumber} | Dept: ${s.department}</p>
                </div>
            `;
            el.appendChild(li);
        });
    } catch (err) { console.error(err); }
}

// Auth Handlers
async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    const btn = e.target.querySelector('button');
    btn.innerText = '🛡️ Authenticating...';
    btn.disabled = true;

    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (res.ok) {
            const user = await res.json();
            currentUser = user;
            localStorage.setItem('user', JSON.stringify(user));
            showDashboard();
            showNotice(`Welcome back, ${user.fullName}!`, 'success');
        } else {
            const msg = await res.text();
            showNotice(msg || 'Authentication failed', 'error');
        }
    } catch (err) {
        showNotice('Connection to secure server failed', 'error');
    } finally {
        btn.innerText = 'Sign In';
        btn.disabled = false;
    }
}

function logout() {
    localStorage.removeItem('user');
    currentUser = null;
    showLogin();
    showNotice('You have been securely logged out', 'info');
}

// Modal & Utils
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

function showNotice(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? 'fa-circle-check' : (type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info');
    toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}

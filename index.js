document.addEventListener('DOMContentLoaded', () => {
    
    // --- DOM Elements ---
    const form = document.getElementById('password-form');
    const websiteInput = document.getElementById('website');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const idInput = document.getElementById('entry-id'); 
    
    const formTitle = document.getElementById('form-title');
    const saveBtn = document.getElementById('save-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    
    const toggleFormPasswordBtn = document.getElementById('toggle-form-password');
    const generateBtn = document.getElementById('generate-btn');
    const strengthBar = document.getElementById('strength-bar');
    
    const listContainer = document.getElementById('credentials-list');
    const emptyState = document.getElementById('empty-state');
    const searchInput = document.getElementById('search-input');
    const toast = document.getElementById('toast');

    // --- State ---
    let credentials = JSON.parse(localStorage.getItem('vault_data')) || [];
    renderCredentials(credentials);

    // --- Event Listeners ---

    // 1. See/Unsee in Form
    toggleFormPasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        toggleFormPasswordBtn.classList.toggle('fa-eye');
        toggleFormPasswordBtn.classList.toggle('fa-eye-slash');
    });

    // 2. Generate Random Password
    generateBtn.addEventListener('click', () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
        let password = "";
        for (let i = 0; i < 16; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        passwordInput.value = password;
        passwordInput.type = "text"; 
        toggleFormPasswordBtn.classList.remove('fa-eye');
        toggleFormPasswordBtn.classList.add('fa-eye-slash');
        checkStrength(password); 
    });

    // 3. Password Strength Meter
    passwordInput.addEventListener('input', (e) => checkStrength(e.target.value));

    // 4. Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = idInput.value;
        const website = websiteInput.value.trim();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (id) {
            updateCredential(id, website, username, password);
        } else {
            createCredential(website, username, password);
        }
        resetForm();
    });

    // 5. Cancel Edit
    cancelBtn.addEventListener('click', resetForm);

    // 6. Search
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = credentials.filter(cred => 
            cred.website.toLowerCase().includes(term) || 
            cred.username.toLowerCase().includes(term)
        );
        renderCredentials(filtered);
    });

    // --- Core Logic ---

    function createCredential(website, username, password) {
        const newEntry = {
            id: Date.now().toString(),
            website, username, password,
            createdAt: new Date().toLocaleDateString()
        };
        credentials.unshift(newEntry);
        saveAndRender();
        showToast('Encrypted & Saved');
    }

    function updateCredential(id, website, username, password) {
        const index = credentials.findIndex(c => c.id === id);
        if (index !== -1) {
            credentials[index] = { ...credentials[index], website, username, password };
            saveAndRender();
            showToast('Credential Updated');
        }
    }

    function deleteCredential(id) {
        if(confirm('Delete this credential?')) {
            credentials = credentials.filter(c => c.id !== id);
            saveAndRender();
            showToast('Deleted');
            if (idInput.value === id) resetForm();
        }
    }

    function prepareEdit(id) {
        const item = credentials.find(c => c.id === id);
        if (item) {
            idInput.value = item.id;
            websiteInput.value = item.website;
            usernameInput.value = item.username;
            passwordInput.value = item.password;
            
            formTitle.textContent = 'Edit Credential';
            saveBtn.innerHTML = '<i class="fa-solid fa-rotate"></i> Update';
            cancelBtn.classList.remove('hidden');
            
            checkStrength(item.password);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    function saveAndRender() {
        localStorage.setItem('vault_data', JSON.stringify(credentials));
        renderCredentials(credentials);
    }

    function checkStrength(pass) {
        let strength = 0;
        if (pass.length > 5) strength++;
        if (pass.length > 10) strength++;
        if (/[A-Z]/.test(pass)) strength++;
        if (/[0-9]/.test(pass)) strength++;
        if (/[^A-Za-z0-9]/.test(pass)) strength++;

        let color = '#2a3942'; 
        let width = '0%';

        if (pass.length === 0) {
            width = '0%';
        } else if (strength < 3) {
            color = '#ef4444'; // Red
            width = '33%';
        } else if (strength < 5) {
            color = '#f59e0b'; // Orange
            width = '66%';
        } else {
            color = '#00a884'; // Green
            width = '100%';
        }

        strengthBar.style.backgroundColor = color;
        strengthBar.style.width = width;
    }

    function resetForm() {
        form.reset();
        idInput.value = '';
        formTitle.textContent = 'Add New Credential';
        saveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save';
        cancelBtn.classList.add('hidden');
        passwordInput.type = 'password';
        strengthBar.style.width = '0%';
        toggleFormPasswordBtn.className = 'fa-solid fa-eye';
    }

    // --- Rendering ---

    function renderCredentials(data) {
        listContainer.innerHTML = '';
        if (data.length === 0) {
            emptyState.classList.remove('hidden');
            return;
        }
        emptyState.classList.add('hidden');

        data.forEach(cred => {
            const card = document.createElement('div');
            card.className = 'card';
            
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-title">
                        <h3>${escapeHtml(cred.website)}</h3>
                        <span>${escapeHtml(cred.username)}</span>
                    </div>
                    <div class="site-icon">
                        <i class="fa-solid fa-key"></i>
                    </div>
                </div>

                <div class="password-box">
                    <span class="pass-text" id="pass-text-${cred.id}">••••••••</span>
                    <button class="icon-btn btn-eye" onclick="toggleCardPass('${cred.id}', '${escapeHtml(cred.password)}', this)">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                </div>

                <div class="card-actions">
                    <button class="icon-btn btn-copy" onclick="copyToClipboard('${escapeHtml(cred.password)}', this)" title="Copy">
                        <i class="fa-regular fa-copy"></i>
                    </button>
                    <button class="icon-btn btn-edit" onclick="editEntry('${cred.id}')" title="Edit">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="icon-btn btn-delete" onclick="removeEntry('${cred.id}')" title="Delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
            listContainer.appendChild(card);
        });
    }

    // --- Window Functions ---

    window.toggleCardPass = function(id, password, btn) {
        const textSpan = document.getElementById(`pass-text-${id}`);
        const icon = btn.querySelector('i');
        if (textSpan.textContent === '••••••••') {
            textSpan.textContent = password;
            icon.className = 'fa-solid fa-eye-slash';
            textSpan.style.color = '#e9edef';
        } else {
            textSpan.textContent = '••••••••';
            icon.className = 'fa-solid fa-eye';
            textSpan.style.color = '#8696a0';
        }
    };

    window.copyToClipboard = function(text, btnElement) {
        navigator.clipboard.writeText(text).then(() => {
            const originalIcon = btnElement.innerHTML;
            btnElement.innerHTML = '<i class="fa-solid fa-check"></i>';
            btnElement.style.color = '#00a884';
            btnElement.style.borderColor = '#00a884';
            
            setTimeout(() => {
                btnElement.innerHTML = originalIcon;
                btnElement.style.color = '';
                btnElement.style.borderColor = '';
            }, 1500);

            showToast('Copied to Clipboard');
        });
    };

    window.removeEntry = function(id) { deleteCredential(id); };
    window.editEntry = function(id) { prepareEdit(id); };

    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
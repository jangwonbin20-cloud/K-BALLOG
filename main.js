document.addEventListener('DOMContentLoaded', () => {

    const locationSelect = document.getElementById('location-select');

    if (locationSelect) {
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage) {
            for (let option of locationSelect.options) {
                if (option.value === currentPage) {
                    option.selected = true;
                    break;
                }
            }
        }

        locationSelect.addEventListener('change', (event) => {
            const selectedUrl = event.target.value;
            if (selectedUrl) {
                window.location.href = selectedUrl;
            }
        });
    }

    // Language translation functionality
    const translations = { /* ... translation data ... */ };
    const languageSelect = document.getElementById('language-select');

    function translatePage(language) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[language] && translations[language][key]) {
                element.textContent = translations[language][key];
            }
        });
        document.documentElement.lang = language;
    }

    if (languageSelect) {
        languageSelect.addEventListener('change', (event) => {
            translatePage(event.target.value);
        });
    }

    // Auth functionality
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    const loginModal = document.getElementById('login-modal');
    const signupRoleModal = document.getElementById('signup-role-modal');
    const playerSignupModal = document.getElementById('player-signup-modal');
    const adminSignupModal = document.getElementById('admin-signup-modal');

    const playerSignupBtn = document.getElementById('player-signup-btn');
    const adminSignupBtn = document.getElementById('admin-signup-btn');

    const loginForm = document.getElementById('login-form');
    const playerSignupForm = document.getElementById('player-signup-form');
    const adminSignupForm = document.getElementById('admin-signup-form');

    const userInfo = document.getElementById('user-info');
    const userGreeting = document.getElementById('user-greeting');

    const allModals = [loginModal, signupRoleModal, playerSignupModal, adminSignupModal];

    const openModal = (modal) => modal.classList.remove('hidden');
    const closeModal = (modal) => modal.classList.add('hidden');

    if (loginBtn) loginBtn.addEventListener('click', () => openModal(loginModal));
    if (signupBtn) signupBtn.addEventListener('click', () => openModal(signupRoleModal));

    if (playerSignupBtn) {
        playerSignupBtn.addEventListener('click', () => {
            closeModal(signupRoleModal);
            openModal(playerSignupModal);
        });
    }

    if (adminSignupBtn) {
        adminSignupBtn.addEventListener('click', () => {
            closeModal(signupRoleModal);
            openModal(adminSignupModal);
        });
    }

    allModals.forEach(modal => {
        if (modal) {
            modal.querySelector('.close-btn').addEventListener('click', () => closeModal(modal));
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal(modal);
            });
        }
    });

    const updateAuthState = (user) => {
        if (user) {
            loginBtn.classList.add('hidden');
            signupBtn.classList.add('hidden');
            userInfo.classList.remove('hidden');
            userGreeting.textContent = `환영합니다, ${user.email}님!`;
        } else {
            loginBtn.classList.remove('hidden');
            signupBtn.classList.remove('hidden');
            userInfo.classList.add('hidden');
        }
    };

    const handleSignup = (form, role) => {
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;
        const passwordConfirm = form.querySelector('input[id*="password-confirm"]').value;
        
        if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (role === 'admin') {
            const authCode = document.getElementById('admin-auth-code').value;
            if (authCode !== 'K-BALLOG-ADMIN') {
                alert('관리자 인증 코드가 올바르지 않습니다.');
                return;
            }
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(u => u.email === email)) {
            alert('이미 가입된 이메일입니다.');
            return;
        }

        users.push({ email, password, role });
        localStorage.setItem('users', JSON.stringify(users));
        alert('회원가입이 완료되었습니다!');
        closeModal(form.closest('.modal-overlay'));
    };

    if (playerSignupForm) {
        playerSignupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSignup(playerSignupForm, 'player');
        });
    }

    if (adminSignupForm) {
        adminSignupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSignup(adminSignupForm, 'admin');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                updateAuthState(user);
                closeModal(loginModal);
            } else {
                alert('이메일 또는 비밀번호가 올바르지 않습니다.');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            updateAuthState(null);
        });
    }
    
    // Check initial auth state
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    updateAuthState(currentUser);

    // ... (rest of the code for community posts, etc.)
});

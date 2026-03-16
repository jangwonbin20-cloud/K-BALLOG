document.addEventListener('DOMContentLoaded', () => {

    // --- Helper Functions ---
    const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];
    const saveUsers = (users) => localStorage.setItem('users', JSON.stringify(users));
    const getCurrentUser = () => JSON.parse(localStorage.getItem('currentUser'));
    const setCurrentUser = (user) => localStorage.setItem('currentUser', JSON.stringify(user));
    const clearCurrentUser = () => localStorage.removeItem('currentUser');

    // --- UI Update Function ---
    const updateAuthState = () => {
        const user = getCurrentUser();
        const authButtons = document.querySelector('.auth-buttons');
        const userInfo = document.querySelector('.user-info');
        const userNameDisplay = document.getElementById('user-name-display');

        if (authButtons && userInfo) {
            if (user) {
                authButtons.classList.add('hidden');
                userInfo.classList.remove('hidden');
                if (userNameDisplay) {
                    userNameDisplay.textContent = `${user.email}`;
                }
            } else {
                authButtons.classList.remove('hidden');
                userInfo.classList.add('hidden');
            }
        }
    };

    // --- Page-Specific Logic ---
    const currentPage = window.location.pathname.split('/').pop();

    // 1. Signup Page Logic (`signup.html`)
    if (currentPage === 'signup.html') {
        const signupForm = document.getElementById('signup-form');
        const roleSelect = document.getElementById('signup-role');
        const adminCodeGroup = document.getElementById('admin-code-group');

        if (roleSelect) {
            roleSelect.addEventListener('change', () => {
                if (roleSelect.value === 'admin') {
                    adminCodeGroup.classList.remove('hidden');
                } else {
                    adminCodeGroup.classList.add('hidden');
                }
            });
        }

        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('signup-email').value;
                const password = document.getElementById('signup-password').value;
                const role = document.getElementById('signup-role').value;
                const users = getUsers();

                if (users.find(u => u.email === email)) {
                    alert('이미 가입된 이메일입니다.');
                    return;
                }

                if (role === 'admin') {
                    const adminCode = document.getElementById('admin-code').value;
                    if (adminCode !== 'K-BALLOG-ADMIN') { // Hardcoded admin code
                        alert('관리자 인증 코드가 올바르지 않습니다.');
                        return;
                    }
                }

                // Generate verification code and store data temporarily
                const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
                const signupData = { email, password, role, verificationCode };
                sessionStorage.setItem('signupData', JSON.stringify(signupData));

                // Redirect to verification page
                window.location.href = 'verify.html';
            });
        }
    }

    // 2. Verification Page Logic (`verify.html`)
    if (currentPage === 'verify.html') {
        const verifyForm = document.getElementById('verify-form');
        const signupDataString = sessionStorage.getItem('signupData');

        if (!signupDataString) {
            window.location.href = 'signup.html';
            return; // Stop further execution
        }

        const signupData = JSON.parse(signupDataString);
        document.getElementById('user-email-display').textContent = signupData.email;
        // For simulation purposes, display the code to the user
        document.getElementById('verification-code-display').textContent = signupData.verificationCode;

        if (verifyForm) {
            verifyForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const enteredCode = document.getElementById('verify-code').value;

                if (enteredCode === signupData.verificationCode) {
                    const users = getUsers();
                    const newUser = { email: signupData.email, password: signupData.password, role: signupData.role };
                    users.push(newUser);
                    saveUsers(users);
                    setCurrentUser(newUser); // Automatically log in the user

                    sessionStorage.removeItem('signupData');
                    alert('회원가입이 완료되었습니다. 환영합니다!');
                    window.location.href = 'index.html';
                } else {
                    alert('인증 코드가 올바르지 않습니다.');
                }
            });
        }
    }

    // --- Global Logic (Runs on all pages) ---

    // Initial Authentication State Check
    updateAuthState();

    // Login Modal Logic (still needed on pages with the login button)
    const loginBtnMain = document.getElementById('login-btn-main');
    const loginModal = document.getElementById('login-modal');

    if (loginBtnMain && loginModal) {
        const loginForm = document.getElementById('login-form');
        const closeBtn = loginModal.querySelector('.close-btn');

        loginBtnMain.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.remove('hidden');
        });

        closeBtn.addEventListener('click', () => loginModal.classList.add('hidden'));
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.classList.add('hidden');
            }
        });

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                const users = getUsers();
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    setCurrentUser(user);
                    updateAuthState();
                    loginModal.classList.add('hidden');
                } else {
                    alert('이메일 또는 비밀번호가 올바르지 않습니다.');
                }
            });
        }
    }

    // Logout Logic
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            clearCurrentUser();
            updateAuthState();
            // Optional: Redirect to home page on logout
            // window.location.href = 'index.html';
        });
    }

    // Location Selector (if it exists)
    const locationSelect = document.getElementById('location-select');
    if (locationSelect) {
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
    
    // Fallback for old signup buttons to redirect to the new page
    const oldSignupBtn = document.getElementById('signup-btn'); // The one that opened the modal
    if (oldSignupBtn) {
        oldSignupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'signup.html';
        });
    }

    // Community page logic (if on community.html)
    if (currentPage === 'community.html') {
        const postsContainer = document.querySelector('.forum-posts');
        const noPostsMessage = document.querySelector('.no-posts-message');
        let posts = JSON.parse(localStorage.getItem('posts')) || [];

        if (posts.length > 0) {
            if (noPostsMessage) noPostsMessage.classList.add('hidden');
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post-item');
                postElement.innerHTML = `
                    <div class="post-title"><a href="#">${post.title}</a></div>
                    <div class="post-meta">by ${post.author} - ${post.date}</div>
                    <div class="post-stats">
                        <span><i class="fa-regular fa-comment"></i> 0</span>
                        <span><i class="fa-regular fa-eye"></i> 0</span>
                    </div>
                `;
                if (postsContainer) postsContainer.appendChild(postElement);
            });
        } else {
             if (noPostsMessage) noPostsMessage.classList.remove('hidden');
        }
    }

    // Create post page logic
    if (currentPage === 'create-post.html') {
        const createPostForm = document.getElementById('create-post-form');
        if (createPostForm) {
            createPostForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const title = document.getElementById('post-title').value;
                const content = document.getElementById('post-content').value;
                const currentUser = getCurrentUser();

                if (!currentUser) {
                    alert('로그인이 필요합니다.');
                    return;
                }

                const newPost = {
                    title: title,
                    content: content,
                    author: currentUser.email, 
                    date: new Date().toLocaleDateString('ko-KR')
                };

                let posts = JSON.parse(localStorage.getItem('posts')) || [];
                posts.unshift(newPost); 
                localStorage.setItem('posts', JSON.stringify(posts));

                window.location.href = 'community.html';
            });
        }
    }
});

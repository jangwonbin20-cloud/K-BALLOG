document.addEventListener('DOMContentLoaded', () => {

    const locationSelect = document.getElementById('location-select');

    if (locationSelect) {
        // Set the current page's option as selected
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
    const translations = {
        en: {
            pageTitle: "K-BALLOG - All About Amateur Football",
            yourLocation: "Your Location",
            seoul: "Seoul",
            suwon: "Suwon",
            incheon: "Incheon",
            yongin: "Yongin",
            navHome: "Home",
            navMatches: "Matches",
            navSearch: "Search",
            navNews: "News",
            navCommunity: "Community",
            yourLocationMobile: "Your Location:",
            heroTitle: "Local football news, check it all out at K-BALLOG!",
            heroSubtitle: "League rankings, match results, and latest news at a glance. Support your team and join K-BALLOG.",
            regionalLeagues: "Regional League Shortcuts",
            seoulLeague: "Seoul Amateur League",
            seoulLeagueDesc: "Check the latest information on K5, K6, K7, and SSSL leagues in the Seoul area.",
            suwonLeague: "Suwon Amateur League",
            suwonLeagueDesc: "Discover news from weekend leagues and clubs in Suwon.",
            incheonLeague: "Incheon Amateur League",
            incheonLeagueDesc: "Check various amateur league information and match results in the Incheon area.",
            yonginLeague: "Yongin Amateur League",
            yonginLeagueDesc: "Get the latest news from football clubs and leagues in Yongin.",
            footerAbout: "About Us",
            footerTerms: "Terms of Use",
            footerPrivacy: "Privacy Policy",
            footerContact: "Contact Us",
            footerRights: "© 2024 K-BALLOG. All rights reserved."
        },
        de: {
            pageTitle: "K-BALLOG - Alles über Amateurfußball",
            yourLocation: "Ihr Standort",
            seoul: "Seoul",
            suwon: "Suwon",
            incheon: "Incheon",
            yongin: "Yongin",
            navHome: "Startseite",
            navMatches: "Spiele",
            navSearch: "Suchen",
            navNews: "Nachrichten",
            navCommunity: "Gemeinschaft",
            yourLocationMobile: "Ihr Standort:",
            heroTitle: "Lokale Fußballnachrichten, alles bei K-BALLOG!",
            heroSubtitle: "Liga-Ranglisten, Spielergebnisse und aktuelle Nachrichten auf einen Blick. Unterstützen Sie Ihr Team und treten Sie K-BALLOG bei.",
            regionalLeagues: "Regionale Liga-Verknüpfungen",
            seoulLeague: "Amateurliga Seoul",
            seoulLeagueDesc: "Überprüfen Sie die neuesten Informationen zu den Ligen K5, K6, K7 und SSSL im Raum Seoul.",
            suwonLeague: "Amateurliga Suwon",
            suwonLeagueDesc: "Entdecken Sie Neuigkeiten von den Wochenendligen und Vereinen in Suwon.",
            incheonLeague: "Amateurliga Incheon",
            incheonLeagueDesc: "Überprüfen Sie verschiedene Informationen zu Amateurligen und Spielergebnissen im Raum Incheon.",
            yonginLeague: "Amateurliga Yongin",
            yonginLeagueDesc: "Erhalten Sie die neuesten Nachrichten von Fußballvereinen und Ligen in Yongin.",
            footerAbout: "Über uns",
            footerTerms: "Nutzungsbedingungen",
            footerPrivacy: "Datenschutz-Bestimmungen",
            footerContact: "Kontaktiere uns",
            footerRights: "© 2024 K-BALLOG. Alle Rechte vorbehalten."
        },
        es: {
            pageTitle: "K-BALLOG - Todo sobre el fútbol amateur",
            yourLocation: "Tu ubicación",
            seoul: "Seúl",
            suwon: "Suwon",
            incheon: "Incheon",
            yongin: "Yongin",
            navHome: "Inicio",
            navMatches: "Partidos",
            navSearch: "Buscar",
            navNews: "Noticias",
            navCommunity: "Comunidad",
            yourLocationMobile: "Tu ubicación:",
            heroTitle: "¡Noticias de fútbol local, consúltalas todas en K-BALLOG!",
            heroSubtitle: "Clasificaciones de la liga, resultados de los partidos y últimas noticias de un vistazo. Apoya a tu equipo y únete a K-BALLOG.",
            regionalLeagues: "Atajos de ligas regionales",
            seoulLeague: "Liga Amateur de Seúl",
            seoulLeagueDesc: "Consulta la información más reciente sobre las ligas K5, K6, K7 y SSSL en el área de Seúl.",
            suwonLeague: "Liga Amateur de Suwon",
            suwonLeagueDesc: "Descubre noticias de las ligas de fin de semana y clubes en Suwon.",
            incheonLeague: "Liga Amateur de Incheon",
            incheonLeagueDesc: "Consulta información variada sobre ligas amateur y resultados de partidos en el área de Incheon.",
            yonginLeague: "Liga Amateur de Yongin",
            yonginLeagueDesc: "Obtén las últimas noticias de los clubes y ligas de fútbol en Yongin.",
            footerAbout: "Sobre nosotros",
            footerTerms: "Términos de uso",
            footerPrivacy: "Política de privacidad",
            footerContact: "Contáctenos",
            footerRights: "© 2024 K-BALLOG. Todos los derechos reservados."
        },
        ja: {
            pageTitle: "K-BALLOG - アマチュアサッカーのすべて",
            yourLocation: "あなたの地域",
            seoul: "ソウル",
            suwon: "水原",
            incheon: "仁川",
            yongin: "龍仁",
            navHome: "ホーム",
            navMatches: "試合",
            navSearch: "検索",
            navNews: "ニュース",
            navCommunity: "コミュニティ",
            yourLocationMobile: "あなたの地域：",
            heroTitle: "地元のサッカーニュース、K-BALLOGですべてチェック！",
            heroSubtitle: "リーグランキング、試合結果、最新ニュースを一目で。あなたのチームを応援し、K-BALLOGに参加しましょう。",
            regionalLeagues: "地域リーグのショートカット",
            seoulLeague: "ソウルアマチュアリーグ",
            seoulLeagueDesc: "ソウル地域のK5、K6、K7、SSSLリーグの最新情報を確認してください。",
            suwonLeague: "水原アマチュアリーグ",
            suwonLeagueDesc: "水原の週末リーグとクラブからのニュースをご覧ください。",
            incheonLeague: "仁川アマチュアリーグ",
            incheonLeagueDesc: "仁川地域のさまざまなアマチュアリーグ情報と試合結果を確認してください。",
            yonginLeague: "龍仁アマチュアリーグ",
            yonginLeagueDesc: "龍仁のサッカークラブとリーグからの最新ニュースを入手してください。",
            footerAbout: "会社概要",
            footerTerms: "利用規約",
            footerPrivacy: "プライバシーポリシー",
            footerContact: "お問い合わせ",
            footerRights: "© 2024 K-BALLOG. 無断複写・転載を禁じます。"
        },
         ko: {
            pageTitle: "K-BALLOG - 아마추어 축구의 모든 것",
            yourLocation: "당신의 지역",
            seoul: "서울",
            suwon: "수원",
            incheon: "인천",
            yongin: "용인",
            navHome: "홈",
            navMatches: "경기",
            navSearch: "검색",
            navNews: "뉴스",
            navCommunity: "커뮤니티",
            yourLocationMobile: "당신의 지역:",
            heroTitle: "우리 동네 축구 소식, K-BALLOG에서 전부 확인하세요!",
            heroSubtitle: "지역별 리그 순위, 경기 결과, 최신 뉴스를 한눈에. 당신의 팀을 응원하고 K-BALLOG와 함께하세요.",
            regionalLeagues: "지역별 리그 바로가기",
            seoulLeague: "서울 아마추어 리그",
            seoulLeagueDesc: "서울 지역의 K5, K6, K7 및 SSSL 리그의 최신 정보를 확인하세요.",
            suwonLeague: "수원 아마추어 리그",
            suwonLeagueDesc: "수원시에서 진행되는 주말 리그와 클럽들의 소식을 만나보세요.",
            incheonLeague: "인천 아마추어 리그",
            incheonLeagueDesc: "인천 지역의 다양한 아마추어 리그 정보와 경기 결과를 확인하세요.",
            yonginLeague: "용인 아마추어 리그",
            yonginLeagueDesc: "용인시의 축구 클럽들과 리그의 최신 소식을 제공합니다.",
            footerAbout: "회사 소개",
            footerTerms: "이용 약관",
            footerPrivacy: "개인정보 처리방침",
            footerContact: "문의하기",
            footerRights: "© 2024 K-BALLOG. All rights reserved."
        }
    };

    const languageSelect = document.getElementById('language-select');

    function translatePage(language) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[language] && translations[language][key]) {
                element.textContent = translations[language][key];
            }
        });
        document.documentElement.lang = language; // Update the lang attribute of the html tag
    }

    if (languageSelect) {
        languageSelect.addEventListener('change', (event) => {
            translatePage(event.target.value);
        });
    }

    // Tab functionality
    const tabContainer = document.querySelector('.league-data-section');
    if (tabContainer) {
        const tabButtons = tabContainer.querySelectorAll('.tab-btn');
        const tabContents = tabContainer.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.dataset.tab;

                // Deactivate all buttons and content
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Activate the clicked button and corresponding content
                button.classList.add('active');
                document.getElementById(tabName).classList.add('active');
            });
        });
    }

    // Mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.main-nav');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Auth functionality
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const userInfo = document.getElementById('user-info');
    const userGreeting = document.getElementById('user-greeting');

    const openModal = (modal) => modal.classList.remove('hidden');
    const closeModal = (modal) => modal.classList.add('hidden');

    if (loginBtn) loginBtn.addEventListener('click', () => openModal(loginModal));
    if (signupBtn) signupBtn.addEventListener('click', () => openModal(signupModal));

    [loginModal, signupModal].forEach(modal => {
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

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const passwordConfirm = document.getElementById('signup-password-confirm').value;

            if (password !== passwordConfirm) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(u => u.email === email)) {
                alert('이미 가입된 이메일입니다.');
                return;
            }

            users.push({ email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('회원가입이 완료되었습니다!');
            closeModal(signupModal);
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

    // Community post functionality
    const createPostForm = document.getElementById('create-post-form');
    const forumPostsContainer = document.querySelector('.forum-posts');

    // Function to save a new post
    if (createPostForm) {
        createPostForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('post-title').value;
            const content = document.getElementById('post-content').value;
            
            const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
            
            const newPost = {
                title,
                content,
                author: "축구팬", // Placeholder author
                date: new Date().toISOString(),
                views: 0,
                comments: 0
            };

            posts.unshift(newPost); // Add new post to the beginning of the array
            localStorage.setItem('forumPosts', JSON.stringify(posts));
            
            window.location.href = 'community.html';
        });
    }

    // Function to load and display posts
    if (forumPostsContainer) {
        const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
        
        if (posts.length === 0) {
            forumPostsContainer.innerHTML = '<p class="no-posts-message">아직 게시글이 없습니다. 첫 번째 글을 작성해보세요!</p>';
        } else {
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post-item');
                
                // Format date to be more readable (e.g., "2시간 전")
                const timeAgo = (new Date() - new Date(post.date)) / 1000; // in seconds
                let dateString;
                if (timeAgo < 60) {
                    dateString = `${Math.floor(timeAgo)}초 전`;
                } else if (timeAgo < 3600) {
                    dateString = `${Math.floor(timeAgo / 60)}분 전`;
                } else if (timeAgo < 86400) {
                    dateString = `${Math.floor(timeAgo / 3600)}시간 전`;
                } else {
                    dateString = `${Math.floor(timeAgo / 86400)}일 전`;
                }

                postElement.innerHTML = `
                    <div class="post-title"><a href="#">${post.title}</a></div>
                    <div class="post-meta">작성자: ${post.author}, ${dateString}</div>
                    <div class="post-stats">조회수 ${post.views}, 댓글 ${post.comments}</div>
                `;
                forumPostsContainer.appendChild(postElement);
            });
        }
    }
});

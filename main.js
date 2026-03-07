
document.addEventListener('DOMContentLoaded', function () {
    const mainElement = document.querySelector('main.container');
    const path = window.location.pathname;

    // Function to initialize common event listeners
    const initializeCommonListeners = () => {
        const tabs = document.querySelectorAll('.tab-link');

        tabs.forEach(tab => {
            // Check if the listener has already been attached
            if (tab.dataset.listenerAttached) {
                return;
            }
            tab.dataset.listenerAttached = 'true';

            tab.addEventListener('click', () => {
                const parentCard = tab.closest('.card'); // Find the parent card
                if (!parentCard) return;

                const targetId = tab.dataset.tab;
                const target = parentCard.querySelector(`#${targetId}`);

                // Deactivate all tabs and content within this card
                const cardTabs = parentCard.querySelectorAll('.tab-link');
                const cardTabContents = parentCard.querySelectorAll('.tab-content');
                
                cardTabs.forEach(t => t.classList.remove('active'));
                cardTabContents.forEach(c => c.classList.remove('active'));

                // Activate the clicked tab and its content
                tab.classList.add('active');
                if (target) {
                    target.classList.add('active');
                }
            });
        });

        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('.main-nav');
        if (hamburger && nav) {
            hamburger.addEventListener('click', () => {
                // Simple toggle for mobile nav visibility
                if (nav.style.display === 'block') {
                    nav.style.display = 'none';
                } else {
                    nav.style.display = 'block';
                }
            });
        }
    };

    // Location selector should be handled globally
    const locationSelect = document.getElementById('location-select');
    if (locationSelect) {
        locationSelect.addEventListener('change', function() {
            if (this.value) {
                window.location.href = this.value;
            }
        });
    }

    const loadSeoulContent = () => {
        mainElement.innerHTML = `
            <nav class="seoul-nav">
                <ul>
                    <li><a href="#" class="active">서울시 리그</a></li>
                    <li><a href="#">팀 목록</a></li>
                    <li><a href="#">선수 프로필</a></li>
                </ul>
            </nav>
            <div class="container" id="seoul-content">
                <section class="local-league-nav">
                    <h2>지역 리그 바로가기</h2>
                    <ul>
                        <li><a href="#">성북구 리그</a></li>
                        <li><a href="#">강남구 리그</a></li>
                        <li><a href="#">마포구 리그</a></li>
                        <li><a href="#">노원구 리그</a></li>
                         <li><a href="#">중랑구 리그</a></li>
                        <li><a href="#">은평구 리그</a></li>
                    </ul>
                </section>
                <section class="team-list">
                    <h2>성북구 리그 주요 팀</h2>
                    <div class="team-list-card"><a href="#">성북구30대상비단</a></div>
                    <div class="team-list-card"><a href="#">FC Corea</a></div>
                    <div class="team-list-card"><a href="#">양지</a></div>
                    <div class="team-list-card"><a href="#">석관</a></div>
                </section>
                <section class="profile-section">
                    <h2>주요 선수 프로필</h2>
                    <div class="profile-grid">
                        <div class="profile-card">
                            <img src="https://via.placeholder.com/110/24262e/f0f0f0?text=Player1" alt="Player 1" class="profile-card-img">
                            <h3>김성북</h3>
                            <p>성북구30대상비단</p>
                        </div>
                        <div class="profile-card">
                            <img src="https://via.placeholder.com/110/24262e/f0f0f0?text=Player2" alt="Player 2" class="profile-card-img">
                            <h3>박코리아</h3>
                            <p>FC Corea</p>
                        </div>
                        <div class="profile-card">
                            <img src="https://via.placeholder.com/110/24262e/f0f0f0?text=Player3" alt="Player 3" class="profile-card-img">
                            <h3>이양지</h3>
                            <p>양지</p>
                        </div>
                        <div class="profile-card">
                            <img src="https://via.placeholder.com/110/24262e/f0f0f0?text=Player4" alt="Player 4" class="profile-card-img">
                            <h3>최석관</h3>
                            <p>석관</p>
                        </div>
                    </div>
                </section>
            </div>
        `;
        initializeCommonListeners(); // Re-initialize listeners after loading content
    };

    const loadMatchContent = () => {
        mainElement.innerHTML = `
            <div class="container" id="match-content">
                <section class="latest-articles-section">
                    <h2>경기 일정 및 결과</h2>
                </section>
                <div class="card match-center">
                    <div class="card-header">
                        <h3>K리그 1</h3>
                        <div class="tabs">
                             <button class="tab-link active" data-tab="k1-results">최근 결과</button>
                             <button class="tab-link" data-tab="k1-fixtures">예정된 경기</button>
                        </div>
                    </div>
                    <div id="k1-results" class="tab-content active">
                        <div class="match-item"><span>울산 현대</span> <span class="score">2 - 1</span> <span>전북 현대</span></div>
                        <div class="match-item"><span>포항 스틸러스</span> <span class="score">1 - 0</span> <span>FC 서울</span></div>
                        <div class="match-item"><span>수원FC</span> <span class="score">3 - 3</span> <span>강원FC</span></div>
                    </div>
                     <div id="k1-fixtures" class="tab-content">
                        <div class="match-item"><span>인천 유나이티드</span> <span class="time">19:30</span> <span>제주 유나이티드</span></div>
                        <div class="match-item"><span>대구FC</span> <span class="time">20:00</span> <span>광주FC</span></div>
                    </div>
                </div>
                <div class="card match-center">
                    <div class="card-header">
                        <h3>K리그 2</h3>
                         <div class="tabs">
                             <button class="tab-link active" data-tab="k2-results">최근 결과</button>
                             <button class="tab-link" data-tab="k2-fixtures">예정된 경기</button>
                        </div>
                    </div>
                    <div id="k2-results" class="tab-content active">
                        <div class="match-item"><span>부산 아이파크</span> <span class="score">0 - 0</span> <span>경남 FC</span></div>
                        <div class="match-item"><span>김포FC</span> <span class="score">1 - 2</span> <span>안산 그리너스</span></div>
                         <div class="match-item"><span>충북청주FC</span> <span class="score">2 - 1</span> <span>천안시티FC</span></div>
                    </div>
                     <div id="k2-fixtures" class="tab-content">
                        <div class="match-item"><span>서울 이랜드 FC</span> <span class="time">15:00</span> <span>부천FC 1995</span></div>
                    </div>
                </div>
                 <div class="card match-center">
                    <div class="card-header">
                        <h3>서울시 조기축구 리그</h3>
                         <div class="tabs">
                             <button class="tab-link active" data-tab="seoul-results">최근 결과</button>
                             <button class="tab-link" data-tab="seoul-fixtures">예정된 경기</button>
                        </div>
                    </div>
                    <div id="seoul-results" class="tab-content active">
                        <div class="match-item"><span>성북구30대상비단</span> <span class="score">3 - 1</span> <span>FC Corea</span></div>
                        <div class="match-item"><span>양지</span> <span class="score">2 - 2</span> <span>석관</span></div>
                    </div>
                     <div id="seoul-fixtures" class="tab-content">
                        <div class="match-item"><span>Fc Dream</span> <span class="time">19:00</span> <span>서초구 Dice</span></div>
                    </div>
                </div>
            </div>
        `;
        initializeCommonListeners(); // Re-initialize listeners after loading content
    };

    // Route content based on path
    if (path.includes('seoul.html')) {
        loadSeoulContent();
    } else if (path.includes('match.html')) {
        loadMatchContent();
    }
    
    // Initialize listeners for the initial page load (e.g., for index.html)
    initializeCommonListeners();
});

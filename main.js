
document.addEventListener('DOMContentLoaded', function () {
    const path = window.location.pathname;

    // Data for all districts, will act as a mini-database
    const districtData = {
        seoul: {
            '성동구': {
                description: '성동구의 최신 아마추어 축구 리그 소식과 경기 정보를 확인하세요.',
                image: 'https://via.placeholder.com/800x450/1a1c23/f0f0f0?text=Seongdong',
                results: [
                    { teamA: '성동 FC', score: '3 - 1', teamB: '왕십리 유나이티드' },
                    { teamA: '금호 알레', score: '2 - 2', teamB: '옥수 이글스' }
                ],
                fixtures: [
                    { teamA: '응봉 타이거즈', time: '18:00', teamB: '마장 FC' },
                    { teamA: '성수 위너스', time: '20:00', teamB: '송정 팰컨스' }
                ],
                news: [
                    { title: '성동구, 2024 하반기 리그 개막', image: 'https://via.placeholder.com/400x225/1a1c23/f0f0f0?text=Seongdong+News+1' },
                    { title: '왕십리 유나이티드, 새로운 유니폼 공개', image: 'https://via.placeholder.com/400x225/1a1c23/f0f0f0?text=Seongdong+News+2' }
                ]
            },
            '강남구': {
                description: '강남구의 최신 아마추어 축구 리그 소식과 경기 정보를 확인하세요.',
                image: 'https://via.placeholder.com/800x450/1a1c23/f0f0f0?text=Gangnam',
                results: [
                    { teamA: '테헤란 FC', score: '1 - 0', teamB: '압구정 로데오' },
                ],
                fixtures: [
                    { teamA: '청담 FC', time: '19:00', teamB: '논현 유나이티드' },
                ],
                news: [
                    { title: '강남구 리그, 역대급 명경기 펼쳐져', image: 'https://via.placeholder.com/400x225/1a1c23/f0f0f0?text=Gangnam+News+1' },
                ]
            }
            // Add other Seoul districts here...
        },
        suwon: {
            '팔달구': {
                description: '수원시 팔달구의 생생한 축구 현장 소식을 전해드립니다.',
                image: 'https://via.placeholder.com/800x450/1a1c23/f0f0f0?text=Paldal',
                results: [
                    { teamA: '행궁 FC', score: '5 - 2', teamB: '화서 블루윙즈' },
                ],
                fixtures: [
                    { teamA: '매교 이글스', time: '18:00', teamB: '인계 FC' },
                ],
                news: [
                    { title: '팔달구 리그, 득점왕 경쟁 치열', image: 'https://via.placeholder.com/400x225/1a1c23/f0f0f0?text=Paldal+News+1' },
                ]
            },
            '영통구': {
                description: '수원시 영통구의 생생한 축구 현장 소식을 전해드립니다.',
                image: 'https://via.placeholder.com/800x450/1a1c23/f0f0f0?text=Yeongtong',
                results: [
                    { teamA: '광교 FC', score: '2 - 0', teamB: '매탄 유나이티드' },
                ],
                fixtures: [
                    { teamA: '원천 FC', time: '20:00', teamB: '영통 워리어스' },
                ],
                news: [
                    { title: '영통구, 새로운 잔디 구장 개장', image: 'https://via.placeholder.com/400x225/1a1c23/f0f0f0?text=Yeongtong+News+1' },
                ]
            }
            // Add other Suwon districts here...
        },
        incheon: {
            '연수구': {
                description: '인천 연수구의 아마추어 축구 열기를 느껴보세요.',
                image: 'https://via.placeholder.com/800x450/1a1c23/f0f0f0?text=Yeonsu',
                results: [
                    { teamA: '송도 국제도시 FC', score: '4 - 1', teamB: '동춘 유나이티드' },
                ],
                fixtures: [
                    { teamA: '선학 FC', time: '19:30', teamB: '옥련 타이거즈' },
                ],
                news: [
                    { title: '연수구, 유소년 축구 클리닉 개최', image: 'https://via.placeholder.com/400x225/1a1c23/f0f0f0?text=Yeonsu+News+1' },
                ]
            },
            '남동구': {
                description: '인천 남동구의 아마추어 축구 열기를 느껴보세요.',
                image: 'https://via.placeholder.com/800x450/1a1c23/f0f0f0?text=Namdong',
                results: [
                    { teamA: '구월 FC', score: '1 - 1', teamB: '논현 고잔 유나이티드' },
                ],
                fixtures: [
                    { teamA: '만수 FC', time: '21:00', teamB: '서창 어벤져스' },
                ],
                news: [
                    { title: '남동구 리그, 야간 경기로 전환', image: 'https://via.placeholder.com/400x225/1a1c23/f0f0f0?text=Namdong+News+1' },
                ]
            }
            // Add other Incheon districts here...
        }
    };

    // Function to initialize common event listeners (like tabs and hamburger)
    const initializeCommonListeners = () => {
        const tabs = document.querySelectorAll('.tab-link');
        tabs.forEach(tab => {
            if (tab.dataset.listenerAttached) return;
            tab.dataset.listenerAttached = 'true';
            tab.addEventListener('click', () => {
                const parentCard = tab.closest('.card');
                if (!parentCard) return;

                const targetId = tab.dataset.tab;
                const target = parentCard.querySelector(`#${targetId}`);

                parentCard.querySelectorAll('.tab-link').forEach(t => t.classList.remove('active'));
                parentCard.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

                tab.classList.add('active');
                if (target) target.classList.add('active');
            });
        });

        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('.main-nav');
        if (hamburger && nav) {
            hamburger.addEventListener('click', () => {
                nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
            });
        }
    };
    
    // Function to load dynamic content for district.html
    const loadDistrictContent = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const region = urlParams.get('region');
        const districtName = urlParams.get('name');

        const mainContainer = document.querySelector('main.container');

        if (!region || !districtName || !districtData[region] || !districtData[region][districtName]) {
            mainContainer.innerHTML = '<h2 style="text-align: center; color: white;">요청하신 권역 정보를 찾을 수 없습니다.</h2>';
            return;
        }

        const data = districtData[region][districtName];

        // Populate the template with data
        document.getElementById('district-image').src = data.image;
        document.getElementById('district-image').alt = `${districtName} 대표 이미지`;
        document.getElementById('district-category').textContent = region;
        document.getElementById('district-title').textContent = `${districtName} 축구 소식`;
        document.getElementById('district-description').textContent = data.description;
        document.getElementById('match-center-title').textContent = `${districtName} 매치 센터`;
        document.getElementById('news-section-title').textContent = `${districtName} 최신 뉴스`;

        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';
        data.results.forEach(match => {
            resultsContainer.innerHTML += `<div class="match-item"><span>${match.teamA}</span> <span class="score">${match.score}</span> <span>${match.teamB}</span></div>`;
        });

        const fixturesContainer = document.getElementById('fixtures');
        fixturesContainer.innerHTML = '';
        data.fixtures.forEach(match => {
            fixturesContainer.innerHTML += `<div class="match-item"><span>${match.teamA}</span> <span class="time">${match.time}</span> <span>${match.teamB}</span></div>`;
        });
        
        const newsGrid = document.getElementById('news-grid');
        newsGrid.innerHTML = '';
        data.news.forEach(article => {
            newsGrid.innerHTML += `
                <div class="news-card">
                    <img src="${article.image}" alt="기사 썸네일">
                    <h3>${article.title}</h3>
                </div>`;
        });
        
        initializeCommonListeners();
    };

    // Location selector logic
    const locationSelect = document.getElementById('location-select');
    if (locationSelect) {
        locationSelect.addEventListener('change', function() {
            if (this.value) window.location.href = this.value;
        });
    }

    // --- Routing ---
    // Route to the correct content loading function based on the HTML file name
    if (path.includes('district.html')) {
        loadDistrictContent();
    } else {
        // For all other pages (index, seoul, suwon, incheon, match), just initialize the listeners
        initializeCommonListeners();
    }
});

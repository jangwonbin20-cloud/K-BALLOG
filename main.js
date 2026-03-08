
document.addEventListener('DOMContentLoaded', function () {
    const path = window.location.pathname;

    // Helper function to create placeholder data for a district
    const createDistrictData = (region, districtName) => {
        const regionEng = {
            seoul: 'Seoul',
            suwon: 'Suwon',
            incheon: 'Incheon'
        }[region] || region;

        const districtEng = districtName.replace(/구$/, ''); // e.g., 성동구 -> Seongdong

        return {
            description: `${districtName}의 최신 아마추어 축구 리그 소식과 경기 정보를 확인하세요.`,
            image: `https://via.placeholder.com/800x450/1a1c23/f0f0f0?text=${regionEng}+${districtEng}`,
            results: [
                { teamA: `${districtName} FC`, score: '1 - 0', teamB: `${districtName} 유나이티드` },
            ],
            fixtures: [
                { teamA: `${districtName} 시티`, time: '19:00', teamB: `FC ${districtName}` },
            ],
            news: [
                { title: `${districtName}, 2024 하반기 리그 개막`, image: `https://via.placeholder.com/400x225/1a1c23/f0f0f0?text=${districtEng}+News` },
            ]
        };
    };

    // Data for all districts, acting as a mini-database
    const districtData = {
        seoul: {
            '성동구': createDistrictData('seoul', '성동구'),
            '강남구': createDistrictData('seoul', '강남구'),
            '강북구': createDistrictData('seoul', '강북구'),
            '도봉구': createDistrictData('seoul', '도봉구'),
            '노원구': createDistrictData('seoul', '노원구'),
            '은평구': createDistrictData('seoul', '은평구'),
            '서대문구': createDistrictData('seoul', '서대문구'),
            '마포구': createDistrictData('seoul', '마포구'),
            '강서구': createDistrictData('seoul', '강서구'),
            '구로구': createDistrictData('seoul', '구로구'),
            '금천구': createDistrictData('seoul', '금천구'),
            '영등포구': createDistrictData('seoul', '영등포구'),
            '동작구': createDistrictData('seoul', '동작구'),
            '관악구': createDistrictData('seoul', '관악구'),
            '서초구': createDistrictData('seoul', '서초구'),
            '송파구': createDistrictData('seoul', '송파구'),
            '강동구': createDistrictData('seoul', '강동구'),
            '종로구': createDistrictData('seoul', '종로구'),
            '중구': createDistrictData('seoul', '중구'),
            '용산구': createDistrictData('seoul', '용산구'),
            '광진구': createDistrictData('seoul', '광진구'),
            '중랑구': createDistrictData('seoul', '중랑구'),
            '동대문구': createDistrictData('seoul', '동대문구')
        },
        suwon: {
            '팔달구': createDistrictData('suwon', '팔달구'),
            '영통구': createDistrictData('suwon', '영통구'),
            '장안구': createDistrictData('suwon', '장안구'),
            '권선구': createDistrictData('suwon', '권선구')
        },
        incheon: {
            '연수구': createDistrictData('incheon', '연수구'),
            '남동구': createDistrictData('incheon', '남동구'),
            '부평구': createDistrictData('incheon', '부평구'),
            '서구': createDistrictData('incheon', '서구'),
            '계양구': createDistrictData('incheon', '계양구'),
            '미추홀구': createDistrictData('incheon', '미추홀구'),
            '중구': createDistrictData('incheon', '중구'),
            '동구': createDistrictData('incheon', '동구')
        }
    };

    // Function to initialize common event listeners
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

        document.title = `K-BALLOG - ${region} ${districtName}`;
        document.getElementById('district-image').src = data.image;
        document.getElementById('district-image').alt = `${districtName} 대표 이미지`;
        document.getElementById('district-category').textContent = region;
        document.getElementById('district-title').textContent = `${districtName} 축구 소식`;
        document.getElementById('district-description').textContent = data.description;
        document.getElementById('match-center-title').textContent = `${districtName} 매치 센터`;
        document.getElementById('news-section-title').textContent = `${districtName} 최신 뉴스`;

        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = data.results.map(match => 
            `<div class="match-item"><span>${match.teamA}</span> <span class="score">${match.score}</span> <span>${match.teamB}</span></div>`
        ).join('');

        const fixturesContainer = document.getElementById('fixtures');
        fixturesContainer.innerHTML = data.fixtures.map(match => 
            `<div class="match-item"><span>${match.teamA}</span> <span class="time">${match.time}</span> <span>${match.teamB}</span></div>`
        ).join('');
        
        const newsGrid = document.getElementById('news-grid');
        newsGrid.innerHTML = data.news.map(article => `
            <div class="news-card">
                <img src="${article.image}" alt="기사 썸네일">
                <h3>${article.title}</h3>
            </div>`
        ).join('');
        
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
    if (path.includes('district.html')) {
        loadDistrictContent();
    } else {
        initializeCommonListeners();
    }
});

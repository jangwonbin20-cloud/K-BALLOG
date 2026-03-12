
document.addEventListener('DOMContentLoaded', function () {
    const path = window.location.pathname;

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
                const isNavVisible = nav.style.display === 'block';
                nav.style.display = isNavVisible ? 'none' : 'block';
            });
        }
    };

    const locationSelect = document.getElementById('location-select');
    if (locationSelect) {
        locationSelect.addEventListener('change', function() {
            if (this.value) window.location.href = this.value;
        });

        const mobileLocationLabel = document.querySelector('.mobile-location-label');
        if (mobileLocationLabel) {
            const selectedOption = locationSelect.options[locationSelect.selectedIndex];
            mobileLocationLabel.textContent = `당신의 지역: ${selectedOption.text}`;

            locationSelect.addEventListener('change', function() {
                const selectedOption = this.options[this.selectedIndex];
                mobileLocationLabel.textContent = `당신의 지역: ${selectedOption.text}`;
            });
        }
    }

    const handleMatchSearch = () => {
        const searchButton = document.getElementById('search-button');
        if (!searchButton) return;

        searchButton.addEventListener('click', () => {
            const teamSearchValue = document.getElementById('team-search').value.toLowerCase();
            const dateSearchValue = document.getElementById('date-search').value;
            const leagueSearchValue = document.getElementById('league-search').value;

            document.querySelectorAll('.match-date-group').forEach(group => {
                let groupVisible = false;
                group.querySelectorAll('.match-list-item').forEach(item => {
                    const teamData = item.dataset.team.toLowerCase();
                    const leagueData = item.dataset.league;
                    const itemDate = group.dataset.date;

                    const teamMatch = !teamSearchValue || teamData.includes(teamSearchValue);
                    const dateMatch = !dateSearchValue || itemDate === dateSearchValue;
                    const leagueMatch = !leagueSearchValue || leagueData === leagueSearchValue;

                    if (teamMatch && dateMatch && leagueMatch) {
                        item.style.display = 'flex';
                        groupVisible = true;
                    } else {
                        item.style.display = 'none';
                    }
                });
                group.style.display = groupVisible ? 'block' : 'none';
            });
        });
    };

    const handleGlobalSearch = () => {
        const searchButton = document.getElementById('global-search-button');
        const searchInput = document.getElementById('global-search-input');
        const resultsContainer = document.getElementById('search-results-container');

        if (!searchButton || !searchInput || !resultsContainer) return;

        const searchIndex = [
            { url: 'index.html', type: 'page', title: '홈' },
            { url: 'match.html', type: 'page', title: '경기' },
            { url: 'seoul.html', type: 'page', title: '서울' },
            { url: 'suwon.html', type: 'page', title: '수원' },
            { url: 'incheon.html', type: 'page', title: '인천' },
            { url: 'yongin.html', type: 'page', title: '용인' }
        ];

        const executeSearch = async () => {
            const query = searchInput.value.toLowerCase().trim();
            if (query.length < 1) {
                resultsContainer.innerHTML = '<p>검색어를 1자 이상 입력해주세요.</p>';
                return;
            }

            resultsContainer.innerHTML = '<p>검색 중...</p>';
            let results = [];

            for (const page of searchIndex) {
                try {
                    const response = await fetch(page.url);
                    const html = await response.text();
                    const doc = new DOMParser().parseFromString(html, 'text/html');
                    const pageTitle = doc.querySelector('title').textContent;

                    if (pageTitle.toLowerCase().includes(query)) {
                        results.push({ title: pageTitle, url: page.url, context: `페이지 제목: ${pageTitle}` });
                    }

                    doc.querySelectorAll('h2, h3, p, span, td, a').forEach(el => {
                        if (el.textContent.toLowerCase().includes(query)) {
                            const context = el.textContent.substring(0, 150) + '...';
                            results.push({ title: pageTitle, url: page.url, context: context });
                        }
                    });
                } catch (error) {
                    console.error(`Error fetching or parsing ${page.url}:`, error);
                }
            }

            displayResults(results, query);
        };

        const displayResults = (results, query) => {
            if (results.length === 0) {
                resultsContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
                return;
            }

            const uniqueResults = [...new Map(results.map(item => [item['context'], item])).values()];

            resultsContainer.innerHTML = uniqueResults.map(result => {
                const highlightedContext = result.context.replace(new RegExp(query, 'gi'), (match) => `<span class="highlight">${match}</span>`);
                return `
                    <a href="${result.url}" class="news-card search-result-item">
                        <div class="news-card-content">
                            <h4>${result.title}</h4>
                            <p>${highlightedContext}</p>
                            <span class="article-date">${result.url}</span>
                        </div>
                    </a>
                `;
            }).join('');
        };

        searchButton.addEventListener('click', executeSearch);
        searchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') executeSearch();
        });
    };

    if (path.includes('match.html')) {
        handleMatchSearch();
    }

    if (path.includes('search.html')) {
        handleGlobalSearch();
    }

    initializeCommonListeners();
});

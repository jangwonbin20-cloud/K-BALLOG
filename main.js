document.addEventListener('DOMContentLoaded', function () {
    const path = window.location.pathname;

    const initializeCommonListeners = () => {
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
        const currentPage = path.split('/').pop();
        if (currentPage) {
            for (let i = 0; i < locationSelect.options.length; i++) {
                if (locationSelect.options[i].value === currentPage) {
                    locationSelect.selectedIndex = i;
                    break;
                }
            }
        }

        locationSelect.addEventListener('change', function() {
            if (this.value) window.location.href = this.value;
        });
    }

    const handleMatchSearch = () => {
        const searchButton = document.getElementById('search-button');
        const teamSearchInput = document.getElementById('team-search');
        const dateSearchInput = document.getElementById('date-search');
        const leagueSearchInput = document.getElementById('league-search');
        const noResultsMessage = document.getElementById('no-results-message');

        if (!searchButton) return;

        const filterMatches = () => {
            const teamSearchValue = teamSearchInput.value.toLowerCase();
            const dateSearchValue = dateSearchInput.value;
            const leagueSearchValue = leagueSearchInput.value;
            let hasResults = false;

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
                        hasResults = true;
                    } else {
                        item.style.display = 'none';
                    }
                });
                group.style.display = groupVisible ? 'block' : 'none';
            });

            if (noResultsMessage) {
                noResultsMessage.style.display = hasResults ? 'none' : 'block';
            }
        };

        searchButton.addEventListener('click', filterMatches);
    };

    const handleGlobalSearch = () => {
        const searchButton = document.getElementById('global-search-button');
        const searchInput = document.getElementById('global-search-input');
        const resultsContainer = document.getElementById('search-results-container');

        if (!searchButton || !searchInput || !resultsContainer) return;

        const searchIndex = [
            "index.html", "match.html", "search.html",
            "seoul.html", "suwon.html", "incheon.html", "yongin.html",
            "district.html",
            "incheon-k5.html", "incheon-k6.html", "incheon-k7.html",
            "seoul-k5.html", "seoul-k6-divA.html", "seoul-k6-divB.html", "seoul-k6.html",
            "seoul-k7-seongbuk-ranking.html", "seoul-k7-seongbuk-schedule.html", "seoul-k7-seongbuk.html", "seoul-k7.html",
            "seoul-sssl-div1.html", "seoul-sssl-div2.html", "seoul-sssl.html",
            "suwon-k5.html", "suwon-k6.html", "suwon-k7.html",
            "yongin-k5.html", "yongin-k6.html", "yongin-k7.html",
            "team-corea.html", "team-creo.html", "team-dice.html", "team-dream.html", "team-jeongneung-hornets.html",
            "team-sangbidan.html", "team-sb-30s.html", "team-seongbuk-fc.html", "team-yangji.html",
            "player-creo-fw1.html", "player-creo-mf1.html", "player-creo-df1.html", "player-creo-gk1.html",
            "player-dream-fw1.html", "player-dream-mf1.html", "player-dream-df1.html", "player-dream-gk1.html",
            "player-yangji-fw1.html", "player-yangji-mf1.html", "player-yangji-df1.html", "player-yangji-gk1.html",
            "staff-creo-coach1.html", "staff-dream-coach1.html", "staff-yangji-coach1.html",
            "profile-sangbidan-coach-1.html", "profile-sangbidan-coach-2.html", "profile-sangbidan-coach-3.html",
            "profile-sangbidan-player-1.html", "profile-sangbidan-player-2.html", "profile-sangbidan-player-3.html", "profile-sangbidan-player-4.html"
        ].map(url => ({ url, type: 'page' }));

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

                    doc.querySelectorAll('h1, h2, h3, h4, h5, p, span, td, th, a, li').forEach(el => {
                        if (el.textContent.toLowerCase().includes(query)) {
                            const context = el.closest('p, li, .card, .match-list-item, tr')?.textContent || el.textContent;
                            results.push({ title: pageTitle, url: page.url, context: context.substring(0, 200) + '...' });
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
                    <a href="${result.url}" class="unified-card">
                        <div class="unified-card-content">
                            <h3>${result.title}</h3>
                            <p>${highlightedContext}</p>
                            <span class="card-meta">${result.url}</span>
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

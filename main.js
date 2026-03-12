
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

    if (path.includes('match.html')) {
        handleMatchSearch();
    }

    initializeCommonListeners();
});

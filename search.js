document.addEventListener('DOMContentLoaded', async () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('resultsContainer');

    // List of pages to fetch content from
    const pagesToFetch = [
        'index.html',
        'match.html',
        'seoul.html',
        'suwon.html',
        'incheon.html',
        'seoul-k7.html',
        'seoul-k7-seongbuk.html',
        'seoul-k7-seongbuk-ranking.html',
        'seoul-k7-seongbuk-schedule.html',
        'team-corea.html',
        'team-creo.html',
        'team-dice.html',
        'team-dream.html',
        'team-jeongneung-hornets.html',
        'team-sangbidan.html',
        'team-sb-30s.html',
        'team-seongbuk-fc.html',
        'team-yangji.html',
        'player-creo-df1.html',
        'player-creo-fw1.html',
        'player-creo-gk1.html',
        'player-creo-mf1.html',
        'player-dream-df1.html',
        'player-dream-fw1.html',
        'player-dream-gk1.html',
        'player-dream-mf1.html',
        'player-yangji-df1.html',
        'player-yangji-fw1.html',
        'player-yangji-gk1.html',
        'player-yangji-mf1.html',
        'profile-sangbidan-coach-1.html',
        'profile-sangbidan-coach-2.html',
        'profile-sangbidan-coach-3.html',
        'profile-sangbidan-player-1.html',
        'profile-sangbidan-player-2.html',
        'profile-sangbidan-player-3.html',
        'profile-sangbidan-player-4.html',
        'staff-creo-coach1.html',
        'staff-dream-coach1.html',
        'staff-yangji-coach1.html'
    ];

    let searchableData = [];

    // Fetch and process content from each page
    for (const page of pagesToFetch) {
        try {
            const response = await fetch(page);
            if (!response.ok) {
                console.error(`Error fetching ${page}: ${response.statusText}`);
                continue;
            }
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const textContent = doc.body.innerText;

            // Simple sentence-level splitting and cleaning
            const sentences = textContent.split(/[.?!\n]+/).map(s => s.trim()).filter(s => s.length > 10); // Filter out short/empty strings
            searchableData.push(...sentences.map(sentence => ({ page, sentence })));
        } catch (error) {
            console.error(`Error fetching or parsing ${page}:`, error);
        }
    }

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        resultsContainer.innerHTML = '';

        if (!searchTerm) {
            resultsContainer.innerHTML = '<p>검색어를 입력해주세요.</p>';
            return;
        }

        const filteredResults = searchableData.filter(item => 
            item.sentence.toLowerCase().includes(searchTerm)
        );

        if (filteredResults.length > 0) {
            const uniqueResults = [...new Set(filteredResults.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));
            uniqueResults.forEach(item => {
                const resultElement = document.createElement('div');
                resultElement.className = 'search-result-item';

                const link = document.createElement('a');
                link.href = item.page;
                const title = item.page.replace('.html', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
                link.textContent = title;

                const sentencePara = document.createElement('p');
                sentencePara.innerHTML = item.sentence.replace(new RegExp(searchTerm, 'gi'), `<b>${searchTerm}</b>`);

                resultElement.appendChild(link);
                resultElement.appendChild(sentencePara);
                resultsContainer.appendChild(resultElement);
            });
        } else {
            resultsContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
        }
    });
});
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
        'incheon.html'
    ];

    let searchableData = [];

    // Fetch and process content from each page
    for (const page of pagesToFetch) {
        try {
            const response = await fetch(page);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const textContent = doc.body.innerText;

            // Simple sentence-level splitting
            const sentences = textContent.split(/[.?!\n]+/).map(s => s.trim()).filter(s => s.length > 10);
            searchableData.push(...sentences.map(sentence => ({ page, sentence })));
        } catch (error) {
            console.error(`Error fetching or parsing ${page}:`, error);
        }
    }

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
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
                link.textContent = item.page.replace('.html', '').toUpperCase();

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
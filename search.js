const articles = [
    {
        title: "'파리생제르맹 합류' 이강인, 프리시즌 경기 소화",
        date: "2024-07-20",
        thumbnail: "https://via.placeholder.com/400x225/1a1c23/f0f0f0?text=News+1",
        category: "K리그"
    },
    {
        title: "손흥민, 토트넘 주장으로 새 시즌 시작",
        date: "2024-07-19",
        thumbnail: "https://via.placeholder.com/400x225/1a1c23/f0f0f0?text=News+2",
        category: "해외축구"
    },
    {
        title: "K리그 2, 승격 플레이오프 경쟁 치열",
        date: "2024-07-18",
        thumbnail: "https://via.placeholder.com/400x225/1a1c23/f0f0f0?text=News+3",
        category: "K리그"
    }
];

document.getElementById('searchButton').addEventListener('click', () => {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    const filteredArticles = articles.filter(article => 
        article.title.toLowerCase().includes(searchTerm) || 
        article.category.toLowerCase().includes(searchTerm)
    );

    if (filteredArticles.length > 0) {
        filteredArticles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.className = 'news-card';
            articleElement.innerHTML = `
                <img src="${article.thumbnail}" alt="기사 썸네일">
                <h3>${article.title}</h3>
                <span class="article-date">${article.date}</span>
            `;
            resultsContainer.appendChild(articleElement);
        });
    } else {
        resultsContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
    }
});
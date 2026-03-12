document.addEventListener('DOMContentLoaded', () => {
    const memberCards = document.querySelectorAll('.member-card');

    memberCards.forEach(card => {
        const summary = card.querySelector('.member-summary');
        const details = card.querySelector('.member-details');

        if (summary && details) {
            summary.addEventListener('click', () => {
                card.classList.toggle('active');
            });
        }
    });
});

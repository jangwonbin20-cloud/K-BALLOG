
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

    initializeCommonListeners();
});

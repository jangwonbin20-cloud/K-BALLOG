
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
                nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
            });
        }
    };

    const locationSelect = document.getElementById('location-select');
    if (locationSelect) {
        locationSelect.addEventListener('change', function() {
            if (this.value) window.location.href = this.value;
        });
    }

    initializeCommonListeners();
});

// Dummy data for profiles
const profileData = {
    coach1: { name: '김감독', position: '감독', image: 'https://via.placeholder.com/120/1a1c23/f0f0f0?text=Coach', details: '팀을 이끄는 베테랑 감독' },
    player1: { name: '박공격', position: 'FW', image: 'https://via.placeholder.com/120/1a1c23/f0f0f0?text=FW', details: '빠른 발과 결정력을 갖춘 공격수' },
    player2: { name: '김미들', position: 'MF', image: 'https://via.placeholder.com/120/1a1c23/f0f0f0?text=MF', details: '넓은 시야와 패스 능력이 뛰어난 미드필더' },
    player3: { name: '이수비', position: 'DF', image: 'https://via.placeholder.com/120/1a1c23/f0f0f0?text=DF', details: '강력한 대인 방어 능력을 자랑하는 수비수' },
    player4: { name: '최골키', position: 'GK', image: 'https://via.placeholder.com/120/1a1c23/f0f0f0?text=GK', details: '놀라운 반사신경을 가진 골키퍼' },
};

function openModal(profileId) {
    const modal = document.getElementById('profileModal');
    const modalBody = document.getElementById('modal-body');
    const data = profileData[profileId];

    if (data) {
        modalBody.innerHTML = `
            <img src="${data.image}" alt="${data.name}">
            <h2>${data.name}</h2>
            <p>${data.position}</p>
            <p>${data.details}</p>
        `;
        modal.style.display = "block";
    }
}

function closeModal() {
    const modal = document.getElementById('profileModal');
    modal.style.display = "none";
}

// Close modal if user clicks outside of it
window.onclick = function(event) {
    const modal = document.getElementById('profileModal');
    if (event.target == modal) {
        closeModal();
    }
}

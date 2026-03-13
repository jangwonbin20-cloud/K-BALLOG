document.addEventListener('DOMContentLoaded', () => {
    // Accordion functionality for member cards
    document.querySelectorAll('.member-card').forEach(card => {
        const summary = card.querySelector('.member-summary');
        const details = card.querySelector('.member-details');

        if (summary && details) {
            summary.addEventListener('click', (e) => {
                // Do not toggle accordion if the click is on the photo upload area
                if (!e.target.closest('.player-photo')) {
                    card.classList.toggle('active');
                }
            });
        }
    });

    // --- Main Team Photo Upload Logic ---
    const teamPhotoUploadInput = document.getElementById('photo-upload-input');
    const teamPhotoImg = document.getElementById('team-photo-img');

    const savedTeamPhoto = localStorage.getItem('team-photo-creo');
    if (savedTeamPhoto) {
        teamPhotoImg.src = savedTeamPhoto;
    }

    if(teamPhotoUploadInput) {
        teamPhotoUploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageUrl = e.target.result;
                    teamPhotoImg.src = imageUrl;
                    localStorage.setItem('team-photo-creo', imageUrl);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- Individual Player Photo Upload Logic ---
    const membersSection = document.querySelector('.team-members-section');
    const playerPhotoStoreKey = 'playerPhotos-creo';

    const loadPlayerPhotos = () => {
        const savedPhotos = JSON.parse(localStorage.getItem(playerPhotoStoreKey)) || {};
        document.querySelectorAll('.player-card').forEach(card => {
            const playerId = card.dataset.playerId;
            if (playerId && savedPhotos[playerId]) {
                const img = card.querySelector('.player-photo img');
                if (img) {
                    img.src = savedPhotos[playerId];
                }
            }
        });
    };

    if (membersSection) {
        membersSection.addEventListener('click', e => {
            const uploadOverlay = e.target.closest('.photo-upload-overlay');
            if (uploadOverlay) {
                const input = uploadOverlay.querySelector('.player-photo-input');
                if (input) {
                    input.click();
                }
            }
        });

        membersSection.addEventListener('change', e => {
            if (e.target.classList.contains('player-photo-input')) {
                const input = e.target;
                const file = input.files[0];
                const card = input.closest('.player-card');
                const playerId = card.dataset.playerId;
                const img = card.querySelector('.player-photo img');

                if (file && card && playerId && img) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const imageUrl = event.target.result;
                        img.src = imageUrl;

                        const savedPhotos = JSON.parse(localStorage.getItem(playerPhotoStoreKey)) || {};
                        savedPhotos[playerId] = imageUrl;
                        localStorage.setItem(playerPhotoStoreKey, JSON.stringify(savedPhotos));
                    };
                    reader.readAsDataURL(file);
                }
            }
        });
    }

    loadPlayerPhotos();
});

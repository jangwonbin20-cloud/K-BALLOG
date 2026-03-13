document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isAdmin = currentUser && currentUser.role === 'admin';

    // Accordion functionality for member cards
    document.querySelectorAll('.member-card').forEach(card => {
        const summary = card.querySelector('.member-summary');
        if (summary) {
            summary.addEventListener('click', (e) => {
                // Allow accordion toggle only if not clicking on the upload overlay
                if (!e.target.closest('.photo-upload-overlay')) {
                    card.classList.toggle('active');
                }
            });
        }
    });

    const teamPhotoUploadContainer = document.querySelector('.photo-upload-container');
    const teamPhotoUploadInput = document.getElementById('photo-upload-input');
    const teamPhotoImg = document.getElementById('team-photo-img');
    const playerPhotoStoreKey = 'playerPhotos-creo';

    // Show team photo upload button only for admins
    if (isAdmin && teamPhotoUploadContainer) {
        teamPhotoUploadContainer.classList.remove('hidden');
    } else if (teamPhotoUploadContainer) {
        teamPhotoUploadContainer.classList.add('hidden');
    }

    // Load saved team photo from localStorage
    const savedTeamPhoto = localStorage.getItem('team-photo-creo');
    if (savedTeamPhoto) {
        teamPhotoImg.src = savedTeamPhoto;
    }

    // Team photo upload event
    if (isAdmin && teamPhotoUploadInput) {
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

    if (isAdmin) {
        // Add admin-view class to enable hover effects for admins
        document.querySelectorAll('.player-card').forEach(card => {
            card.classList.add('admin-view');
        });

        if (membersSection) {
            membersSection.addEventListener('click', e => {
                const uploadOverlay = e.target.closest('.photo-upload-overlay');
                if (uploadOverlay) {
                    const input = uploadOverlay.querySelector('.player-photo-input');
                    if (input) {
                        input.click(); // Trigger file input
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
    }

    // Always load photos, regardless of admin status
    loadPlayerPhotos();
});

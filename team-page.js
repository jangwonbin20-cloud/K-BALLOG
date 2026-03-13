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

    const photoUploadInput = document.getElementById('photo-upload-input');
    const teamPhotoImg = document.getElementById('team-photo-img');

    // Load saved photo from localStorage
    const savedPhoto = localStorage.getItem('team-photo-creo');
    if (savedPhoto) {
        teamPhotoImg.src = savedPhoto;
    }

    photoUploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                teamPhotoImg.src = imageUrl;
                // Save photo to localStorage
                localStorage.setItem('team-photo-creo', imageUrl);
            };
            reader.readAsDataURL(file);
        }
    });
});

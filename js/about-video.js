/* js/about-video.js — Floating video showcase click handler and modal player logic */
(function () {
    'use strict';

    const openVideoBtn  = document.getElementById('open-video-btn');
    const videoModal    = document.getElementById('video-modal');
    const modalOverlay  = document.getElementById('video-modal-overlay');
    const modalClose    = document.getElementById('video-modal-close');
    const campusVideo   = document.getElementById('campus-video');

    // A scenic university/campus showcase video (drone tour)
    const videoUrl = 'https://www.youtube.com/embed/V42a42aPkiM?autoplay=1&rel=0';

    if (!openVideoBtn || !videoModal || !campusVideo) return;

    function openModal() {
        // Set the src only when opening to prevent background loading/playing
        campusVideo.src = videoUrl;
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable page scrolling
    }

    function closeModal() {
        videoModal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable page scrolling
        // Clear src to stop video playback instantly
        campusVideo.src = '';
    }

    // Event listeners
    openVideoBtn.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Escape key press to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });
})();

document.addEventListener('DOMContentLoaded', () => {
    const videoContainers = document.querySelectorAll('.product-video');

    videoContainers.forEach(videoContainer => {
        const overlay = videoContainer.querySelector('.overlay');

        videoContainer.addEventListener('mouseover', () => {
            overlay.style.display = 'block';
        });

        videoContainer.addEventListener('mouseout', () => {
            overlay.style.display = 'none';
        });
    });
});

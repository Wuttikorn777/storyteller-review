let currentIndex = 0;
const images = document.querySelectorAll('.slider img');
const totalImages = images.length;
const dots = document.querySelectorAll('.dot');

function showNextImage() {
    currentIndex++;
    if (currentIndex >= totalImages) {
        currentIndex = 0;
    }
    updateSliderPosition();
    updateDots();
}

function updateSliderPosition() {
    const slider = document.querySelector('.slider');
    const offset = -currentIndex * 33.3333;  // Move to the next image
    slider.style.transform = `translateX(${offset}%)`;
}

function updateDots() {
    // Reset all dots to inactive
    dots.forEach(dot => dot.classList.remove('active'));

    // Set the current dot to active
    dots[currentIndex].classList.add('active');
}

// Change image every 3 seconds
setInterval(showNextImage, 3000);

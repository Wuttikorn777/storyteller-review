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
    const offset = -currentIndex * 100;  // 100% ของความกว้างทั้งหมด
    slider.style.transition = "transform 1s ease-in-out";  // เพิ่มการเปลี่ยนแปลงที่นุ่มนวล
    slider.style.transform = `translateX(${offset}%)`;
}

function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

// เปลี่ยนภาพทุกๆ 3 วินาที
setInterval(showNextImage,3000);  

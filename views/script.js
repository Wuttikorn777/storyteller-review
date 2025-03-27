let currentIndex = 0;
const images = document.querySelectorAll('.slider-item');
const totalImages = images.length;
const slider = document.querySelector('.slider');
const dots = document.querySelectorAll('.dot');

// แสดงภาพถัดไป
function showNextImage() {
  currentIndex++;
  if (currentIndex >= totalImages) {
    currentIndex = 0;
  }
  updateSliderPosition();
  updateDots();
}

// แสดงภาพก่อนหน้า
function showPrevImage() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = totalImages - 1;
  }
  updateSliderPosition();
  updateDots();
}

// อัปเดตตำแหน่งของ slider
function updateSliderPosition() {
  const offset = -currentIndex * 100;  // ใช้เปอร์เซ็นต์เพื่อเลื่อนภาพ
  slider.style.transform = `translateX(${offset}%)`;
}

// อัปเดตตำแหน่งของ dots
function updateDots() {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

// ฟังก์ชันเลื่อนภาพโดยใช้ scroll wheel
slider.addEventListener('wheel', (event) => {
  event.preventDefault();
  if (event.deltaY > 0) {
    showNextImage();  // เลื่อนภาพถัดไป
  } else {
    showPrevImage();  // เลื่อนภาพก่อนหน้า
  }
});

// ตั้งเวลาให้เลื่อนภาพทุกๆ 3 วินาที
setInterval(showNextImage, 3000);

// การควบคุมปุ่ม prev และ next
document.querySelector('.prev').addEventListener('click', showPrevImage);
document.querySelector('.next').addEventListener('click', showNextImage);

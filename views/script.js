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

document.addEventListener("DOMContentLoaded", function () {
  loadBookmarks();
});

function loadBookmarks() {
  let bookmarkList = document.getElementById("bookmark-list");
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

  if (bookmarks.length === 0) {
      bookmarkList.innerHTML = "<p>No bookmarks yet.</p>";
      return;
  }

  bookmarkList.innerHTML = ""; // เคลียร์ค่าก่อนโหลดใหม่

  bookmarks.forEach((movie, index) => {
      let listItem = document.createElement("li");
      listItem.innerHTML = `
          <img src="${movie.poster}" alt="${movie.title}" width="100">
          <h3>${movie.title}</h3>
          <button onclick="removeBookmark(${index})">Remove</button>
      `;
      bookmarkList.appendChild(listItem);
  });
}

function removeBookmark(index) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  loadBookmarks(); // โหลดใหม่หลังลบ
}
function addBookmark(title, poster) {
  let bookmarks = getUserBookmarks();
  if (!bookmarks.some(b => b.title === title)) {
      bookmarks.push({ title, poster });
      saveUserBookmarks(bookmarks);
  }
  loadBookmarks();
}

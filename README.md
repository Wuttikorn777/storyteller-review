# 🎬 Storyteller Review System

Web Application สำหรับรีวิวภาพยนตร์/เรื่องราว (Storyteller) และระบบจัดการงาน (Task Management) พัฒนาด้วยสถาปัตยกรรมแบบ **MVC (Model-View-Controller)** โดยใช้ **Node.js** และเก็บข้อมูลแบบ **File-based System (JSON)**

## ✨ ฟีเจอร์หลัก (Key Features)

### 🔐 1. Authentication & Security
* **Admin Login:** ระบบล็อกอินเข้าใช้งานสำหรับผู้ดูแลระบบ (Session-based Authentication)
* **Encryption:** มีการเข้ารหัสข้อมูล (อ้างอิงจาก `util` Class)

### 📚 2. Bookmark Management
จัดการรายการเรื่องที่สนใจ (Bookmarks) ได้อย่างครบถ้วน:
* **CRUD:** เพิ่ม และ ลบรายการ Bookmark
* **Sorting:** เรียงลำดับตามชื่อเรื่อง (A-Z และ Z-A)
* **Search:** ค้นหา Bookmark จากชื่อเรื่อง
* **Advanced Delete:** ฟังก์ชันลบรายการแรกสุด (`deleteFirstByUser`) และล่าสุด (`deleteLastByUser`)

### ⭐ 3. Review System (Comments & Ratings)
* **Rating:** ให้คะแนนภาพยนตร์ พร้อมคำนวณคะแนนเฉลี่ย (Average Rating) และนับจำนวนโหวตอัตโนมัติ
* **Comments:** เขียนคอมเมนต์แสดงความคิดเห็นในแต่ละเรื่องได้

### 📝 4. Task Management
ระบบจัดการงาน (Task) ภายในโปรเจค:
* เพิ่ม/ลบ งาน (Add/Delete Tasks)
* จัดลำดับความสำคัญ (Priority Sorting)
* ค้นหางานจากชื่อ (Search by Name)

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)
* **Backend:** Node.js, Express.js (Assumed framework)
* **Architecture:** MVC Pattern (Models, Views, Controllers)
* **Database:** JSON Files (`bookmarks.json`, `ratings.json`, `tasks.json`) - *ไม่ต้องติดตั้ง Database Server เพิ่ม*
* **Testing:** Unit Testing (folder `test`)
* **CI/CD:** Azure Pipelines

---

## 🚀 วิธีการติดตั้งและรันโปรเจค (Installation)

1. **Clone Repository**
   ```bash
   git clone [https://github.com/Wuttikorn777/storyteller-review.git](https://github.com/Wuttikorn777/storyteller-review.git)
2. **ติดตั้ง Dependencies เข้าไปที่โฟลเดอร์โปรเจคแล้วรันคำสั่ง:**
   ```bash
   npm install
3. **รันโปรเจค**
   ```bash
   npm start
4. **เข้าใช้งาน เปิด Browser** http://localhost:3000
 

![Logo_of_Srinakharinwirot_University.svg](/.attachments/Logo_of_Srinakharinwirot_University-ab3203f4-9d29-40ed-af4f-cf0c0891d8b8.svg) </center>


#**STORYTELLER** </center>

ผู้ช่วยศาสตราจารย์ ดร. วีรยุทธ เจริญเรืองกิจ </center>
<br>
โดย </center>
<br>

กลุ่ม doublep </center>
<br>

นางสาวจิณณพัต ทองบ้านกวย 66102010232 </center>

นางสาวธนัญญา ธนะเมศฐ์เกศกุล 66102010240 </center>

นายวุฒิกร จันทวิเศษ 66102010246 </center>
<br>

โครงงานนี้เป็นส่วนหนึ่งของการศึกษารายวิชา คพ252 </center>
 
วิทยาศาสตร์คอมพิวเตอร์ มหาวิทยาลัยศรีนครินทรวิโรฒ </center>

ภาคการศึกษาที่ 2 ปีการศึกษา 2567</center>

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>


**อธิบายการทำงานของ data structure**
- users.json: เก็บข้อมูลของผู้ใช้ที่ลงทะเบียนในระบบ เช่น ชื่อผู้ใช้ (username), อีเมล (email), และรหัสผ่านที่เข้ารหัส (password)
- movies.json: เก็บข้อมูลของภาพยนตร์ เช่น ชื่อภาพยนตร์, ปีที่ออกฉาย, คำอธิบาย, การจัดอันดับเฉลี่ย, และความคิดเห็นจากผู้ใช้ <br>
การใช้ไฟล์ JSON เป็น Data Structure ช่วยให้ข้อมูลทั้งหมดสามารถเก็บรักษาได้ในรูปแบบที่อ่านและเขียนง่าย โดยไม่ต้องใช้ฐานข้อมูลภายนอก <br>
การเรียก API: โค้ดนี้ใช้ Express.js เพื่อสร้าง API สำหรับให้บริการต่าง ๆ มีการเรียก API สำหรับการลงทะเบียนผู้ใช้, การเข้าสู่ระบบ, และการจัดการงาน

<br>

**มีการเรียก API ดังนี้**
- API สำหรับการลงทะเบียนผู้ใช้ (POST /register): เมื่อผู้ใช้ส่งข้อมูล username, email, และ password ผ่านฟอร์มลงทะเบียน ระบบจะรับข้อมูลเหล่านี้และทำการ แฮชรหัสผ่าน ด้วย bcrypt ก่อนที่จะบันทึกข้อมูลผู้ใช้ใหม่ลงในไฟล์ users.json. การ แฮชรหัสผ่าน เป็นการคำนวณที่สำคัญเพื่อป้องกันข้อมูลรหัสผ่านที่ไม่ปลอดภัยในการเก็บในไฟล์
- API สำหรับการเข้าสู่ระบบผู้ใช้ (POST /login): เมื่อผู้ใช้ส่งข้อมูล username และ password เข้ามา ระบบจะตรวจสอบข้อมูลในไฟล์ users.json โดยการเปรียบเทียบรหัสผ่านที่แฮชแล้วกับรหัสผ่านที่ผู้ใช้ป้อนมา
- ระบบใช้ bcrypt เพื่อ ตรวจสอบรหัสผ่านที่แฮช ว่าตรงกับรหัสผ่านที่เก็บไว้ในไฟล์หรือไม่ 

<br>

**มีการคำนวณที่สำคัญสองประเภทในระบบนี้**
- การแฮชรหัสผ่าน: การใช้ bcrypt ในการ แฮชรหัสผ่าน เป็นการคำนวณที่สำคัญ ซึ่งจะทำให้รหัสผ่านถูกแปลงเป็นรูปแบบที่ไม่สามารถอ่านได้และสามารถนำไปเก็บในไฟล์ได้อย่างปลอดภัย <br>
javascript Copy bcrypt.hash(password, 10, (err, hashedPassword) => { if (err) return res.status(500).send('Error hashing password'); // Save hashedPassword }); 
- การตรวจสอบรหัสผ่าน: เมื่อล็อกอิน, ระบบจะใช้ bcrypt.compare() เพื่อตรวจสอบว่า รหัสผ่านที่ผู้ใช้กรอก ตรงกับ รหัสผ่านที่แฮชแล้ว ที่เก็บในไฟล์ users.json หรือไม่: <br>
javascript Copy bcrypt.compare(password, user.password, (err, result) => { if (err || !result) return res.status(400).send('Invalid credentials'); // Proceed with login });

<br>
<br>

**Process**
1.  Requirement Analysis (วิเคราะห์ความต้องการ)
ศึกษาความต้องการของผู้ใช้และฟังก์ชันที่จำเป็น กำหนดคุณสมบัติหลัก (Features) ของระบบ
2.  System Design (ออกแบบระบบ)
ออกแบบโครงสร้าง UI/UX และการทำงานของเว็บไซต์ วางระบบ API และ Backend Logic
3.  Development (พัฒนาและเขียนโค้ด)
พัฒนาเว็บไซต์โดยใช้ HTML เป็นโครงสร้างหลัก, CSS ในการออกแบบ และ JavaScript สำหรับการทดสอบ ใช้ Git และ Azure DevOps ในการจัดการโค้ด เขียน Unit Test และ Integration Test
4.  Testing (ทดสอบระบบ)
ทดสอบการทำงานของระบบด้วย Jest ตรวจสอบ API, ฟังก์ชันหลัก, Load Testing และ Security Testing
5.  Deployment (นำระบบขึ้นใช้งานจริง)
ใช้ CI/CD ผ่าน Azure DevOps Pipelines Deploy ระบบบน Azure Web Services
6.  Maintenance & Updates (ดูแลและอัปเดตระบบ)
ตรวจสอบข้อผิดพลาดและ Debugging อัปเดต Features และแก้ไข Bug
7.  Retrospective (วิเคราะห์และปรับปรุงกระบวนการทำงาน)
วิเคราะห์ปัญหาที่เกิดขึ้น ปรับปรุงกระบวนการทำงานของทีมเพื่อเพิ่มประสิทธิภาพ

**Method**

1.Agile Development
*   ใช้แนวคิด Scrum ในการบริหารโปรเจกต์
*   มี Sprint Planning, Daily Standup และ Retrospective

2.Test-Driven Development (TDD)
*   เขียน Test ก่อนพัฒนาโค้ดจริง
*   ใช้ Unit Test, Integration Test และ End-to-End Test

3.Continuous Integration & Continuous Deployment (CI/CD)
*   ใช้ Azure DevOps Pipelines ในการ Automate Deployment

**Tools**

 Tools (เครื่องมือที่ใช้)

1.Development Tools Node.js :
ใช้เป็น Backend Framework Express.js : ใช้สร้าง REST API Json : ใช้พัฒนา Frontend 

2.Version Control & Collaboration Git & GitHub / Azure DevOps : ใช้จัดการโค้ดและติดตามการเปลี่ยนแปลง Postman : ใช้ทดสอบ API

3.Testing & CI/CD Jest : ใช้ทดสอบโค้ด Azure DevOps Pipelines : ใช้ Automate Deployment

4.Monitoring & Logging Docker & Kubernetes → ใช้ Deploy ระบบแบบ Containerized Prometheus / Grafana → ใช้ Monitor ระบบ Logstash / Kibana → ใช้จัดการ Logs

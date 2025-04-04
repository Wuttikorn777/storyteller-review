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



**ตาราง** **Unit Test Case** **ที่ทดสอบ** **Data Structure**
    
| **Test ID**<br> | **Test Cases**<br> | **ฟังก์ชันที่ทดสอบ**<br> | **Expected Result**<br> | **Actual Result**<br> | **Status (Pass/Fail)**<br> |
| --- | --- | --- | --- | --- | --- |
| 1<br> | ทดสอบการเพิ่มภาพยนตร์ใหม่ที่มีข้อมูลครบถ้วน<br> | addMovie(name, releaseYear, rating, comments)<br> | เพิ่มภาพยนตร์สำเร็จ และอัพเดตไฟล์ JSON<br> | ตัวภาพยนตร์ถูกเพิ่มในไฟล์ JSON และอัพเดตสำเร็จ<br> | Pass<br> |
| 2<br> | ทดสอบการเพิ่มภาพยนตร์ที่ไม่มีคะแนน<br> | addMovie(name, releaseYear, rating, comments)<br> | ควรแสดงข้อความ "Movie cannot be added without a rating!" และไม่เพิ่มภาพยนตร์<br> | แสดงข้อความ "Movie cannot be added without a rating!" และไม่เพิ่มภาพยนตร์<br> | Pass<br> |
| 3<br> | ทดสอบการเพิ่มภาพยนตร์ที่มีข้อมูลไม่ครบ (เช่น ไม่มีชื่อหรือปีที่ออก)<br> | addMovie(name, releaseYear, rating, comments)<br> | ไม่ควรเพิ่มภาพยนตร์ และควรแสดงข้อความแสดงข้อผิดพลาด<br> | ข้อผิดพลาดแสดงเมื่อข้อมูลไม่ครบ และไม่สามารถเพิ่มภาพยนตร์<br> | Pass<br> |
| 4<br> | ทดสอบการเพิ่มภาพยนตร์ที่มีความคิดเห็นซ้ำ<br> | addMovie(name, releaseYear, rating, comments)<br> | ควรจัดการกับความคิดเห็นที่ซ้ำได้อย่างถูกต้อง<br> | ความคิดเห็นที่ซ้ำได้รับการจัดการและเพิ่มตามที่คาดหวัง<br> | Pass<br> |
| 5<br> | ทดสอบการอัปเดตข้อมูลของภาพยนตร์ที่มีอยู่แล้ว<br> | updateMovie(name, newRating, newComments)<br> | ข้อมูลของภาพยนตร์จะได้รับการอัปเดตในไฟล์ movies.json<br> | ข้อมูลของภาพยนตร์ถูกอัปเดตสำเร็จในไฟล์ JSON<br> | Pass<br> |
| 6<br> | ทดสอบการอัปเดตภาพยนตร์ที่ไม่พบในระบบ<br> | updateMovie(name, newRating, newComments)<br> | ควรคืนค่า null ถ้าไม่พบภาพยนตร์<br> | คืนค่า null เนื่องจากไม่พบภาพยนตร์<br> | Pass<br> |
| 7<br> | ทดสอบการลบภาพยนตร์ที่มีอยู่ในระบบ<br> | deleteMovie(name)<br> | ลบภาพยนตร์ออกจากไฟล์ movies.json สำเร็จ<br> | ภาพยนตร์ถูกลบออกจากไฟล์ JSON<br> | Pass<br> |
| 8<br> | ทดสอบการลบภาพยนตร์ที่ไม่พบในระบบ<br> | deleteMovie(name)<br> | ควรคืนค่า false ถ้าไม่พบภาพยนตร์<br> | คืนค่า false เนื่องจากไม่พบภาพยนตร์<br> | Pass<br> |
| 9<br> | ทดสอบการเพิ่มผู้ใช้ใหม่ที่มีข้อมูลครบถ้วน<br> | addUser(username, email, password)<br> | เพิ่มผู้ใช้สำเร็จ พร้อมแฮชรหัสผ่านและบันทึกลงในไฟล์<br> | ผู้ใช้ถูกเพิ่มสำเร็จและข้อมูลถูกบันทึก<br> | Pass<br> |
| 10<br> | ทดสอบการเพิ่มผู้ใช้ที่มีข้อมูลไม่ครบ (เช่น ไม่มีชื่อ, อีเมล หรือรหัสผ่าน)<br> | addUser(username, email, password)<br> | ควรแสดงข้อความ "User information is incomplete!" และไม่เพิ่มผู้ใช้<br> | แสดงข้อความ "User information is incomplete!" และไม่เพิ่มผู้ใช้<br> | Pass<br> |
| 11<br> | ทดสอบการเพิ่มผู้ใช้ที่อีเมลไม่ถูกต้อง<br> | addUser(username, email, password)<br> | ควรแสดงข้อความ "Invalid email format!" และไม่เพิ่มผู้ใช้<br> | แสดงข้อความ "Invalid email format!" และไม่เพิ่มผู้ใช้<br> | Pass<br> |
| 12<br> | ทดสอบการอัปเดตข้อมูลของผู้ใช้ที่มีอยู่ในระบบ<br> | updateUser(username, newEmail, newPassword)<br> | ข้อมูลของผู้ใช้จะได้รับการอัปเดตพร้อมอีเมลและรหัสผ่านใหม่<br> | ข้อมูลของผู้ใช้ถูกอัปเดตสำเร็จ<br> | Pass<br> |
| 13<br> | ทดสอบการอัปเดตผู้ใช้ที่ไม่พบในระบบ<br> | updateUser(username, newEmail, newPassword)<br> | ควรคืนค่า null ถ้าไม่พบผู้ใช้<br> | คืนค่า null เนื่องจากไม่พบผู้ใช้<br> | Pass<br> |

<br>

 
    
**ตาราง** **Static Profiling**
    
| **Metric**<br> | **index.js**<br> | **models.movieData.test.js**<br> | **models.userData.test.js**<br> |
| --- | --- | --- | --- |
| **Lines of Code**<br> | 286<br> | 72<br> | 43<br> |
| **Complexity**<br> | 28<br> | 1<br> | 1<br> |
| **Estimated Errors**<br> | 2.91<br> | 0.86<br> | 0.43<br> |
| **Lint Errors**<br> | 51<br> | 28<br> | 13<br> |
| **Maintainability**<br> | 74.46<br> | 76.07<br> | 77.39<br> |
| **Difficulty**<br> | 3.00<br> | 1.00<br> | 1.00<br> |

<br>

![Screenshot 2568-04-04 at 14.06.48.png](/.attachments/Screenshot%202568-04-04%20at%2014.06.48-128a6927-2088-42ad-b644-c56c608f20ea.png)

<br>

![Screenshot 2568-04-04 at 14.06.57.png](/.attachments/Screenshot%202568-04-04%20at%2014.06.57-d9e22815-ef66-4be0-ba57-50881fe7808e.png)

<br>

![Screenshot 2568-04-04 at 14.07.03.png](/.attachments/Screenshot%202568-04-04%20at%2014.07.03-ef3fceb8-1142-407e-a551-694c6823cae9.png)

<br>

![Screenshot 2568-04-04 at 14.20.03.png](/.attachments/Screenshot%202568-04-04%20at%2014.20.03-e7b34dd2-ff5d-42df-9bdb-11317bb51dcf.png)

<br>

![Screenshot 2568-04-04 at 14.19.53.png](/.attachments/Screenshot%202568-04-04%20at%2014.19.53-49e71e94-ca16-4fd2-9636-b95500245952.png)

<br>

![Screenshot 2568-04-04 at 14.20.14.png](/.attachments/Screenshot%202568-04-04%20at%2014.20.14-c3d600ae-6d75-4dd2-b0b5-a1345f74648d.png)

<br>



**Dynamic profiling (Structural method)**

    
| **Metric**<br> | **Value**<br> |
| --- | --- |
| **Total Time**<br> | 37.38 seconds<br> |
| **Scripting Time**<br> | 399 ms<br> |
| **Painting Time**<br> | 157 ms<br> |
| **Rendering Time**<br> | 148 ms<br> |
| **Loading Time**<br> | 46 ms<br> |
| **Memory Usage**<br> | 21.4 MB – 43.8 MB<br> |
| **JS Heap**<br> | 21.4 MB – 43.8 MB<br> |
| **Documents Transferred**<br> | 443 kB<br> |
| **Transfer Time**<br> | 734.8 ms<br> |
| **Nodes Transferred**<br> | 2,291 – 6,627<br> |
| **Listeners**<br> | 266 – 692<br> |
| **Extension Impact**<br> | Extension (significant load time)<br> |
<br>

![image.png](/.attachments/image-bbb8bfc9-912e-4630-9c09-990084b9e27d.png)

<br>

![Screenshot 2568-04-03 at 23.43.13.png](/.attachments/Screenshot%202568-04-03%20at%2023.43.13-44e3ffa1-e5d1-4f24-b00a-0243eb80bafe.png)

<br>

![Screenshot 2568-04-04 at 14.30.09.png](/.attachments/Screenshot%202568-04-04%20at%2014.30.09-77eaed80-d07d-4603-a8e0-060914494e57.png)

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

4.Monitoring & Logging Docker & Kubernetes : ใช้ Deploy ระบบแบบ Containerized Prometheus / Grafana : ใช้ Monitor ระบบ Logstash / Kibana : ใช้จัดการ Logs

<br>
<br>

**Website screenshot**<br>
login.ejs 
 ![](https://cdn.discordapp.com/attachments/1334407474488279110/1357331475518849196/image.png?ex=67f079b1&is=67ef2831&hm=60362d5371c78ca0c1cde6c12af00ffe5325b023d4d2af17d456c579f8ddb6bd&=) <br>
register.ejs 
![](https://cdn.discordapp.com/attachments/1334407474488279110/1357331578577223922/image.png?ex=67f079ca&is=67ef284a&hm=d6e87ab2af0315425a7a75146896e5efd697eb108086ea8c251108e6842eeaae&=) <br>
home.ejs
![](https://cdn.discordapp.com/attachments/1334407474488279110/1357331728607350925/image.png?ex=67f079ee&is=67ef286e&hm=bfaaa8fb3eaab05a518f383742c3e61dfe63a62737ade3c1fc611d577113ea32&=)
![](https://cdn.discordapp.com/attachments/1334407474488279110/1357331825021681905/image.png?ex=67f07a05&is=67ef2885&hm=aaddb2a8a807927a67f676e682d96db1a31af9a939ab2f6f67b2da6560d8a03b&=)<br>
genre.ejs
![](https://cdn.discordapp.com/attachments/1334407474488279110/1357331970635468840/image.png?ex=67f07a27&is=67ef28a7&hm=b103b6c7594fedaf72de83a9611f1e821e98c829567016f0187cde451f28d938&=)
![](https://cdn.discordapp.com/attachments/1334407474488279110/1357333071728476291/image.png?ex=67f07b2e&is=67ef29ae&hm=8d2b4900ad7e4d9010908cea9b0780a1df4c69d2c42afe5782c7cc89ef353a28&)<br> 
action
![](https://cdn.discordapp.com/attachments/1334407474488279110/1357332057205772329/image.png?ex=67f07a3c&is=67ef28bc&hm=1633656036b33c17833c2bea8a1511a51c17a9ad63b0567ed0339ae827609682&=)
comedy
![](https://cdn.discordapp.com/attachments/1334407474488279110/1357332156724019361/image.png?ex=67f07a54&is=67ef28d4&hm=818ddee0e08867c27a9b9b00bf34c6e496b3376eab7f3dacf4888c009bc41243&=)
drama
![](https://cdn.discordapp.com/attachments/1334407474488279110/1357332247929421975/image.png?ex=67f07a69&is=67ef28e9&hm=bc688707f33ee91742f007dce2383dbce67fde5f9a167292954f76bf334409cc&=)
horror
![](https://cdn.discordapp.com/attachments/1334407474488279110/1357332577828208824/image.png?ex=67f07ab8&is=67ef2938&hm=063828bd12b47a3e33d8ad06d2d66dc33d4fe38041dda19eb9c32ba2064e388d&=)
moviedetail.ejs
![](https://cdn.discordapp.com/attachments/1334407474488279110/1357332773979033651/image.png?ex=67f07ae7&is=67ef2967&hm=ce5621329850007cf23f211fa1ee670c3d2e7bcf0dccd0c2e3df4aefaafbb1d7&=)
bookmarks.ejs
![](https://cdn.discordapp.com/attachments/1334407474488279110/1357332530562469948/image.png?ex=67f07aad&is=67ef292d&hm=3e278f9329e7314aa0df5468ee280cbb095c58d9f999581ef8073593e95519b4&=)
  
**test case code**
Test Case 1: ทดสอบการอ่านข้อมูลจากไฟล์ users.json
![image.png](/.attachments/image-f99b802b-2028-4f06-9dba-a75d8685151e.png)
Test Case 2: ทดสอบการเพิ่มผู้ใช้ใหม่ในไฟล์ users.json
![image.png](/.attachments/image-f2338300-ab50-40d2-ad7e-6696c5d633e4.png)
Test Case 3: ทดสอบการตรวจสอบว่า username ซ้ำใน users.json
![image.png](/.attachments/image-f2c080a5-4a8c-4449-846a-a5eca2a1f1c0.png)
Test Case 4: การเพิ่มผู้ใช้ใหม่ (addUser)
![image.png](/.attachments/image-55b8f0c5-5fe5-4273-8dd9-7721c655aa13.png)
Test Case 5: ฟังก์ชันการอัปเดตข้อมูลผู้ใช้ (updateUser)
![image.png](/.attachments/image-c3b5c9b5-b149-446b-b765-c8b94a2d02a4.png)
Test Case 6: ฟังก์ชันการลบผู้ใช้ (deleteUser)
![image.png](/.attachments/image-3334adf5-74ff-4a2a-ae7c-fe08482851d5.png)
Test Case 7: ทดสอบการตรวจสอบ username ซ้ำ (checkUsernameExist)
![image.png](/.attachments/image-de5fbd83-9930-4eb4-8bcb-471e45e7c0a3.png)
Test Case 8: ตรวจสอบข้อมูล users.json
![image.png](/.attachments/image-8ad3127c-6ed6-462d-b9dc-bbcfe1c78fe6.png)
Test Case 9: การเพิ่มผู้ใช้พร้อมการตรวจสอบรหัสผ่านที่แฮช (addUserWithCheckPassword)
![image.png](/.attachments/image-199f7403-9c33-437c-8c2a-0906caa455ff.png)
Test Case 10: ตรวจสอบข้อมูลผู้ใช้ที่ไม่พบ (checkNonExistentUser)
![image.png](/.attachments/image-09692455-b673-455c-ace1-f47af8edbe7c.png)
Test Case 11: ฟังก์ชันการเพิ่มภาพยนตร์ (addMovie)
![image.png](/.attachments/image-4cd198a5-249d-4832-bdeb-c295ba2217bf.png)
Test Case 12:ตรวจสอบข้อมูล movies.json
![image.png](/.attachments/image-77bfbc8a-5fd2-4b4d-8dfa-402b3f29b5ba.png)
Test Case 13: ตรวจสอบข้อมูลใน movies.json ที่ไม่มีชื่อภาพยนตร์
![image.png](/.attachments/image-2acb50f9-fc8f-43d3-b3b4-5fcc25dc68be.png)

**สรุป Retrospective ที่ 3 มีการพูดคุยดังนี้**

ลิงค์คลิปการประชุม : https://youtu.be/VciA6gndCV4 

<br>

**ปัญหาที่เกิดขึ้น**

*   **ปัญหาด้านการบริหารการทำงานอย่างไม่เป็นระบบ** เวลาที่บางคน pull หรือ push งานขึ้น main มีการชนกันเกิดขึ้น ทำให้ต้องแก้ config บ่อยครั้ง เนื่องจากการลืมที่จะย้ายจาก main ไปแก้งานใน branch ตัวเอง แต่หลัง ๆ ปัญหานี้ก็หมดไป
*   **ปัญหาขาดประสบการณ์การใช้คำสั่ง Git** เนื่องจากไม่เข้าใจการทำงานของคำสั่งต่างๆ เช่น commit, branch, merge, pull, และ push ซึ่งแต่ละคำสั่งมีการใช้งานที่แตกต่างกันและต้องเข้าใจลำดับการทำงานให้ดีเพื่อป้องกันข้อผิดพลาด การขาดประสบการณ์ในการใช้งานคำสั่งเหล่านี้อาจทำให้เกิดความสับสนได้ โดยเฉพาะในการทำงานร่วมกับทีม แต่เมื่อได้เริ่มใช้งานบ่อยๆ ก็จะเริ่มเข้าใจวิธีการทำงานของ Git มากขึ้น และพบว่า Git ไม่เพียงแต่ช่วยให้การทำงานเป็นระเบียบเท่านั้น แต่ยังทำให้การทำงานร่วมกับทีมสะดวกและมีประสิทธิภาพมากยิ่งขึ้น
*   **ปัญหาการทำงานล่าช้า** เวลา push code กลัวว่าจะเกิด config ทำให้ไม่ push ขึ้นไปรอถึงวันที่จะประชุมก่อนแล้วค่อย push ส่งผลให้บาง page ที่ทำยังมีความไม่ครบถ้วนและเกิดความล่าช้า แต่พอเราแก้ปัญหาการกังวลเรื่องนี้แล้ว ด้วยการบอกกันตลอดว่าจะพุชอะไรตอนไหน ทําให้การ push code ในเฟสนี้ทีมช่วยกันตรวจสอบและให้feedbackกันได้เร็วขึ้น

<br>
<br>

**สิ่งที่ทำได้ดีใน phase นี้**
*   **การแบ่งงานกันภายในทีม** เนื่องจากทุกคนมีความชัดเจนในหน้าที่ และรับผิดชอบงานที่ตัวเองได้รับมอบหมาย ทำให้การทำงานภายในทีมดำเนินไปอย่างราบรื่นและไม่ซับซ้อน ทุกสมาชิกสามารถโฟกัสที่งานของตัวเองได้อย่างเต็มที่ โดยไม่ต้องกังวลเกี่ยวกับการทำงานของคนอื่น
*   **ลดความกดดัน** พวกเราจัดสรรเวลาได้ดีทำให้ไม่รู้สึกกดดันกับงานมาก และ phase นี้ทำให้เห็นภาพรวมของโปรเจคมากขึ้น
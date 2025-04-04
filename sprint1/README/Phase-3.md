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


**Data structure**

### 1. การทำงานของ Data Structure สำหรับ `movie.json`

ในไฟล์ **movie.json**, ข้อมูลภาพยนตร์ทั้งหมดถูกเก็บใน **Array of Objects** ซึ่งทำให้สามารถเก็บข้อมูลหลายรายการ (ภาพยนตร์หลายเรื่อง) ได้ในลำดับที่จัดเก็บไว้ นอกจากนี้ยังสามารถเข้าถึงข้อมูลของแต่ละภาพยนตร์ได้โดยการอ้างอิงถึง **index** ของ **Array** หรือ **key** ภายใน **Object** ของภาพยนตร์

#### อธิบาย:

*   **Array**: ข้อมูลทั้งหมดของภาพยนตร์จะถูกจัดเก็บใน **Array** เช่น [] ซึ่งสามารถเก็บ **Objects** หลายๆ อันได้ เช่น รายชื่อภาพยนตร์ทั้งหมด
    
*   **Object**: ในแต่ละ **Object** จะเก็บข้อมูลของภาพยนตร์แต่ละเรื่อง เช่น ชื่อเรื่อง, หมวดหมู่, วันที่เผยแพร่, ฯลฯ
    
*   **Key-Value Pairs**: ภายใน **Object** ของแต่ละภาพยนตร์จะมี **key-value pairs** เช่น "title": "Final Destination: Bloodlines" ที่ทำให้ข้อมูลที่เก็บใน **Object** นั้นเข้าใจง่ายและเข้าถึงได้สะดวก
    
*   **Array of Objects**: ในบาง **Object** อาจมี **Array** ภายใน เช่น comments, ซึ่งเก็บความคิดเห็นจากผู้ใช้ ทำให้สามารถจัดเก็บข้อมูลที่เกี่ยวข้องหลายรายการได้อย่างมีระเบียบ

<H3  class="">ตัวอย่างข้อมูลใน movie.json:</H3>
<PRE  class="overflow-visible!"><DIV  class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary"><DIV  class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none rounded-t-[5px]"></DIV><DIV  class="sticky top-9"><DIV  class="absolute right-0 bottom-0 flex h-9 items-center pe-2"><DIV  class="bg-token-sidebar-surface-primary text-token-text-secondary dark:bg-token-main-surface-secondary flex items-center rounded-sm px-2 font-sans text-xs"><SPAN  class=""></SPAN></DIV></DIV></DIV><DIV  class="overflow-y-auto p-4"  dir="ltr"><CODE  class="whitespace-pre! language-json"><SPAN><SPAN><SPAN  class="hljs-punctuation">[</SPAN></SPAN><SPAN>
  </SPAN><SPAN><SPAN  class="hljs-punctuation">{</SPAN></SPAN><SPAN>
    </SPAN><SPAN><SPAN  class="hljs-attr">"id"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-string">"1"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">,</SPAN></SPAN><SPAN>
    </SPAN><SPAN><SPAN  class="hljs-attr">"title"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-string">"Final Destination: Bloodlines"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">,</SPAN></SPAN><SPAN>
    </SPAN><SPAN><SPAN  class="hljs-attr">"poster"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-string">"https://upload.wikimedia.org/wikipedia/en/a/ab/Final_Destination_Bloodlines_%282025%29_poster.jpg"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">,</SPAN></SPAN><SPAN>
    </SPAN><SPAN><SPAN  class="hljs-attr">"youtubeId"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-string">"UWMzKXsY9A4"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">,</SPAN></SPAN><SPAN>
    </SPAN><SPAN><SPAN  class="hljs-attr">"genre"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-string">"Action, Horror"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">,</SPAN></SPAN><SPAN>
    </SPAN><SPAN><SPAN  class="hljs-attr">"releaseDate"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-string">"2025"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">,</SPAN></SPAN><SPAN>
    </SPAN><SPAN><SPAN  class="hljs-attr">"duration"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-number">120</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">,</SPAN></SPAN><SPAN>
    </SPAN><SPAN><SPAN  class="hljs-attr">"description"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-string">"A new chapter in the Final Destination franchise where the deadly fate lurks at every corner."</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">,</SPAN></SPAN><SPAN>
    </SPAN><SPAN><SPAN  class="hljs-attr">"averageRating"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-number">4.8</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">,</SPAN></SPAN><SPAN>
    </SPAN><SPAN><SPAN  class="hljs-attr">"totalVotes"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-number">25</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">,</SPAN></SPAN><SPAN>
    </SPAN><SPAN><SPAN  class="hljs-attr">"comments"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-punctuation">[</SPAN></SPAN><SPAN>
      </SPAN><SPAN><SPAN  class="hljs-punctuation">{</SPAN></SPAN><SPAN>
        </SPAN><SPAN><SPAN  class="hljs-attr">"user"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-string">"User1"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">,</SPAN></SPAN><SPAN>
        </SPAN><SPAN><SPAN  class="hljs-attr">"text"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-string">"This movie was amazing! The plot was intense and full of suspense."</SPAN></SPAN><SPAN>
      </SPAN><SPAN><SPAN  class="hljs-punctuation">}</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">,</SPAN></SPAN><SPAN>
      </SPAN><SPAN><SPAN  class="hljs-punctuation">{</SPAN></SPAN><SPAN>
        </SPAN><SPAN><SPAN  class="hljs-attr">"user"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-string">"User2"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">,</SPAN></SPAN><SPAN>
        </SPAN><SPAN><SPAN  class="hljs-attr">"text"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-string">"Good thriller, but the ending was a bit predictable."</SPAN></SPAN><SPAN>
      </SPAN><SPAN><SPAN  class="hljs-punctuation">}</SPAN></SPAN><SPAN>
    </SPAN><SPAN><SPAN  class="hljs-punctuation">]</SPAN></SPAN><SPAN>
  </SPAN><SPAN><SPAN  class="hljs-punctuation">}</SPAN></SPAN><SPAN>
</SPAN><SPAN><SPAN  class="hljs-punctuation">]</SPAN></SPAN><SPAN>
</SPAN></SPAN></CODE></DIV></DIV></PRE>
<H4  class=""></H4>

<br>

### 2. **การทำงานของ Data Structure สำหรับ user.json**

ในไฟล์ **user.json**, ข้อมูลเกี่ยวกับผู้ใช้จะถูกเก็บในรูปแบบ **Array of Objects** เช่นเดียวกับ **movie.json** แต่ในที่นี้จะเก็บข้อมูลที่เกี่ยวข้องกับ **ผู้ใช้** เช่น username, email, และ password (ที่แฮชแล้ว)

#### อธิบาย:

*   **Array of Objects**: ข้อมูลทั้งหมดเกี่ยวกับผู้ใช้จะถูกเก็บใน **Array** ซึ่งแต่ละ **Object** จะเป็นข้อมูลของผู้ใช้หนึ่งคน
    
*   **Object**: ในแต่ละ **Object** จะมีข้อมูลเกี่ยวกับผู้ใช้ เช่น username, email, password
    
*   **Key-Value Pair**: ใน **Object** ของผู้ใช้แต่ละคน ข้อมูลจะถูกจัดเก็บในรูปแบบ **key-value pairs** เช่น "username": "inao", "email": "newemail@example.com"


<H3  class="">ตัวอย่างข้อมูลใน user.json:</H3>
<PRE  class="overflow-visible!"><DIV  class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary"><DIV  class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none rounded-t-[5px]"></DIV><DIV  class="sticky top-9"><DIV  class="absolute right-0 bottom-0 flex h-9 items-center pe-2"><DIV  class="bg-token-sidebar-surface-primary text-token-text-secondary dark:bg-token-main-surface-secondary flex items-center rounded-sm px-2 font-sans text-xs"><SPAN  class=""></SPAN></DIV></DIV></DIV><DIV  class="overflow-y-auto p-4"  dir="ltr"><CODE  class="whitespace-pre! language-json"><SPAN><SPAN><SPAN  class="hljs-punctuation">[</SPAN></SPAN><SPAN>
  </SPAN><SPAN><SPAN  class="hljs-punctuation">{</SPAN></SPAN><SPAN>
    </SPAN><SPAN><SPAN  class="hljs-attr">"username"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-string">"inao"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">,</SPAN></SPAN><SPAN>
    </SPAN><SPAN><SPAN  class="hljs-attr">"email"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-string">"newemail@example.com"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">,</SPAN></SPAN><SPAN>
    </SPAN><SPAN><SPAN  class="hljs-attr">"password"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-string">"$2b$10$PoUSAOLL.L.Tcqk1/aO1oeSn7X6KDYX6MLi6HzvLXN8rgUSb2EIEm"</SPAN></SPAN><SPAN>
  </SPAN><SPAN><SPAN  class="hljs-punctuation">}</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">,</SPAN></SPAN><SPAN>
  </SPAN><SPAN><SPAN  class="hljs-punctuation">{</SPAN></SPAN><SPAN>
    </SPAN><SPAN><SPAN  class="hljs-attr">"username"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-string">"angpao"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">,</SPAN></SPAN><SPAN>
    </SPAN><SPAN><SPAN  class="hljs-attr">"email"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-string">"angpao@gmail.com"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">,</SPAN></SPAN><SPAN>
    </SPAN><SPAN><SPAN  class="hljs-attr">"password"</SPAN></SPAN><SPAN><SPAN  class="hljs-punctuation">:</SPAN></SPAN><SPAN> </SPAN><SPAN><SPAN  class="hljs-string">"$2b$10$c8gqf/l89xxRVpSGdBN5Wuk.q35gzzZwkWLvhZ4HhJkwVTy9qwan6"</SPAN></SPAN><SPAN>
  </SPAN><SPAN><SPAN  class="hljs-punctuation">}</SPAN></SPAN><SPAN>
</SPAN><SPAN><SPAN  class="hljs-punctuation">]</SPAN></SPAN></SPAN></CODE></DIV></DIV></PRE>


<br>

**มีการเรียก API ดังนี้**
    
**1. การจัดการผู้ใช้ (User Management)**

ในโปรเจกต์ของคุณมีการสร้างเส้นทางที่เกี่ยวข้องกับการลงทะเบียน (register) และการเข้าสู่ระบบ (login) ของผู้ใช้, ซึ่งมีการ อ่าน/เขียนข้อมูลจากไฟล์ JSON และทำการตรวจสอบข้อมูลจากไฟล์ users.json เพื่อจัดการกับข้อมูลผู้ใช้:

####**การลงทะเบียน (Register)**
*   เมื่อผู้ใช้กรอกข้อมูลในฟอร์มการลงทะเบียนและส่งข้อมูลผ่าน POST request ไปยังเส้นทาง /register, ข้อมูลผู้ใช้ที่ได้รับจะถูกแฮช (โดยใช้ bcrypt) และเก็บไว้ใน users.json ที่มีการจัดเก็บข้อมูลผู้ใช้ทั้งหมด
*   การตรวจสอบว่า username หรือ email มีอยู่ในระบบแล้วหรือไม่จะเกิดขึ้นก่อนที่จะทำการบันทึกข้อมูลลงไฟล์ JSON
*   หากข้อมูลที่ส่งมาไม่ซ้ำซ้อนกับข้อมูลที่มีอยู่ในระบบ ระบบจะทำการ hash password และบันทึกข้อมูลผู้ใช้ใหม่ลงในไฟล์ users.json
<br>


#### **การเข้าสู่ระบบ (Login)**

*   เมื่อผู้ใช้กรอกข้อมูลในฟอร์มการเข้าสู่ระบบและส่งข้อมูลผ่าน POST request ไปยังเส้นทาง /login, ระบบจะตรวจสอบข้อมูลที่กรอกมาโดยการ เทียบ username และ password กับข้อมูลในไฟล์ users.json
    
*   ระบบจะใช้ bcrypt ในการตรวจสอบว่า password ที่ผู้ใช้กรอกมา ตรงกับรหัสผ่านที่เก็บไว้ หรือไม่
    
*   หากข้อมูลถูกต้อง, ระบบจะทำการสร้าง session สำหรับผู้ใช้และเก็บข้อมูลใน req.session เพื่อติดตามสถานะการล็อกอิน

<br>

**2. การจัดการ Session และการเข้าถึงข้อมูลสำหรับผู้ใช้ที่ล็อกอินแล้ว**

หลังจากที่ผู้ใช้ล็อกอินสำเร็จ, ระบบจะใช้ session เพื่อเก็บข้อมูลที่เกี่ยวกับผู้ใช้ (เช่น username และ email) เพื่อไม่ให้ผู้ใช้ต้องล็อกอินใหม่ทุกครั้งที่เข้าถึงหน้าเว็บต่างๆ

**การใช้ session เพื่อเก็บข้อมูลผู้ใช้:**
*   ข้อมูลผู้ใช้จะถูกเก็บใน req.session.user หลังจากผู้ใช้ล็อกอินสำเร็จ
*   เมื่อผู้ใช้ไปที่หน้า home, ระบบจะตรวจสอบว่า req.session.user มีข้อมูลหรือไม่ หากไม่มีข้อมูล, ระบบจะให้ผู้ใช้ไปที่หน้า login (เพื่อให้ผู้ใช้ล็อกอินใหม่)
*   ถ้ามีข้อมูลใน session, ระบบจะส่งข้อมูลของภาพยนตร์จาก movies.json ไปยังหน้า home เพื่อแสดงรายการภาพยนตร์
  

**3. การจัดการข้อมูลภาพยนตร์และการบุ๊คมาร์ค**
ในระบบของคุณ, มีการเก็บ bookmarks (รายการหนังที่ผู้ใช้ชอบ) ที่เกี่ยวข้องกับ session ของผู้ใช้ ข้อมูล bookmarks จะถูกเก็บใน session และสามารถเพิ่มหรือลบได้จาก POST request ผ่านเส้นทาง /bookmarks/add และ /bookmarks/remove

**การเพิ่มภาพยนตร์ใน bookmarks:**

*   เมื่อผู้ใช้ส่งข้อมูลผ่าน POST request ที่ /bookmarks/add, ระบบจะตรวจสอบว่าผู้ใช้ล็อกอินหรือไม่ ถ้ายังไม่ล็อกอิน, ระบบจะตอบกลับด้วยสถานะ 401 Unauthorized
*   หากผู้ใช้ล็อกอิน, ระบบจะเพิ่มข้อมูลภาพยนตร์ที่ผู้ใช้เลือก (เช่น title และ poster) เข้าไปใน bookmarks ของ session

**การลบภาพยนตร์จาก bookmarks:**

*   เมื่อผู้ใช้ส่งข้อมูลผ่าน POST request ที่ /bookmarks/remove, ระบบจะทำการลบภาพยนตร์ที่มีชื่อ (title) ตรงกับข้อมูลที่ส่งมาจาก bookmarks ของ session

<br>

**มีการคำนวณที่สำคัญ 2 ประเภทในระบบนี้**
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

**test case code**

Test Case 1: ทดสอบการอ่านข้อมูลจากไฟล์ users.json
![image.png](/.attachments/image-f99b802b-2028-4f06-9dba-a75d8685151e.png)

<br>

Test Case 2: ทดสอบการเพิ่มผู้ใช้ใหม่ในไฟล์ users.json
![image.png](/.attachments/image-f2338300-ab50-40d2-ad7e-6696c5d633e4.png)

<br>

Test Case 3: ทดสอบการตรวจสอบว่า username ซ้ำใน users.json
![image.png](/.attachments/image-f2c080a5-4a8c-4449-846a-a5eca2a1f1c0.png)

<br>

Test Case 4: การเพิ่มผู้ใช้ใหม่ (addUser)
![image.png](/.attachments/image-55b8f0c5-5fe5-4273-8dd9-7721c655aa13.png)

<br>

Test Case 5: ฟังก์ชันการอัปเดตข้อมูลผู้ใช้ (updateUser)
![image.png](/.attachments/image-c3b5c9b5-b149-446b-b765-c8b94a2d02a4.png)

<br>

Test Case 6: ฟังก์ชันการลบผู้ใช้ (deleteUser)
![image.png](/.attachments/image-3334adf5-74ff-4a2a-ae7c-fe08482851d5.png)

<br>

Test Case 7: ทดสอบการตรวจสอบ username ซ้ำ (checkUsernameExist)
![image.png](/.attachments/image-de5fbd83-9930-4eb4-8bcb-471e45e7c0a3.png)

<br>

Test Case 8: ตรวจสอบข้อมูล users.json
![image.png](/.attachments/image-8ad3127c-6ed6-462d-b9dc-bbcfe1c78fe6.png)

<br>

Test Case 9: การเพิ่มผู้ใช้พร้อมการตรวจสอบรหัสผ่านที่แฮช (addUserWithCheckPassword)
![image.png](/.attachments/image-199f7403-9c33-437c-8c2a-0906caa455ff.png)

<br>

Test Case 10: ตรวจสอบข้อมูลผู้ใช้ที่ไม่พบ (checkNonExistentUser)
![image.png](/.attachments/image-09692455-b673-455c-ace1-f47af8edbe7c.png)

<br>

Test Case 11: ฟังก์ชันการเพิ่มภาพยนตร์ (addMovie)
![image.png](/.attachments/image-4cd198a5-249d-4832-bdeb-c295ba2217bf.png)

<br>

Test Case 12:ตรวจสอบข้อมูล movies.json
![image.png](/.attachments/image-77bfbc8a-5fd2-4b4d-8dfa-402b3f29b5ba.png)

<br>

Test Case 13: ตรวจสอบข้อมูลใน movies.json ที่ไม่มีชื่อภาพยนตร์
![image.png](/.attachments/image-2acb50f9-fc8f-43d3-b3b4-5fcc25dc68be.png)

<br>

**Test coverage report**

 ![Screenshot 2568-04-03 at 20.51.58.png](/.attachments/Screenshot%202568-04-03%20at%2020.51.58-8fabe5c1-d48d-4cc5-887c-e4167209897d.png)

<br>

![Screenshot 2568-04-03 at 21.23.05.png](/.attachments/Screenshot%202568-04-03%20at%2021.23.05-a553bd5a-70ea-4f4c-9f16-adabed394b8a.png)

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
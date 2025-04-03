const fs = require('fs');
const path = './users.json';
const bcrypt = require('bcryptjs');


//Test Case 1: ทดสอบการอ่านข้อมูลจากไฟล์ users.json
test('should read users data from users.json', () => {
  const data = fs.readFileSync(path, 'utf-8');
  const users = JSON.parse(data);
  expect(Array.isArray(users)).toBe(true);
  expect(users.length).toBeGreaterThan(0);  // คาดว่ามีข้อมูลในไฟล์
});

//Test Case 2: ทดสอบการเพิ่มผู้ใช้ใหม่ในไฟล์ users.json
test('should add a new user to users.json', () => {
  const newUser = {
    username: 'newuser',
    email: 'newuser@example.com',
    password: 'password123'
  };

  let data = fs.readFileSync(path, 'utf-8');
  let users = JSON.parse(data);
  users.push(newUser);

  fs.writeFileSync(path, JSON.stringify(users, null, 2));  // อัปเดตข้อมูลลงในไฟล์

  data = fs.readFileSync(path, 'utf-8');
  users = JSON.parse(data);
  expect(users.find(user => user.username === 'newuser')).not.toBeUndefined();
});


//Test Case 3: ทดสอบการตรวจสอบว่า username ซ้ำใน users.json
test('should check if username already exists in users.json', () => {
  const username = 'inao';

  let data = fs.readFileSync(path, 'utf-8');
  let users = JSON.parse(data);

  const userExists = users.some(user => user.username === username);
  expect(userExists).toBe(true);  // คาดว่า username นี้มีอยู่แล้ว
});

//Test Case 4: การเพิ่มผู้ใช้ใหม่ (addUser)
// ฟังก์ชันการเพิ่มผู้ใช้
function addUser(username, email, password) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { username, email, password: hashedPassword };

  let data = fs.readFileSync(path, 'utf-8');
  let users = JSON.parse(data);
  users.push(newUser);

  fs.writeFileSync(path, JSON.stringify(users, null, 2));  // บันทึกข้อมูลลงในไฟล์
}

test('should add a new user with hashed password', () => {
  const username = 'testuser';
  const email = 'testuser@example.com';
  const password = 'testpassword';

  // ก่อนทำการเพิ่มผู้ใช้
  let data = fs.readFileSync(path, 'utf-8');
  let users = JSON.parse(data);
  const initialLength = users.length;

  // เพิ่มผู้ใช้ใหม่
  addUser(username, email, password);

  // ตรวจสอบการเพิ่มผู้ใช้ใหม่
  data = fs.readFileSync(path, 'utf-8');
  users = JSON.parse(data);
  expect(users.length).toBe(initialLength + 1);  // ขนาดของผู้ใช้ต้องเพิ่มขึ้น 1
  const newUser = users.find(user => user.username === username);
  expect(newUser).not.toBeUndefined();
  expect(bcrypt.compareSync(password, newUser.password)).toBe(true);  // ตรวจสอบว่า password ถูกแฮช
});



//Test Case 5: ฟังก์ชันการอัปเดตข้อมูลผู้ใช้ (updateUser)
// ฟังก์ชันการอัปเดตข้อมูลผู้ใช้
function updateUser(username, newEmail, newPassword) {
  let data = fs.readFileSync(path, 'utf-8');
  let users = JSON.parse(data);

  const userIndex = users.findIndex(user => user.username === username);
  if (userIndex === -1) return null;  // ถ้าไม่พบผู้ใช้

  // อัปเดตข้อมูลผู้ใช้
  users[userIndex].email = newEmail;
  users[userIndex].password = bcrypt.hashSync(newPassword, 10);

  fs.writeFileSync(path, JSON.stringify(users, null, 2));  // บันทึกข้อมูลที่อัปเดต

  return users[userIndex];  // คืนค่าผู้ใช้ที่อัปเดตแล้ว
}

test('should update user email and password', () => {
  const username = 'inao';
  const newEmail = 'newemail@example.com';
  const newPassword = 'newpassword';

  const updatedUser = updateUser(username, newEmail, newPassword);

  expect(updatedUser).not.toBeNull();
  expect(updatedUser.email).toBe(newEmail);
  expect(bcrypt.compareSync(newPassword, updatedUser.password)).toBe(true);  // ตรวจสอบว่า password ถูกแฮช
});


//Test Case 6: ฟังก์ชันการลบผู้ใช้ (deleteUser)
// ฟังก์ชันการลบผู้ใช้
function deleteUser(username) {
  let data = fs.readFileSync(path, 'utf-8');
  let users = JSON.parse(data);

  const userIndex = users.findIndex(user => user.username === username);
  if (userIndex === -1) return false;  // ถ้าไม่พบผู้ใช้

  users.splice(userIndex, 1);  // ลบผู้ใช้

  fs.writeFileSync(path, JSON.stringify(users, null, 2));  // บันทึกการเปลี่ยนแปลง

  return true;  // คืนค่า true เมื่อลบสำเร็จ
}

test('should delete user by username', () => {
  const username = 'testuser';

  const deleteResult = deleteUser(username);

  // ตรวจสอบว่าไฟล์ `users.json` ถูกอัปเดตและไม่มีผู้ใช้ "testuser"
  let data = fs.readFileSync(path, 'utf-8');
  let users = JSON.parse(data);
  expect(deleteResult).toBe(true);
  expect(users.find(user => user.username === username)).toBeUndefined();
});



//Test Case 7: ทดสอบการตรวจสอบ username ซ้ำ (checkUsernameExist)
test('should check if username already exists in users.json', () => {
  const username = 'inao';

  let data = fs.readFileSync(path, 'utf-8');
  let users = JSON.parse(data);

  const userExists = users.some(user => user.username === username);
  expect(userExists).toBe(true);  // คาดว่า username นี้มีอยู่แล้ว
});


//Test Case 8: ตรวจสอบข้อมูล users.json
test('should check if users data is valid in users.json', () => {
  let data = fs.readFileSync('./users.json', 'utf-8');
  let users = JSON.parse(data);

  expect(Array.isArray(users)).toBe(true);
  expect(users.length).toBeGreaterThan(0);
});


//Test Case 9: การเพิ่มผู้ใช้พร้อมการตรวจสอบรหัสผ่านที่แฮช (addUserWithCheckPassword)
test('should add a new user and check if password is hashed', () => {
  const username = 'testuser2';
  const email = 'testuser2@example.com';
  const password = 'testpassword2';

  let data = fs.readFileSync(path, 'utf-8');
  let users = JSON.parse(data);
  const initialLength = users.length;

  addUser(username, email, password);

  data = fs.readFileSync(path, 'utf-8');
  users = JSON.parse(data);
  expect(users.length).toBe(initialLength + 1);  // ขนาดของผู้ใช้ต้องเพิ่มขึ้น 1
  const newUser = users.find(user => user.username === username);
  expect(newUser).not.toBeUndefined();
  expect(bcrypt.compareSync(password, newUser.password)).toBe(true);  // ตรวจสอบว่า password ถูกแฮช
});


//Test Case 10: ตรวจสอบข้อมูลผู้ใช้ที่ไม่พบ (checkNonExistentUser)
test('should return false when checking for a non-existent user', () => {
  const username = 'nonexistentuser';

  let data = fs.readFileSync(path, 'utf-8');
  let users = JSON.parse(data);

  const userExists = users.some(user => user.username === username);
  expect(userExists).toBe(false);  // คาดว่าผู้ใช้ที่ไม่พบจะคืนค่าเป็น false
});

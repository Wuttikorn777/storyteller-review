const fs = require('fs');
const path = './users.json';
const bcrypt = require('bcryptjs');

// เพิ่มผู้ใช้ใหม่
function addUser(username, email, password) {
  if (!username || !email || !password) {
    console.log('User information is incomplete!');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log('Invalid email format!');
    return;
  }

  let users;
  try {
    const data = fs.readFileSync(path, 'utf-8');
    users = JSON.parse(data);
  } catch (err) {
    console.error("Error reading the file or parsing JSON:", err);
    return;
  }

  const userExists = users.some(user => user.username === username);
  if (userExists) {
    console.log('Username already exists!');
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { username, email, password: hashedPassword };
  users.push(newUser);

  fs.writeFileSync(path, JSON.stringify(users, null, 2));
}

module.exports = { addUser };

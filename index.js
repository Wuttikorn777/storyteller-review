const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const path = require('path');
const session = require('express-session');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

// Initialize Express app
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // รับข้อมูล JSON

// Session middleware
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true,
}));

// Route สำหรับแสดงฟอร์มการลงทะเบียน (GET request)
app.get('/register', (req, res) => {
  res.render('register');
});

// Route สำหรับรับข้อมูลจากฟอร์มและบันทึกข้อมูล (POST request)
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send('Error hashing password');

    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) return res.status(500).send('Error reading users data');
      let users = data ? JSON.parse(data) : [];
      const userExists = users.find(user => user.username === username || user.email === email);
      if (userExists) return res.status(400).send('Username หรือ Email นี้ถูกใช้งานแล้ว');

      const newUser = {
        username,
        email,
        password: hashedPassword,
      };
      users.push(newUser);

      fs.writeFile('users.json', JSON.stringify(users, null, 2), err => {
        if (err) return res.status(500).send('Error saving user data');
        res.redirect('/login');
      });
    });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('โหลดข้อมูลผิดพลาด');
    const users = JSON.parse(data);
    const user = users.find(u => u.username === username);

    if (!user) return res.status(400).send('ไม่พบผู้ใช้');

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).send('ตรวจสอบรหัสผิดพลาด');
      if (!match) return res.status(400).send('รหัสผิด');

      req.session.user = {
        username: user.username,
        email: user.email
      };
      

      console.log('SESSION:', req.session.user);
      res.redirect('/home');
    });
  });
});

// ✅ Route ไปหน้า login
app.get("/", (req, res) => {
  res.render("login");
});

// ✅ Route ไปหน้า Action Movies
app.get("/action", (req, res) => {
  res.render("action");
});

// Route สำหรับหน้า login
app.get('/login', (req, res) => {
  res.render('login');  // แสดงหน้า login.ejs
});

// Route สำหรับการ login (POST request)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // ตรวจสอบ username และ password จากไฟล์ users.json
  fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading user data');
    }

    const users = JSON.parse(data);
    const user = users.find(u => u.username === username);
    if (user) {
      // ตรวจสอบรหัสผ่านที่เข้ารหัส
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).send('Error comparing password');
        }
        if (isMatch) {
          req.session.username = username; // เก็บข้อมูลใน session
          res.redirect('/home');
        } else {
          res.send('Invalid login credentials');
        }
      });
    } else {
      res.send('Invalid login credentials');
    }
  });
});

// Route สำหรับหน้า home
app.get('/home', (req, res) => {
  res.render('home');  // แสดงหน้า home.ejs
});

app.get('/logout', authController.logout);
app.get('/sort', authController.authenticate, taskController.sortTasksByPriority);
app.post('/add', authController.authenticate, taskController.addTask);
app.post('/delete', authController.authenticate, taskController.deleteMultipleTasks);
app.post('/search', authController.authenticate, taskController.searchTasksByName);

app.get('/genre', (req, res) => {
  res.render('genre');  // ให้แสดงหน้า genre.ejs
});

// ตัวอย่างการ route ไปยัง moviedetails.html
app.get('/moviedetails', (req, res) => {
  res.render('moviedetails');  // แสดง moviedetails.ejs
});

let bookmarks = []; // เก็บหนังที่บุ๊คมาร์คไว้

// 📌 Route หน้า Home
app.get('/', (req, res) => {
    res.render('home');
});

// 📌 Route หน้า Bookmarks
app.get('/bookmarks', (req, res) => {
    res.render('bookmarks', { bookmarks });
});

// 📌 เพิ่มหนังเข้า Bookmarks
app.post('/bookmarks/add', (req, res) => {
    const { title, image } = req.body;
    if (!bookmarks.some(b => b.title === title)) {
        bookmarks.push({ title, image });
    }
    res.redirect('/bookmarks');
});

// 📌 ลบหนังออกจาก Bookmarks
app.post('/bookmarks/remove', (req, res) => {
    const { title } = req.body;
    bookmarks = bookmarks.filter(b => b.title !== title);
    res.redirect('/bookmarks');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

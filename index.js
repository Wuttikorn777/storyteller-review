const express = require('express');
const session = require('express-session');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const path = require('path');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

// Initialize Express app
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


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


app.get('/home', (req, res) => {
  if (!req.session.user) {
      return res.redirect('/login'); // ถ้ายังไม่ได้ login ให้กลับไปหน้า login
  }

  fs.readFile(path.join(__dirname, 'movies.json'), 'utf8', (err, data) => {
      if (err) {
          console.error("Error reading movie data:", err);
          return res.status(500).send('Error reading movie data');
      }

      const movies = JSON.parse(data); // แปลง JSON เป็น array ของหนัง
      res.render('home', { 
          currentUser: req.session.user.username,  // ✅ ส่ง `currentUser`
          movies                                   // ✅ ส่ง `movies`
      });
  });
});

app.get('/bookmarks', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login'); // ถ้ายังไม่ล็อกอิน ให้ไปที่หน้า login
  }

  console.log("SESSION DATA:", req.session.user); // ✅ Debug session

  const movies = req.session.user.bookmarks || []; // เปลี่ยนจาก 'bookmarks' เป็น 'movies'

  res.render('bookmarks', { 
      currentUser: req.session.user.username, 
      movies // ส่งค่าบุ๊คมาร์ค (หรือ movies) ไปที่ EJS
  });
});



app.get('/logout', authController.logout);
app.get('/sort', authController.authenticate, taskController.sortTasksByPriority);
app.post('/add', authController.authenticate, taskController.addTask);
app.post('/delete', authController.authenticate, taskController.deleteMultipleTasks);
app.post('/search', authController.authenticate, taskController.searchTasksByName);

app.get('/genre', (req, res) => {
  res.render('genre');  // ให้แสดงหน้า genre.ejs
});


// เส้นทางที่รับ id ของภาพยนตร์ใน URL
app.get('/moviedetails/:id', (req, res) => {
  const movieId = req.params.id; // รับ ID จาก URL

  fs.readFile(path.join(__dirname, 'movies.json'), 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading movie data:", err);
      return res.status(500).send('Error reading movie data');
    }

    const movies = JSON.parse(data);  // แปลง JSON
    const movie = movies.find(m => m.id === movieId);  // ค้นหาภาพยนตร์ที่ตรงกับ ID

    if (!movie) {
      return res.status(404).send('Movie not found');
    }

    // ส่งข้อมูล 'movie' ไปที่ EJS
    res.render('moviedetails', { movie });
  });
});
// 📌 Route หน้า Bookmarks
app.get('/bookmarks', (req, res) => {
  if (!req.session.user) {
      return res.redirect('/login'); // ถ้ายังไม่ล็อกอิน ให้ไปที่หน้า login
  }

  console.log("SESSION DATA:", req.session.user); // ✅ Debug session

  const bookmarks = req.session.user.bookmarks || []; // ดึงบุ๊คมาร์คของ user

  res.render('bookmarks', { 
      currentUser: req.session.user.username, 
      bookmarks // ส่งค่าบุ๊คมาร์คไปที่ EJS
  });
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
  if (!req.session.user) {
      return res.status(401).send('ต้องเข้าสู่ระบบก่อน');
  }

  const { title, poster } = req.body;
  if (!req.session.user.bookmarks) {
      req.session.user.bookmarks = [];
  }

  // ป้องกันการเพิ่มซ้ำ
  if (!req.session.user.bookmarks.some(b => b.title === title)) {
      req.session.user.bookmarks.push({ title, poster });
  }

  res.json({ success: true });
});

// 📌 ลบหนังออกจาก Bookmarks
app.post('/bookmarks/remove', (req, res) => {
  if (!req.session.user) {
      return res.status(401).send('ต้องเข้าสู่ระบบก่อน');
  }

  const { title } = req.body;
  req.session.user.bookmarks = req.session.user.bookmarks.filter(b => b.title !== title);

  res.json({ success: true });
});



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const session = require('express-session');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const path = require('path');
const http = require('http'); // ใช้สำหรับสร้าง HTTP server
const socketIo = require('socket.io'); // ใช้สำหรับ socket.io
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

// Initialize Express app
const app = express();
const server = http.createServer(app); // สร้าง server ด้วย app ของ Express

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ Route ไปหน้า login
app.get("/", (req, res) => {
  res.render("login");
});

// ✅ Route ไปหน้า Action Movies
app.get("/action", (req, res) => {
  res.render("action");
});

// ✅ Route ไปหน้า Horror Movies
app.get("/horror", (req, res) => {
  res.render("horror");
});

// ✅ Route ไปหน้า Comedy Movies
app.get("/comedy", (req, res) => {
  res.render("comedy");
});

// ✅ Route ไปหน้า drama Movies
app.get("/drama", (req, res) => {
  res.render("drama");
});

app.get('/genre', (req, res) => {
  res.render('genre');  // ให้แสดงหน้า genre.ejs
});
// ✅ Route ไปหน้า login
app.get("/login", (req, res) => {
  res.render("login");
});

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

// Route สำหรับการ login (POST request)
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

// หน้า Home
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

// หน้า Bookmarks
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

// เส้นทางที่รับ id ของภาพยนตร์ใน URL
// Route สำหรับการแสดงรายละเอียดของหนัง
app.get('/moviedetails/:id', (req, res) => {
  const movieId = req.params.id;

  // ดึงข้อมูลหนังจาก movies.json
  fs.readFile(path.join(__dirname, 'movies.json'), 'utf8', (err, movieData) => {
    if (err) {
      console.error("Error reading movie data:", err);
      return res.status(500).send('Error reading movie data');
    }

    const movies = JSON.parse(movieData);
    const movie = movies.find(m => m.id === movieId);

    if (!movie) {
      return res.status(404).send('Movie not found');
    }

    // อ่านความคิดเห็นจาก comments.json
    const commentsFilePath = path.join(__dirname, 'comments.json');
    fs.readFile(commentsFilePath, 'utf8', (err, commentsData) => {
      if (err) {
        console.error("Error reading comments data:", err);
        return res.status(500).send('Error reading comments data');
      }

      const comments = JSON.parse(commentsData)[movieId] || [];

      // ส่งข้อมูลทั้งหมดไปยัง EJS (รวมถึง movie และ comments)
      res.render('moviedetails', {
        movie,
        comments,
        currentUser: req.session.user ? req.session.user.username : 'Guest'
      });
    });
  });
});

// เส้นทางเพื่อดึงข้อมูลความคิดเห็นทั้งหมดสำหรับภาพยนตร์
app.get('/api/comments/:movieId', (req, res) => {
  const movieId = req.params.movieId;

  // อ่านข้อมูลคอมเมนต์จาก comments.json
  fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, commentsData) => {
    if (err) {
      return res.status(500).json({ message: "Error reading comments file." });
    }

    const comments = JSON.parse(commentsData);
    const movieComments = comments[movieId] || [];

    res.json({ comments: movieComments });
  });
});


// เพิ่มความคิดเห็นใหม่ (API)
app.post('/api/comments', (req, res) => {
  const { movieId, username, comment } = req.body;

  // ตรวจสอบว่าผู้ใช้ล็อกอินหรือไม่
  if (!req.session.user) {
    return res.status(401).json({ message: "User not logged in." });
  }

  // ตรวจสอบว่ามีข้อมูลครบหรือไม่
  if (!movieId || !username || !comment) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  // อ่านความคิดเห็นจาก comments.json
  fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, commentsData) => {
    if (err) {
      return res.status(500).json({ message: "Error reading comments file." });
    }

    let comments = JSON.parse(commentsData);
    if (!comments[movieId]) {
      comments[movieId] = [];
    }

    // เพิ่มความคิดเห็นใหม่
    comments[movieId].push({ username, comment });

    // เขียนข้อมูลความคิดเห็นกลับไปที่ไฟล์
    fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ message: "Error writing comments data." });
      }

      // ส่งข้อมูลความคิดเห็นใหม่กลับมา
      res.status(201).json({ message: 'Comment added successfully' });
    });
  });
});




// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

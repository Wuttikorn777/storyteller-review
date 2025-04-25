const express = require('express');
const session = require('express-session');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const path = require('path');
const http = require('http'); // ใช้สำหรับสร้าง HTTP server
const socketIo = require('socket.io'); // ใช้สำหรับ socket.io
const ratingController = require('./controllers/ratingController');
const bookmarkController = require('./controllers/bookmarkController');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');
const commentController = require('./controllers/commentController'); // ✅ นำเข้า commentController

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
  res.redirect("/home");
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

//middleware เช็คการ login
function requireLogin(req, res, next) {
  if (!req.session.user) return res.status(401).json({ message: 'Not logged in' });
  next();
}

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
  const { username, password, bookmarks } = req.body;

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
        email: user.email,
        bookmarks: user.bookmarks || []
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

//การตรวจสอบการเข้าสู่ระบบ
app.get('/bookmarks', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('bookmarks', {
    currentUser: req.session.user.username
  });
});

// GET bookmarks ของ user
app.get('/api/bookmarks', requireLogin, bookmarkController.getBookmarksByUser);

// POST add bookmark  { id, title, poster }
app.post('/api/bookmarks', requireLogin, bookmarkController.addBookmark);

// DELETE /api/bookmarks/:movieId
app.delete('/api/bookmarks/:movieId', requireLogin, bookmarkController.deleteBookmark);

// POST /api/bookmarks/first
app.post('/api/bookmarks/first', requireLogin, bookmarkController.deleteFirstByUser);

// POST /api/bookmarks/last
app.post('/api/bookmarks/last', requireLogin, bookmarkController.deleteLastByUser);


// เส้นทางที่รับ id ของภาพยนตร์ใน URL
// Route แสดงรายละเอียดหนัง
app.get('/moviedetails/:id', (req, res) => {
  const movieId = req.params.id;
  if (!req.session.user) {
    return res.redirect('/login'); // ถ้ายังไม่ได้ login ให้กลับไปหน้า login
  }
  // Load rating data
  const ratingData = JSON.parse(fs.readFileSync(path.join(__dirname, 'ratings.json'), 'utf8'));

  // 1) อ่านไฟล์หนัง
  fs.readFile(path.join(__dirname, 'movies.json'), 'utf8', (err, movieData) => {
    if (err) return res.status(500).send('Error reading movie data');

    const movies = JSON.parse(movieData);
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return res.status(404).send('Movie not found');

    // 2) อ่านไฟล์คอมเมนต์
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, commentsData) => {
      let comments = [];
      if (!err) {
        const all = JSON.parse(commentsData);
        comments = all[movieId] || [];
      }
      // 3) render ครั้งเดียว หลังได้ทุกอย่าง
      res.render('moviedetails', {
        movie,
        comments,
        ratingData,
        currentUser: req.session.user ? req.session.user.username : 'Guest'
      });
    });
  });
});

app.post('/api/rating', ratingController.addRating);

app.get('/api/rating/:movieId', ratingController.getRatingsByMovieId);

// เส้นทางเพื่อดึงข้อมูลความคิดเห็นทั้งหมดสำหรับภาพยนตร์
app.get('/api/comments/:movieId', commentController.getCommentsByMovieId); // ✅ ใช้ commentController

// เพิ่มความคิดเห็นใหม่ (API)
app.post('/api/comments', commentController.addComment); // ✅ ใช้ commentController





// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
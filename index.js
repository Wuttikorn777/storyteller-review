const express = require('express');
const path = require('path');
const session = require('express-session');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');


// Initialize Express app
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));




// Middleware to parse request body
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
  })
);
// ✅ Route ไปหน้า GENRE
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

  // ตรวจสอบ username และ password (คุณสามารถตรวจสอบจากฐานข้อมูลจริงได้ที่นี่)
  if (username === 'admin' && password === '123') {  // ตัวอย่างการตรวจสอบ
    // ถ้าข้อมูลถูกต้อง ให้ redirect ไปที่หน้า home
    res.redirect('/home');
  } else {
    // ถ้าผิดพลาดให้แสดงข้อความผิดพลาด หรือ redirect กลับไปหน้า login
    res.send('Invalid login credentials');
  }
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
app.get('/register', (req, res) => {
  res.render('register'); 
});

// Route รับค่าจากฟอร์ม Register
app.post('/register', (req, res) => {
  const { username, password } = req.body;  // ดึงค่าจากฟอร์ม
  console.log(`New User: ${username} - ${password}`);

  // **ทำการบันทึกลงฐานข้อมูลตรงนี้**
  // ตัวอย่าง: res.send("User registered successfully!");
  
  res.redirect('/login');  // หลังสมัครเสร็จให้ไปหน้า login
});
app.get('/genre', (req, res) => {
  res.render('genre');  // ให้แสดงหน้า genre.ejs
});

// ✅ Route ไปหน้า Action Movies
app.get("/action", (req, res) => {
  res.render("action");
});

// ตัวอย่างการ route ไปยัง moviedetails.html
app.get('/moviedetails', (req, res) => {
  res.render('moviedetails');  // แสดง moviedetails.ejs
});



app.get('/bookmarks', authController.authenticate, taskController.getBookmarks);
app.post('/bookmarks/add', authController.authenticate, taskController.addBookmark);
app.post('/bookmarks/remove', authController.authenticate, taskController.removeBookmark);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
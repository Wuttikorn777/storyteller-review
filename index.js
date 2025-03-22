const express = require('express');
const path = require('path');
const session = require('express-session');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const app = express();

// ข้อมูลตัวอย่างของภาพยนตร์
const movies = [
  {
    id: 1,
    title: 'Shrek',
    description: 'A grumpy ogre sets out on a journey to rescue a princess.',
    director: 'Andrew Adamson',
    year: 2001,
    poster: 'https://static.wikia.nocookie.net/ultimatepopculture/images/3/39/Shrek.jpg/revision/latest?cb=20210311141139'
  },
  {
    id: 2,
    title: 'Joker',
    description: 'A mentally troubled comedian embarks on a downward spiral that leads him to becoming the infamous Joker.',
    director: 'Todd Phillips',
    year: 2019,
    poster: 'https://m.media-amazon.com/images/I/71KPOvu-hOL._AC_SL1351_.jpg'
  }
];

// ตั้งค่า EJS เป็น templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware สำหรับการ parse request body
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
  })
);

// เส้นทางหน้าแรกที่แสดงภาพยนตร์
app.get('/', (req, res) => {
  res.render('home', { movies });
});

// เส้นทางแสดงรายละเอียดของภาพยนตร์
app.get('/movie/:id', (req, res) => {
  const movieId = req.params.id;
  const movie = movies.find(m => m.id == movieId); // ค้นหาภาพยนตร์ตาม id
  res.render('movie', { movie });
});

// เส้นทางการเรนเดอร์หน้าลงทะเบียน (register)
app.get('/register', (req, res) => {
  res.render('register');
});

// Routes สำหรับการจัดการ task
app.get('/view/:name', taskController.viewTask);
app.get('/logout', authController.logout);
app.get('/sort', authController.authenticate, taskController.sortTasksByPriority);
app.get('/login', authController.showLoginPage);
app.post('/login', authController.login);
app.post('/add', authController.authenticate, taskController.addTask);
app.post('/delete', authController.authenticate, taskController.deleteMultipleTasks);
app.post('/search', authController.authenticate, taskController.searchTasksByName);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

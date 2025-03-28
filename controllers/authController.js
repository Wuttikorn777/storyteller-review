
const Encryption = require('../util');

util = new Encryption();
// Hardcoded username and password
const credentials = {
    username: 'admin',
    password: '6002968392b901e9305d87e3', 
    //'123',
  };
  
  // Middleware to check authentication
  exports.authenticate = (req, res, next) => {
    // ตรวจสอบ session หรือ token
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');  // ถ้ายังไม่ได้เข้าสู่ระบบให้ไปหน้า login
};

exports.showLoginPage = (req, res) => {
    res.render('login');  // แสดงหน้า login
};

exports.login = (req, res) => {
    // ประมวลผลการ login และเซสชั่น
    res.redirect('/home');  // หรือหน้าอื่นๆหลังจาก login สำเร็จ
};

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/login');  // หลัง logout ให้กลับไปที่หน้า login
    });
};

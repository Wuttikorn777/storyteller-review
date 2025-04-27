const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTests() {
  // เซ็ตให้ Chrome รันในโหมด headless + ปิด sandbox
  let options = new chrome.Options()
    .headless()               
    .addArguments('--no-sandbox')
    .addArguments('--disable-dev-shm-usage')
    .addArguments('--window-size=1920,1080');

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
    try {
        // 1. ไปที่หน้า login
        await driver.get('http://localhost:3000/login');
        console.log('✅ เข้าเว็บสำเร็จ');

        // 2. กรอก username, password แล้วกด Login
        await driver.findElement(By.name('username')).sendKeys('ningning');
        await driver.findElement(By.name('password')).sendKeys('inao0101', Key.RETURN);
        console.log('✅ Login สำเร็จ');

        // 3. รอให้ไปหน้า home
        await driver.wait(until.urlContains('/home'), 5000);
        console.log('✅ เข้าสู่หน้า home สำเร็จ');

        // 4. ไปที่หน้า moviedetail
        await driver.get('http://localhost:3000/moviedetails/4');
        console.log('✅ เข้าหน้า Movie Detail แล้ว');

        // 5. รอปุ่ม bookmark โหลด
        await driver.wait(until.elementLocated(By.id('bookmark-btn')), 5000);

        // 6. คลิกปุ่ม bookmark
        await driver.findElement(By.id('bookmark-btn')).click();
        console.log('✅ กด Bookmark แล้ว');
    } finally {
        // ปิดเบราว์เซอร์หลังเสร็จ
        await driver.quit();
    }
}

// เรียกฟังก์ชันทดสอบ
runTests();
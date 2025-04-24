const fs = require('fs');
const path = require('path');
const commentsFilePath = path.join(__dirname, './comments.json');

// ฟังก์ชันในการเพิ่มความคิดเห็น
const addComment = (movieId, username, comment) => {
    fs.readFile(commentsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading comments file:', err);
            return;
        }

        let commentsData;

        try {
            commentsData = JSON.parse(data); // พยายามแปลงข้อมูลเป็น JSON
        } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
            commentsData = {}; // ถ้าไม่มีข้อมูลหรือไฟล์ว่าง ให้เริ่มต้นเป็น object เปล่า
        }

        // หากไม่มีข้อมูลเกี่ยวกับ movieId ใน commentsData, ให้เพิ่มเข้าไป
        if (!commentsData[movieId]) {
            commentsData[movieId] = [];
        }

        // เพิ่มความคิดเห็นใหม่
        commentsData[movieId].push({ username, comment });

        // เขียนข้อมูลกลับไปยังไฟล์
        fs.writeFile(commentsFilePath, JSON.stringify(commentsData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to comments file:', err);
                return;
            }
            console.log('Comment added successfully');
        });
    });
};

module.exports = { addComment };

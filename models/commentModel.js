const fs = require('fs');
const path = require('path');

// Path ของไฟล์ comments.json
const commentsFilePath = path.join(__dirname, '../comments.json');

class CommentModel {
    // อ่านความคิดเห็นทั้งหมดจากไฟล์
    static getAllComments(movieId, callback) {
        fs.readFile(commentsFilePath, 'utf8', (err, data) => {
            if (err) return callback(err, null);

            const comments = JSON.parse(data || '{}');
            callback(null, comments[movieId] || []);
        });
    }

    // เพิ่มความคิดเห็นใหม่
    static addComment(movieId, username, comment, callback) {
        fs.readFile(commentsFilePath, 'utf8', (err, data) => {
            if (err) return callback(err);

            let comments = JSON.parse(data || '{}');
            if (!comments[movieId]) {
                comments[movieId] = [];
            }

            comments[movieId].push({ username, comment });

            fs.writeFile(commentsFilePath, JSON.stringify(comments, null, 2), 'utf8', (err) => {
                if (err) return callback(err);
                callback(null);
            });
        });
    }
}

module.exports = CommentModel;
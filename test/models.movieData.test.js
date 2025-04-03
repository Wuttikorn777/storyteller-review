const fs = require('fs');
const path = './movies.json';

//Test Case 11: ฟังก์ชันการเพิ่มภาพยนตร์ (addMovie)

// ฟังก์ชันการเพิ่มภาพยนตร์
function addMovie(name, releaseYear, rating, comments = []) {
    const newMovie = { name, releaseYear, rating, comments };
  
    let data = fs.readFileSync(path, 'utf-8');
    let movies = JSON.parse(data);
    movies.push(newMovie);
  
    fs.writeFileSync(path, JSON.stringify(movies, null, 2));  // บันทึกข้อมูลลงในไฟล์
  }
  
  test('should add a new movie', () => {
    const name = 'Test Movie';
    const releaseYear = 2023;
    const rating = 4.0;
    const comments = ['Exciting!', 'Great storyline'];
  
    // ก่อนทำการเพิ่มภาพยนตร์
    let data = fs.readFileSync(path, 'utf-8');
    let movies = JSON.parse(data);
    const initialLength = movies.length;
  
    // เพิ่มภาพยนตร์ใหม่
    addMovie(name, releaseYear, rating, comments);
  
    // ตรวจสอบการเพิ่มภาพยนตร์ใหม่
    data = fs.readFileSync(path, 'utf-8');
    movies = JSON.parse(data);
    expect(movies.length).toBe(initialLength + 1);  // ขนาดของรายการภาพยนตร์ต้องเพิ่มขึ้น 1
    const newMovie = movies.find(movie => movie.name === name);
    expect(newMovie).not.toBeUndefined();
    expect(newMovie.releaseYear).toBe(releaseYear);
    expect(newMovie.rating).toBe(rating);
    expect(newMovie.comments).toEqual(comments);
  });
  

//Test Case 12:ตรวจสอบข้อมูล movies.json
test('should check if movies data is valid in movies.json', () => {
    let data = fs.readFileSync('./movies.json', 'utf-8');
    let movies = JSON.parse(data);
  
    expect(Array.isArray(movies)).toBe(true);
    expect(movies.length).toBeGreaterThan(0);
  });
  
//Test Case 11: ตรวจสอบข้อมูลใน movies.json ที่ไม่มีชื่อภาพยนตร์
  test('should not find a non-existing movie in movies.json', () => {
    const name = 'Non-existing Movie';
  
    let data = fs.readFileSync(path, 'utf-8');
    let movies = JSON.parse(data);
  
    const movieExists = movies.some(movie => movie.name === name);
    expect(movieExists).toBe(false);  // คาดว่าไม่มีภาพยนตร์นี้
  });
  
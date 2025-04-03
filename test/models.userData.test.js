const fs = require('fs');
const path = './users.json';
const bcrypt = require('bcryptjs');
const { addUser } = require('../models/userData');

beforeEach(() => {
  fs.writeFileSync(path, JSON.stringify([], null, 2));
  console.log = jest.fn();
  console.error = jest.fn();
});

describe('addUser', () => {
  test('should not add user with incomplete data', () => {
    addUser('', 'test@example.com', 'password');
    expect(console.log).toHaveBeenCalledWith('User information is incomplete!');
  });

  test('should not add user with invalid email', () => {
    addUser('user1', 'invalid-email', 'password');
    expect(console.log).toHaveBeenCalledWith('Invalid email format!');
  });

  test('should not add duplicate username', () => {
    addUser('user1', 'user1@example.com', 'pass123');
    addUser('user1', 'another@example.com', 'pass456');
    expect(console.log).toHaveBeenCalledWith('Username already exists!');
  });

  test('should hash password and save user', () => {
    addUser('user2', 'user2@example.com', 'mysecret');
    const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
    expect(data.length).toBe(1);
    expect(data[0].username).toBe('user2');
    expect(data[0].email).toBe('user2@example.com');
    expect(bcrypt.compareSync('mysecret', data[0].password)).toBe(true);
  });

  test('should handle file read error gracefully', () => {
    fs.writeFileSync(path, '{ bad json');
    addUser('user3', 'user3@example.com', 'password');
    expect(console.error).toHaveBeenCalled();
  });
});

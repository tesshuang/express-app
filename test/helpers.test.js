const { getUserByEmail } = require('../helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

test('getUserByEmail1', () => {
  expect(getUserByEmail('user@example.com', testUsers)).toBe('userRandomID');
});

test('getUserByEmail2', () => {
  expect(getUserByEmail('user2@example.com', testUsers)).toBe('user2RandomID');
});
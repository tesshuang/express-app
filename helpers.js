const getUserByEmail = function(email, database) {
  for ( const user in database) {
    if (email === database[user].email) {
      return user;
    }
  }
};

function generateRandomString() {
  return Math.random().toString(36).slice(-6);
}

module.exports = {
  getUserByEmail,
  generateRandomString
}
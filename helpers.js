const getUserByEmail = function(email, database) {
  for ( const user in database) {
    if (email === database[user].email) {
      return user;
    }
  }
};

module.exports = {
  getUserByEmail
}
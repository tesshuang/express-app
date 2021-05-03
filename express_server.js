const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 8080; // default port 8080

app.use(cookieParser());

app.use(express.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

let urlDatabase = {
  "b2xVn2": "https://css-tricks.com",
  "9sm5xK": "http://www.google.com"
};

let users = { 
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
}

function generateRandomString() {
  return Math.random().toString(36).slice(-6);
}

const getUserByEmail = function(email, database) {
  for ( const user in database) {
    if (email === database[user].email) {
      return user;
    }
  }
};

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls", (req, res) => {
  const userId = req.cookies["user_id"];
  const templateVars = { 
    urls: urlDatabase,
    user: users[userId]
   };
  res.render("pages/urls_index", templateVars);
});

app.post("/urls", (req, res) => {
  const newShort = generateRandomString();
  let newURL = {};
  newURL[newShort] = req.body.longURL;
  urlDatabase = { ...urlDatabase, ...newURL };
  res.redirect(`/urls/${newShort}`);
});

app.get("/urls/new", (req, res) => {
  const userId = req.cookies["user_id"];
  const templateVars = { 
    user: users[userId]
   };
  res.render("pages/urls_new", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  const userId = req.cookies["user_id"];
  const templateVars = { 
    shortURL: req.params.shortURL, 
    longURL: urlDatabase[req.params.shortURL],
    user: users[userId]
  };
  res.render("pages/urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

app.post("/urls/:shortURL/delete", (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect(`/urls`);
});

app.post("/urls/:id", (req, res) => {
  urlDatabase[req.params.id] = req.body.longURL;
  res.redirect(`/urls`);
});

app.get("/register", (req, res) => {
  res.render("pages/register");
});

app.post("/register", (req, res) => {
  const newUserKey = generateRandomString();
  if (req.body.email === '' || req.body.password === '') {
    res.sendStatus(400);
  } else {
    const user = {
      [newUserKey]: {
        id: newUserKey,
        email: req.body.email,
        password: req.body.password
      }
    }
    Object.assign(users, user);
    res.cookie('user_id', newUserKey);
    res.redirect(`/urls`);
  }
  
});

app.post("/logout", (req, res) => {
  res.clearCookie('user_id');
  res.redirect(`/urls`);
});

app.get("/login", (req, res) => {
  console.log(users);
  res.render("pages/login");
});

app.post("/login", (req, res) => {
  const usrEmail = req.body.email;
  const usrPwd = req.body.password;
  let matched = false;

  for (const usr in users) {
    if (usrEmail === users[usr].email && usrPwd === users[usr].password) {
      matched = true;
      res.cookie('user_id', users[usr].id);
    } 
  }
  if (matched) {
    res.redirect(`/urls`);
  } else {
    res.sendStatus(400);
  }
  
});

app.get("/hello", (req, res) => {
  const templateVars = { greeting: "Hello World!" };
  res.render("pages/hello_world", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
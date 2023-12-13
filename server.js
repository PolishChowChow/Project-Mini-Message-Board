require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("static"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
let USER_ERROR = "";
let TEXT_ERROR = "";
let USER_INPUT = "";
let TEXT_INPUT = "";
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date().toLocaleDateString(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date().toLocaleDateString(),
  },
];

app.get("/", (req, res) => {
  res.render("index", {
    messages: messages,
  });
});
app.get("/new", (req, res) => {
  console.log(req.userError);
  res.render("form", {
    userError: USER_ERROR,
    userInput: USER_INPUT,
    textError: TEXT_ERROR,
    textInput: TEXT_INPUT,
  });
});
app.post("/new", (req, res) => {
  USER_ERROR = "";
  TEXT_ERROR = "";
  USER_INPUT = "";
  TEXT_INPUT = "";
  const { user, text } = req.body;
  const added = new Date().toLocaleDateString();
  let isAnyFieldEmpty = false;
  if (user === "") {
    USER_ERROR = "field is empty";
    isAnyFieldEmpty = true;
  }
  if (text === "") {
    TEXT_ERROR = "field is empty";
    isAnyFieldEmpty = true;
  }
  if (isAnyFieldEmpty) {
    console.log(true);
    USER_INPUT = user;
    TEXT_INPUT = text;
    res.redirect("/new");
  } else {
    const messageObject = {
      text,
      user,
      added,
    };
    messages.push(messageObject);
    res.redirect("/");
  }
});
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

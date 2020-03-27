const Express = require("express");
const Mongoose = require("mongoose");
const Passport = require("passport");
const Keys = require("./Config/Keys");
const User = require("./Routes/Api/users");
const Post = require("./Routes/Api/post");
const Profile = require("./Routes/Api/profile");

// Connecting To Mongodb Via Mongoose
Mongoose.connect(
  Keys.mongoURI,
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  err => {
    if (err) {
      return console.log("Not Connectd To Mongodb :(");
    }
    console.log("Connected To Mongodb :)");
  }
);
// Making Our App As Express
const App = Express();

// Inorder To Access Req.Body
App.use(Express.json({}));

// Passport Middleware
App.use(Passport.initialize());
// Passport Configuration
require("./Config/Passport")(Passport);

// ROUTES
App.use("/api/users", User);
App.use("/api/profile", Profile);
App.use("/api/post", Post);

App.get("/", (req, res, next) => res.status(200).json("HELLO WORLD"));
const Port = process.env.PORT || 5000;

App.all("*", (req, res) => {
  res.status(401).json("Couldn't Find This Path :(");
});
// Listening At PORT
App.listen(Port, err => {
  if (err) {
    return console.log("Server Is NOt Running :(");
  }
  console.log("Server Is Running On Port " + Port);
});

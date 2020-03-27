const Express = require("express");
const Gravatar = require("gravatar");
const Bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const Key = require("../../Config/Keys");
const isRegistrationValid = require("../../Validations/Register");
const isLoginValid = require("../../Validations/Login");
const Passport = require("passport");
const UserModel = require("../../Models/User");
const ProfileModel = require("../../Models/Profile");
const Route = Express.Router();

//@Route=/api/user/register
//@Access=Public
//@Purpose=To Register User
Route.post("/register", (req, res) => {
  const { error, isValid } = isRegistrationValid(req.body);
  if (!isValid) {
    return res.status(400).json({
      Status: "Failed",
      error
    });
  }
  UserModel.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({
          Status: "Failed",
          Email: "This Email Already Exists"
        });
      } else {
        // Gravatar pkg will take email and provide you avatar according to email if any otherwise we can
        // use other options whcih will work when fall back occur-
        const avatar = Gravatar.url(req.body.email, {
          s: "200", //Size Will Be 200PX
          r: "pg", //It Defines Which type of avatar we want [If we use pg there will
          //be not any nudity but if we use r that will contan nudity]
          d: "mm" // Default mm tells that if you can't find any avatar for our email use default
          // Anonymous Icon
        });
        const newUser = new UserModel({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });
        //   A Salt is nothing a sequence of random number
        // Which will Hash The password to make it safer-
        Bcrypt.genSalt(10, (err, salt) => {
          Bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(User => {
                res.status(201).json({
                  Status: "Success",
                  User
                });
              })
              .catch(err => {
                res.status(400).json({
                  Status: "Failed",
                  Error: err.message
                });
              });
          });
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        Status: "Failed",
        Message: err.message
      });
    });
});

//@Route=/api/user/login
//@Access=Public
//@Purpose=To Login User
Route.post("/login", async (req, res) => {
  // Destructuring
  const { email, password } = req.body;
  const { error, isValid } = isLoginValid(req.body);
  if (!isValid) {
    return res.status(400).json({
      Status: "Failed",
      error
    });
  }
  const User = await UserModel.findOne({ email });
  if (!User) {
    return res.status(404).json({
      Status: "Failed",
      Message: "Couldn't Find User"
    });
  }
  const isMatch = await Bcrypt.compare(password, User.password);

  if (!isMatch) {
    return res.status(404).json({
      Status: "Failed",
      Message: "Couldn't Find User"
    });
  }
  const Payload = { id: User._id, email: User.email, avatar: User.avatar };
  const Token = JWT.sign(Payload, Key.secretKey, { expiresIn: "1h" });
  return res.status(200).json({
    Status: "Success",
    Token: "Bearer " + Token
  });
});

// Middleware
Route.use(Passport.authenticate("jwt", { session: false }));
//@Route=/api/user/current
//@Access=Private
//@Purpose=To Get Current LoggedIn User
Route.get("/current", (req, res) => {
  res.status(200).json({
    User: req.user
  });
});

//@Route=/api/user/me
//@Access=Private
//@Purpose=To Delete Account As Well As Profile
Route.delete("/me", async (req, res) => {
  await ProfileModel.findOneAndRemove({ user: req.user.id });
  await UserModel.findByIdAndDelete(req.user.id);
  res.status(200).json({
    Status: "Success",
    Message: "Deleted Successfully!!!"
  });
});
module.exports = Route;

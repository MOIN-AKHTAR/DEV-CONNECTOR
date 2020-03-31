const UserModel = require("../Models/User");
const Keys = require("../Config/Keys");
// Extracting Strategy Object Inorder To Define Which Strategy We i'll Use-
const JwtStrategy = require("passport-jwt").Strategy;
// Extracting ExtractJwt Inorder To Define We Want Bearer Token
const ExtractJwt = require("passport-jwt").ExtractJwt;
// An Object Which Will Provide Whole Information That We Want To Use Bearer Token And SecretKey
const opts = {};
// Telling We Want A Bearer Token Only-
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// Secret Key While Generating Token
opts.secretOrKey = Keys.secretKey;

module.exports = Passport =>
  Passport.use(
    // jwt_payload will Be Our Decode Payload
    // Done Is A Function Which Will Make Info Available To Route Functions
    new JwtStrategy(opts, function(jwt_payload, done) {
      UserModel.findOne({ _id: jwt_payload.id }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );

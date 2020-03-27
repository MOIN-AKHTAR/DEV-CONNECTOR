const Validator = require("validator");
const isEmpty = require("./isEmpty");
const isRegistrationValid = data => {
  const error = {};
  //   If User Not Providing Some Values;
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    error.name = "Name Must Be Between 2 And 30 Characters";
  } else if (Validator.isEmpty(data.name)) {
    error.name = "Please Provide Name";
  }
  if (Validator.isEmpty(data.email)) {
    error.email = "Please Provide Your Email";
  }
  if (!Validator.isEmail(data.email)) {
    error.email = "Please Provide Correct Email";
  }
  if (Validator.isEmpty(data.password)) {
    error.password = "Please Provide Password";
  }
  if (!Validator.isLength(data.password, { min: 6 })) {
    error.password = "Password Must Have Atleast 6 Characters";
  }
  return {
    error,
    isValid: isEmpty(error)
  };
};
module.exports = isRegistrationValid;

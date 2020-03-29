const Validator = require("validator");
const isEmpty = require("./isEmpty");
const isLoginValid = data => {
  const error = {};
  //   If User Not Providing Some Values;
  data.text = !isEmpty(data.text) ? data.text : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.avatar = !isEmpty(data.avatar) ? data.avatar : "";
  if (Validator.isEmpty(data.text)) {
    error.text = "Please Provide Text";
  }
  if (Validator.isEmpty(data.name)) {
    error.name = "Please Provide Name";
  }
  if (Validator.isEmpty(data.avatar)) {
    error.avatar = "Please Provide Avartar";
  }

  return {
    error,
    isValid: isEmpty(error)
  };
};
module.exports = isLoginValid;

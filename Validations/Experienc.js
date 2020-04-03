const Validator = require("validator");
const isEmpty = require("./isEmpty");
const ExperienceValidation = data => {
  const error = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    error.title = "Must Provide Title";
  }
  if (Validator.isEmpty(data.company)) {
    error.company = "Must Provide Company";
  }

  if (Validator.isEmpty(data.from)) {
    error.from = "Must Provide From";
  }
  return {
    error,
    isValid: isEmpty(error)
  };
};
module.exports = ExperienceValidation;

const Validator = require("validator");
const isEmpty = require("./isEmpty");
const ExperienceValidation = data => {
  const error = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  if (Validator.isEmpty(data.title)) {
    error.title = "Must Provide Title";
  }
  if (Validator.isEmpty(data.company)) {
    error.company = "Must Provide Company";
  }
  if (Validator.isEmpty(data.location)) {
    error.location = "Must Provide Location";
  }
  if (Validator.isEmpty(data.from)) {
    error.from = "Must Provide From";
  }
  if (Validator.isEmpty(data.to)) {
    error.to = "Must Provide To";
  }
  if (Validator.isEmpty(data.description)) {
    error.description = "Must Provide Description";
  }
  return {
    error,
    isValid: isEmpty(error)
  };
};
module.exports = ExperienceValidation;

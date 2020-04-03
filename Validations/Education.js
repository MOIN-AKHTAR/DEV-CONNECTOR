const Validator = require("validator");
const isEmpty = require("./isEmpty");
const EducationValidation = data => {
  const error = {};
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  if (Validator.isEmpty(data.school)) {
    error.school = "Must Provide School";
  }
  if (Validator.isEmpty(data.degree)) {
    error.degree = "Must Provide Degree";
  }
  if (Validator.isEmpty(data.fieldofstudy)) {
    error.fieldofstudy = "Must Provide Field Of Study";
  }
  if (Validator.isEmpty(data.from)) {
    error.from = "Must Provide From";
  }

  return {
    error,
    isValid: isEmpty(error)
  };
};
module.exports = EducationValidation;

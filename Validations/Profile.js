const Validator = require("validator");
const isEmpty = require("./isEmpty");
const ProfileValidation = data => {
  const error = {};
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";
  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    error.handle = "Must Be Length B/W 2 And 40 Characters";
  }
  if (Validator.isEmpty(data.handle)) {
    error.handle = "Handle Field Is Required";
  }
  if (Validator.isEmpty(data.status)) {
    error.status = "Status Required";
  }
  if (Validator.isEmpty(data.skills)) {
    error.skills = "Skills Required";
  }
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      error.website = "Provide Correct Url";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      error.youtube = "Provide Correct Url";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      error.twitter = "Provide Correct Url";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      error.facebook = "Provide Correct Url";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      error.linkedin = "Provide Correct Url";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      error.instagram = "Provide Correct Url";
    }
  }
  return {
    error,
    isValid: isEmpty(error)
  };
};
module.exports = ProfileValidation;

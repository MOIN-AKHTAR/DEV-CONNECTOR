const Express = require("express");
const Route = Express.Router();
const Passport = require("passport");
const ProfileModel = require("../../Models/Profile");
const UserModel = require("../../Models/User");
const ProfileValidation = require("../../Validations/Profile");
const ExperienceValidation = require("../../Validations/Experienc");
const EducationValidation = require("../../Validations/Education");

// @Route =  /api/profile/handle/:handle
// @Access = public
// @Desc = Get Profile Via Handle

Route.get("/handle/:handle", async (req, res) => {
  const Profile = await ProfileModel.findOne({
    handle: req.params.handle,
  }).populate("user", ["name", "avatar"]);
  if (!Profile) {
    return res.status(404).json({
      Status: "Failed",
      Message: "No Profile Found With This Handle",
    });
  }
  return res.status(200).json({
    Status: "Success",
    Profile,
  });
});

// @Route =  /api/profile/user/id
// @Access = public
// @Desc = Get Profile Via Id

Route.get("/user/:id", async (req, res) => {
  const Profile = await ProfileModel.findById(req.params.id).populate("user", [
    "name",
    "avatar",
  ]);
  if (!Profile) {
    return res.status(404).json({
      Status: "Failed",
      Message: "No Profile Found With This Id",
    });
  }
  return res.status(200).json({
    Status: "Success",
    Profile,
  });
});

// @Route =  /api/profile/all
// @Access = public
// @Desc = Get All Profiles
Route.get("/all", async (req, res) => {
  const Profiles = await ProfileModel.find({}).populate("user", [
    "name",
    "avatar",
  ]);
  res.status(200).json({
    Status: "Success",
    Count: Profiles.length,
    Profiles,
  });
});

Route.use(Passport.authenticate("jwt", { session: false }));
// @Route =  /api/profile/
// @Access = Private
// @Desc = Get Profile Of Currently LoggedIn User
Route.get("/", async (req, res) => {
  const Profile = await ProfileModel.findOne({ user: req.user.id });
  if (!Profile) {
    return res.status(404).json({
      Status: "failed",
      Message: "Couldn't Find Profile Of This User",
    });
  }
  return res.status(200).json({
    Status: "Success",
    Profile,
  });
});

// @Route =  /api/profile/
// @Access = Private
// @Desc = Update/Inser Profile Of Currently LoggedIn User
Route.post("/", async (req, res) => {
  const { error, isValid } = ProfileValidation(req.body);
  const ProfileFields = {};
  ProfileFields.user = req.user.id;
  if (req.body.handle) ProfileFields.handle = req.body.handle;
  if (req.body.company) ProfileFields.company = req.body.company;
  if (req.body.website) ProfileFields.website = req.body.website;
  if (req.body.location) ProfileFields.location = req.body.location;
  if (req.body.bio) ProfileFields.bio = req.body.bio;
  if (req.body.status) ProfileFields.status = req.body.status;
  if (req.body.githubusername)
    ProfileFields.githubusername = req.body.githubusername;

  if (typeof req.body.skills !== "undefined") {
    ProfileFields.skills = req.body.skills.split(",");
  }
  ProfileFields.social = {};
  if (req.body.youtube) ProfileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) ProfileFields.social.twitter = req.body.twitter;
  if (req.body.linkedin) ProfileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) ProfileFields.social.instagram = req.body.instagram;
  if (req.body.facebook) ProfileFields.social.facebook = req.body.facebook;

  const ProfileOfUser = await ProfileModel.findOne({ user: req.user.id });
  if (!isValid) {
    return res.status(400).json({
      Status: "Failed",
      error,
    });
  }
  // If We Have Profile Of User Then We Will Update-
  if (ProfileOfUser) {
    const UpdatedProfile = await ProfileModel.findOneAndUpdate(
      { user: req.user.id },
      { $set: ProfileFields },
      { new: true }
    ).populate("user", ["name", "avatar"]);
    return res.status(200).json({
      Status: "Success",
      UpdatedProfile,
    });
  } else {
    // If We Don't Have Profile Of User Then We Will Create Profile
    const UserWithSameHandle = await ProfileModel.findOne({
      handle: ProfileFields.handle,
    });
    if (UserWithSameHandle) {
      return res.status(400).json({
        Status: "Failed",
        Message: "Use Unique Handle",
      });
    } else {
      const NewProfile = await new ProfileModel(ProfileFields).save();

      res.status(201).json({
        Status: "Success",
        Profile: NewProfile,
      });
    }
  }
});

// @Route =  /api/profile/experience
// @Access = private
// @Desc = Inert Your Experience
Route.post(
  "/experience",
  Passport.authenticate("jwt", { session: false }),

  async (req, res) => {
    const { error, isValid } = ExperienceValidation(req.body);
    if (!isValid) {
      return res.status(400).json({
        Status: "Failed",
        error,
      });
    }
    const Profile = await ProfileModel.findOne({ user: req.user.id });
    const Experience = {};
    if (req.body.title) Experience.title = req.body.title;
    if (req.body.company) Experience.company = req.body.company;
    if (req.body.location) Experience.location = req.body.location;
    if (req.body.from) Experience.from = req.body.from;
    if (req.body.to) Experience.to = req.body.to;
    if (req.body.description) Experience.description = req.body.description;
    Profile.experience.unshift(Experience);
    await Profile.save();
    res.status(200).json({
      Status: "Success",
      Profile,
    });
  }
);

// @Route =  /api/profile/experience/:id
// @Access = private
// @Desc = Delete Your Experience
Route.delete("/experience/:id", async (req, res) => {
  const Profile = await ProfileModel.findOne({ user: req.user.id });
  const removeIndex = Profile.experience
    .map((Exp) => Exp._id)
    .indexOf(req.params.id);
  Profile.experience.splice(removeIndex, 1);
  if (removeIndex < 0) {
    return res.status(404).json({
      Status: "Failed",
      Message: "Can Not Find Experience",
    });
  }
  await Profile.save();
  res.status(200).json({
    Status: "Success",
    Profile,
  });
});

// @Route =  /api/profile/education
// @Access = private
// @Desc = Inert Your Education
Route.post(
  "/education",
  Passport.authenticate("jwt", { session: false }),

  async (req, res) => {
    const { error, isValid } = EducationValidation(req.body);
    if (!isValid) {
      return res.status(400).json({
        Status: "Failed",
        error,
      });
    }
    const Profile = await ProfileModel.findOne({ user: req.user.id });
    const Education = {};
    if (req.body.school) Education.school = req.body.school;
    if (req.body.degree) Education.degree = req.body.degree;
    if (req.body.fieldofstudy) Education.fieldofstudy = req.body.fieldofstudy;
    if (req.body.from) Education.from = req.body.from;
    if (req.body.to) Education.to = req.body.to;
    if (req.body.description) Education.description = req.body.description;
    Profile.education.unshift(Education);
    await Profile.save();
    res.status(200).json({
      Status: "Success",
      Profile,
    });
  }
);

// @Route =  /api/profile/education/:id
// @Access = private
// @Desc = Delete Your Education
Route.delete("/education/:id", async (req, res) => {
  const Profile = await ProfileModel.findOne({ user: req.user.id });
  const removeIndex = Profile.education
    .map((edu) => edu._id)
    .indexOf(req.params.id);
  Profile.education.splice(removeIndex, 1);
  if (removeIndex < 0) {
    return res.status(404).json({
      Status: "Failed",
      Message: "Can Not Find Education",
    });
  }
  await Profile.save();
  res.status(200).json({
    Status: "Success",
    Profile,
  });
});

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
Route.delete("/", (req, res) => {
  ProfileModel.findOneAndRemove({ user: req.user.id })
    .then(() => {
      UserModel.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    })
    .catch((err) => res.json({ err }));
});
module.exports = Route;

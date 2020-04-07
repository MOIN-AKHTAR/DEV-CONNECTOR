import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import InputGroup from "../../Share/InputGroup";
import TextArea from "../../Share/TextArea";
import SelectListGroup from "../../Share/SelectListGroup";
import TextGroup from "../../Share/TextGroup";
import { createProfile } from "../../Redux/Action/Profile";

// This Component Will Allow You To Create Your Profile
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      error: {},
    };
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const profiledata = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
    };
    // Calling Create Profile Action
    // this.props.history Will Allow Your Action To Redirect To Other Page
    this.props.createProfile(profiledata, this.props.history);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      // If Any Error Occur Set Error Property And Show Errors On Profile Form
      this.setState({
        error: nextProps.error,
      });
    }
  }

  render() {
    const { error, displaySocialInputs } = this.state;
    // Select Option For Select Status
    const options = [
      {
        lable: "* Select Professional Status",
        value: "0",
      },
      {
        lable: "Developer",
        value: "Developer",
      },
      {
        lable: "Junior Developer",
        value: "Junior Developer",
      },
      {
        lable: "Senior Developer",
        value: "Senior Developer",
      },
      {
        lable: "Manager",
        value: "Manager",
      },
      {
        lable: "Student Or Learning",
        value: "Student Or Learning",
      },
      {
        lable: "Instructor Or Teacher",
        value: "Instructor Or Teacher",
      },
      {
        lable: "Intern",
        value: "Intern",
      },
      {
        lable: "Other",
        value: "Other",
      },
    ];
    // It will show Social Profile Inputs
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={error.twitter}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={error.facebook}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={error.instagram}
          />
          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={error.youtube}
          />
          <InputGroup
            placeholder="LinkedIn Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={error.linkedin}
          />
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">*= required</small>
              <form onSubmit={this.onSubmit}>
                <TextGroup
                  placeholder="* profile handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={error.handle}
                  info="A unique handle for your profile URL.Your full name,company nickname"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={error.status}
                  info="Give us an idea of where you at in your career"
                  options={options}
                />
                <TextGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={error.company}
                  info="Could be your own company or one you work for"
                />
                <TextGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={error.company}
                  info="Could be your own website or a company one"
                />
                <TextGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={error.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={error.skills}
                  info="Please use comma separated values (eg. HTML,CSS,JAVASCRIPT,PHP)"
                />
                <TextGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={error.githubusername}
                  info="If you want your least repos and a Github link, include your repo"
                />
                <TextArea
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={error.bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    className="btn btn-light m-2"
                    type="button"
                    onClick={() => {
                      this.setState((prevState) => ({
                        displaySocialInputs: !prevState.displaySocialInputs,
                      }));
                    }}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                  {socialInputs}
                  <button className="btn btn-info btn-block mt-4">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (State) => {
  return {
    profile: State.profile,
    error: State.error,
  };
};
// withRouter Will Allow Your Component To Send history As A Parameter Which Can Be Used By
// The Action Inorder To Redirect To Other Page
export default connect(mapStateToProps, { createProfile })(withRouter(Profile));

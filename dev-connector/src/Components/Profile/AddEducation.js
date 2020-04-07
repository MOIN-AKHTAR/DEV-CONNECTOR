import React, { Component } from "react";
import TextGroup from "../../Share/TextGroup";
import TextArea from "../../Share/TextArea";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { addEducation } from "../../Redux/Action/Profile";

// This Component Will Allows You To Add Education
class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      error: {},
      disabled: false,
    };
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onCheck = (e) => {
    this.setState((prev) => ({
      disabled: !prev.disabled,
      current: !prev.current,
    }));
  };
  onSubmit = (e) => {
    e.preventDefault();
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    };
    // Calling AddEducation Action
    this.props.addEducation(eduData, this.props.history);
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      // If Any Error Occur Set Error Property And Show Error On AddEducation Form
      this.setState({
        error: nextProps.error,
      });
    }
  }
  render() {
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="text-center display-4">Add Education</h1>
              <p className="lead text-center">
                Add some detail about your education
              </p>
              <small className="d-block pb-3">*= required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={this.state.error.school}
                />
                <TextGroup
                  placeholder="* Degree/Certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={this.state.error.degree}
                />
                <TextGroup
                  placeholder="* Field Of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={this.state.error.fieldofstudy}
                />
                <h6>From Date</h6>
                <TextGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={this.state.error.from}
                />
                <h6>To Date</h6>
                <TextGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={this.state.error.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="current"
                    value={this.state.current}
                    onChange={this.onCheck}
                  />
                  <label className="form-check-label" htmlFor="current">
                    Current Job
                  </label>
                </div>
                <TextArea
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={this.state.error.description}
                  info="Tell us about the program that you were in"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (State) => ({
  profile: State.profile,
  error: State.error,
});
export default connect(mapStateToProps, { addEducation })(
  withRouter(AddExperience)
);

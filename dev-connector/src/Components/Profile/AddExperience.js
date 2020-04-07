import React, { Component } from "react";
import TextGroup from "../../Share/TextGroup";
import TextArea from "../../Share/TextArea";
import { addExperience } from "../../Redux/Action/Profile";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

// This Component Will Allow You To Add Education
class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
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
    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    };
    // Calling Add Experience Action
    this.props.addExperience(expData, this.props.history);
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      // If Any Error Occur Set Error Property And Show Error On AddExperience Form
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
              <h1 className="text-center display-4">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position you have had in the past or current
              </p>
              <small className="d-block pb-3">*= required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={this.state.error.company}
                />
                <TextGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={this.state.error.title}
                />
                <TextGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={this.state.error.location}
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
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={this.state.error.description}
                  info="tell us about the position"
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
export default connect(mapStateToProps, { addExperience })(
  withRouter(AddExperience)
);

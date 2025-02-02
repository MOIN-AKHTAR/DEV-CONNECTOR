import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../Redux/Action/Profile";

class Experience extends Component {
  deleteExperience = (Id) => {
    // Delete Experience Action
    this.props.deleteExperience(Id);
  };

  render() {
    const experience = this.props.experience.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment>-
          {exp.to === null ? (
            "NOW"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.deleteExperience(exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Duration</th>
              <th></th>
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(null, { deleteExperience })(Experience);

import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../Redux/Action/Profile";

class Education extends Component {
  deleteEducation = (Id) => {
    // Delete Education Action
    this.props.deleteEducation(Id);
  };

  render() {
    const education = this.props.education.map((edu) => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment>-
          {edu.to === null ? (
            "NOW"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.deleteEducation(edu._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Duration</th>
              <th></th>
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(null, { deleteEducation })(Education);

import React, { Component } from "react";
import Moment from "react-moment";

export default class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;
    const expItem = experience.map((exp, index) => (
      <li className="list-group-item" key={index}>
        <h4>{exp.company}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment>-
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position:</strong>
          {exp.title}
        </p>
        <p>
          {exp.location === "" ? null : (
            <span>
              <strong>Location:</strong>
              {exp.location}
            </span>
          )}
        </p>
        <p>
          {exp.desccription === "" ? null : (
            <span>
              <strong>Description:</strong>
              {exp.description}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItem = education.map((edu, index) => (
      <li className="list-group-item" key={index}>
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment>-
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong>Degree:</strong>
          {edu.degree}
        </p>
        <p>
          <strong>Field Of Study:</strong>
          {edu.fieldofstudy}
        </p>
        <p>
          {edu.desccription === "" ? null : (
            <span>
              <strong>Description:</strong>
              {edu.description}
            </span>
          )}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {expItem.length > 0 ? (
            <ul className="list-group">{expItem}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {eduItem.length > 0 ? (
            <ul className="list-group">{eduItem}</ul>
          ) : (
            <p className="text-center">No Education Listed</p>
          )}
        </div>
      </div>
    );
  }
}

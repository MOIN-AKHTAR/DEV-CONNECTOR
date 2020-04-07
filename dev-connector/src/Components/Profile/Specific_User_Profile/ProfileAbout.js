import React, { Component } from "react";
import { isEmpty } from "../../../Utils/isEmpty";

// This Component Will Be Responsible For Showing About Section Of Your Profile
export default class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    // Get The First Name
    const name = profile.user.name && profile.user.name.trim().split(" ")[0];
    const skills = profile.skills.map((skill, index) => (
      <div className="p-3" key={index}>
        <i className="fa fa-check"></i> {skill}
      </div>
    ));
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{name}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>You don't hae a bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

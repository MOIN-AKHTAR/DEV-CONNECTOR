import React, { Component } from "react";
import { isEmpty } from "../../../Utils/isEmpty";
import { Link } from "react-router-dom";

// This Component Will Show The Header Of Your Profile Which Will Be Consist On Big Picture As
// Avatar And Your Name WIht Social Account Font-Awesome
export default class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-2 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt="No Preview"
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">{profile.status}</p>
              {isEmpty(profile.company) ? null : <p>{profile.company}</p>}
              <p>
                {!isEmpty(profile.social && profile.social.youtube) && (
                  <Link className="text-white p-2" to="#">
                    <i className="fas fa-globe fa-2x"></i>
                  </Link>
                )}
                {!isEmpty(profile.social && profile.social.twitter) && (
                  <Link className="text-white p-2" to="#">
                    <i className="fab fa-twitter fa-2x"></i>
                  </Link>
                )}
                {!isEmpty(profile.social && profile.social.facebook) && (
                  <Link className="text-white p-2" to="#">
                    <i className="fab fa-facebook fa-2x"></i>
                  </Link>
                )}
                {!isEmpty(profile.social && profile.social.linkedin) && (
                  <Link className="text-white p-2" to="#">
                    <i className="fab fa-linkedin fa-2x"></i>
                  </Link>
                )}
                {!isEmpty(profile.social && profile.social.instagram) && (
                  <Link className="text-white p-2" to="#">
                    <i className="fab fa-instagram fa-2x"></i>
                  </Link>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

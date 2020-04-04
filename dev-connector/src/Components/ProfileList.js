import React, { Component } from "react";
import ProfileItem from "./ProfileItem";
import Spinner from "./Spinner";
import { connect } from "react-redux";
import { getProfiles } from "../Redux/Action/Profile";

class ProfileList extends Component {
  componentDidMount() {
    //   Getting All Users Profiles
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItem;
    if (loading || profiles === null) {
      profileItem = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItem = profiles.map((profile) => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItem = <h1>No Profile Found :(</h1>;
      }
    }
    return (
      <div className="profile_list">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Developers Profiles</h1>
              <p className="lead text-center">
                Browse and Connect To Developers
              </p>
              {profileItem}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (State) => ({
  profile: State.profile,
});
export default connect(mapStateToProps, { getProfiles })(ProfileList);

import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "",
      clientSecret: "",
      count: 5,
      sort: "created: asc",
      repos: [],
    };
  }
  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          repos: data,
        });
      })
      .catch((err) => console.log(err.response.data));
  }
  render() {
    const { repos } = this.state;
    const repoItems = repos.map((repo) => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars:{repo.stargazers_count ? repo.stargazers_count : 0}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers:{repo.watchers_count ? repo.watchers_count : 0}
            </span>
            <span className="badge badge-success ">
              Forks:{repo.fork_count ? repo.fork_count : 0}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <hr />
        <h3 className="mb-4">Latest Github repos</h3>
        {repoItems}
      </div>
    );
  }
}

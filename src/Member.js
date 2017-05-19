import React, { Component } from 'react';
import axios from 'axios';

class Member extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const member = this.props.member
    axios.get(`${member.url}`)
      .then(response => {
        const data = response.data
        this.setState({ user: data, loading: false, error: null });
      })
      .catch(error => {
        this.setState({ loading: false, error: error })
      })
  }

  renderError() {
    return (
      <div>
        {this.state.error.message}
      </div>
    );
  }

  renderLoading() {
    return (
      <div>
        loading...
      </div>
    )
  }

  renderMember() {
    const { user, error } = this.state;

    if(error) {
      return this.renderError();
    }

    return (
      <div>
        {user.login} - {user.public_repos}
      </div>

    )
  }

  render() {
    const loading = this.state.loading
    return(
      <div>
        { loading ? this.renderLoading() : this.renderMember()}
      </div>
    )
  }
}

export default Member

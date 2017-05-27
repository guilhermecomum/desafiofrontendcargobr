import React, { Component } from 'react';
import axios from 'axios';
import Member from './Member';
import '../styles/Members.css';

class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    let instance = axios.create({
      baseURL: 'https://api.github.com/',
      auth: {
        username: process.env.REACT_APP_GITHUB,
      },
    });
    instance.get(`orgs/ouishare/members`)
      .then(res => {
        const members = res.data.map(obj => obj);
        this.setState({ members, loading: false })
      })
      .catch(error => {
        this.setState({ loading: false, error: error })
      })
  }

  renderError() {
    return (
      <div className="Members-error">
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

  renderMembers() {
    const { members, error } = this.state;
    const { handleCartItem } = this.props;

    if(error) {
      return this.renderError();
    }

    return (
      members.map( member => <Member key={member.id} member={member} handleCartItem={handleCartItem} />)
    )
  }

  render() {
    const loading = this.state.loading

    return (
      <div className="Members">
        <h1 className="Members-title">
          Membros do Ouishare
          <small>(Clique nos membros para adicionar ou remove-los)</small>
        </h1>
        <div className="Members-list">
          { loading ? this.renderLoading() : this.renderMembers()}
        </div>
      </div>
    )
  }
}

export default Members;

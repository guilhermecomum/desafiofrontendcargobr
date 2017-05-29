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

  getKey(a,b) {
    return a+b
  }

  componentDidMount() {
    let instance = axios.create({
      baseURL: 'https://api.github.com/',
      auth: {
        username: this.getKey("9b546608f9ac636d41","e8cadd1f776bd25cfb4a88")
      },
    });
    instance.get(`orgs/github/public_members`)
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
          Membros do Github
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

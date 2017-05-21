import React, { Component } from 'react';
import axios from 'axios';
import Member from './Member';

class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    axios.get('https://api.github.com/orgs/ouishare/members')
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

  renderMembers() {
    const { members, error } = this.state;
    const { addToCart } = this.props;

    if(error) {
      return this.renderError();
    }

    return (
      <div>
      { members.map( member => <Member key={member.id} member={member} addToCart={addToCart} />)}
      </div>
    )
  }

  render() {
    const loading = this.state.loading

    return (
      <div className="App">
        <h1>Ouishare's public members</h1>
        { loading ? this.renderLoading() : this.renderMembers()}
      </div>
    )
  }
}

export default Members;

import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      members: [],
      loading: true
    };
  }

  componentDidMount() {
    axios.get('https://api.github.com/orgs/ouishare/members')
      .then(res => {
        const members = res.data.map(obj => obj);
        this.setState({ members, loading: false })
      });
  }

  renderLoading() {
    return (
      <div>
        loading...
      </div>
    )
  }

  renderMembers() {
    const { members } = this.state;

    return (
      <div>
      { members.map( member => <div key={member.id}>{member.login}</div>)}
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
    );
  }
}

export default App;

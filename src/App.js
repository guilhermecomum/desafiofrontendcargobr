import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      members: [],
    };
  }

  componentDidMount() {
    axios.get('https://api.github.com/orgs/ouishare/members')
      .then(res => {
        const members = res.data.map(obj => obj);
        this.setState({ members });
      });
  }

  render() {
    const { members } = this.state;

    return (
      <div className="App">
        <h1>Ouishare's public members</h1>
        { members.map( member => <div key={member.id}>{member.login}</div>)}
      </div>
    );
  }
}

export default App;

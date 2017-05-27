import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Member.css';

class Member extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      loading: true,
      error: null,
      selected: false,
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const member = this.props.member
    let instance = axios.create({
      auth: {
        username: '',
      },
    });
    instance.get(`${member.url}`)
      .then(response => {
        const data = response.data
        this.setState({ user: data, loading: false, error: null });
      })
      .catch(error => {
        this.setState({ loading: false, error: error })
      })
  }

  handleSelect(e) {
    const user = this.state.user;
    const { handleCartItem } = this.props;

    handleCartItem(user);

    this.setState(prevState => ({
      selected: !prevState.selected
    }));

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
      <div  className='Member'>
        loading...
      </div>
    )
  }

  renderMember() {
    const { user, error } = this.state;
    const location = user.location ? user.location.split(",")[0] : "" ;

    if(error) {
      return this.renderError();
    }

    return (
      <div onClick={this.handleSelect} className={ this.state.selected ? 'Member-selected' : 'Member'}>
        <div className="Member-add"/>
        <img src={user.avatar_url} alt={`${user.name || user.login}'s avatar`} className="Member-avatar"/>
        <div className="Member-info">
          <div className="Member-name">{user.login}</div>
          <div className="Member-location">{location}</div>
          <div className="Member-value">{ user.followers }</div>
        </div>
      </div>
    )
  }

  render() {
    const loading = this.state.loading
    return(
      loading ? this.renderLoading() : this.renderMember()
    )
  }
}

export default Member

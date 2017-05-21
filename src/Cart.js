import React, { Component } from 'react';

class Cart extends Component {
  renderTotal() {
    const list = this.props.list;
    const total = list.reduce((a,b) => {
      return b.public_repos == null ? a : a + b.public_repos
    }, 0)
    return total
  }

  renderItems() {
    const list = this.props.list
    return (
      <div>
        { list.map( item => <div key={item.id}>{ item.login }</div> )}
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <h1>Cart</h1>
        {this.renderItems()}
        {this.renderTotal()}
      </div>
    );
  }
}

export default Cart;

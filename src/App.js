import React, { Component } from 'react';
import Members from './Members';
import Cart from './Cart';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
    };
  }

  handleCartItem(item) {
    let cart = this.state.cart
    if (cart.indexOf(item) === -1) {
      cart.push(item)
      this.setState({ cart })
    } else if (cart.indexOf(item) > -1) {
      cart = cart.filter((cartItem) => cartItem.id !== item.id )
      this.setState({ cart })
    }
  }

  render() {
    const { cart } = this.state

    return (
      <div className="App">
        <div className="App-stage">
          <Members handleCartItem={this.handleCartItem.bind(this)} />
          <Cart list={cart}/>
        </div>
      </div>
    );
  }
}

export default App;

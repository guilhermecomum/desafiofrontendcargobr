import React, { Component } from 'react';
import './CartItem.css';

class CartItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <div className="CartItem">
        <div className="CartItem-block">
          <img src={item.avatar_url} alt={`${item.name || item.login}'s avatar`} className="CartItem-avatar"/>        
          <div className="CartItem-name">{item.login}</div>
        </div>
        <div className="CartItem-value">{item.followers}</div>
     </div>
    );
  }
}

export default CartItem;

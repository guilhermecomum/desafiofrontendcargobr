import React, { Component } from 'react';
import CartItem from './CartItem';
import '../styles/Cart.css';

class Cart extends Component {
  renderTotal() {
    const list = this.props.list;
    const total = list.reduce((a,b) => {
      return b.followers == null ? a : a + b.followers
    }, 0)
    return total
  }

  renderItems() {
    const list = this.props.list;

    return (
      <div>
        {list.length === 0 &&
         <div className="Cart-empty">
            Por favor adicione alguem ;-)
         </div>
        }
        {list.map( item => <CartItem key={item.id} item={item} /> )}
      </div>
    )
  }

  canSubmit() {
    const list = this.props.list;

    return list.length === 0 ? false : true
  }

  render() {
    return (
      <div className="Cart">
        <h1 className="Cart-title">Carrinho</h1>
        {this.renderItems()}
        <div className="Cart-total">{this.renderTotal()}</div>
        <button type="button" className="Cart-submit" disabled={!this.canSubmit()}>Comprar</button>
      </div>
    );
  }
}

export default Cart;

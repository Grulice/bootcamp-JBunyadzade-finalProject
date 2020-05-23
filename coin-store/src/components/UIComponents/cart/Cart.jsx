import React, { Component } from "react";
import Basket from "../img/basket.svg";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CartContainer, Badge } from "./Cart_style";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Link to="/cart">
        <CartContainer>
          <img src={Basket} alt="" />
          <Badge>{this.props.cart ? this.props.cart.length : 0}</Badge>
        </CartContainer>
      </Link>
    );
  }
}
const mapStateToProps = (state) => {
  return { cart: state.cart.cart };
};

export default connect(mapStateToProps)(Cart);

import React, { Component } from "react";
import { ButtonTextSmall } from "../../../commonElements";
import { connect } from "react-redux";
import { removeFromCart, changeCartItem } from "../../../redux/cart/actions";
import IncDecCounter from "../IncDecCounter";
import {
  ItemContainer,
  DescContainer,
  CoinLink,
  CoinDesc,
  CounterContainer,
  PriceInfoContainer,
} from "./CartItem_style";

const SERVER_BASEURL = `http://localhost:3001`;

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = { itemRemoved: false };
  }

  updateCart = (quantity) => {
    const { id, price } = this.props;
    this.props.changeCartItem(id, quantity, price);
  };

  handleRemove = () => {
    this.props.removeFromCart(this.props.id);
    this.setState({ itemRemoved: true });
  };

  render() {
    const { id, name, shortDesc, quantity, price } = this.props;
    return (
      <ItemContainer removed={this.state.itemRemoved}>
        <img src={`/api/image/${id}.png`} alt="" />
        <DescContainer>
          <CoinLink to={`/coin/${id}`}>{name}</CoinLink>
          <CoinDesc>{shortDesc}</CoinDesc>
          <div className="delete-container">
            <ButtonTextSmall onClick={this.handleRemove}>
              <b>Remove from cart</b>
            </ButtonTextSmall>
          </div>
        </DescContainer>
        <CounterContainer>
          <IncDecCounter onChange={this.updateCart} initVal={quantity} />
        </CounterContainer>
        <PriceInfoContainer>
          <p>
            <b>{quantity * price}</b> $
          </p>
        </PriceInfoContainer>
      </ItemContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = { changeCartItem, removeFromCart };

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);

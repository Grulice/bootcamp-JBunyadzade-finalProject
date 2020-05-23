import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ButtonPrimary, TextArea, InputLabel } from "../../commonElements";
import CartItem from "../UIComponents/cart/CartItem";
import * as fetcher from "../../fetcher";
import { connect } from "react-redux";
import { addToCart, removeFromCart, emptyCart } from "../../redux/cart/actions";
import { PageContainer, CartCol, BuyCol } from "./CartPage_style";

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      shippingAddress: "",
      redirectToHomePage: false,
      isFormFilled: false,
    };
  }
  componentDidMount() {
    const { cart } = this.props;
    const itemIds = cart.map((cartItem) => cartItem.id);
    if (itemIds.length > 0)
      fetcher.getMultipleCoinInfo(itemIds).then((result) => {
        this.setState({ searchResults: result });
      });
  }

  handleShipAddrChange = (e) =>
    this.setState({ shippingAddress: e.target.value });
  handleBuy = () => {
    const { username, token, cart } = this.props;
    const { shippingAddress } = this.state;

    const orderInfo = {
      order_contents: cart,
      shipping_address: shippingAddress,
    };
    fetcher.sendOrder(username, token, orderInfo).then((result) => {
      if (result.insertId) {
        // empty cart and reset form
        this.props.emptyCart();

        this.setState({
          searchResults: [],
          shippingAddress: "",
          redirectToHomePage: true,
        });
        alert(
          `Order placed successfully! Your order number is ${result.insertId}.`
        );
      } else {
        alert("Something went wrong. Please, try again later.");
      }
    });
  };

  getQuantityFromCart = (id) => {
    const { cart } = this.props;

    if (cart) {
      const searchItem = cart.find((item) => {
        return parseInt(item.id) === id;
      });
      return searchItem ? searchItem.quantity : 0;
    }
  };

  checkFormValidity = (cart, shippingAddress) =>
    cart.length !== 0 && shippingAddress;

  getTotalPrice = () => {
    const { cart } = this.props;
    const { searchResults } = this.state;
    if (searchResults)
      return cart.reduce((acc, item) => {
        const dbItemInfo = searchResults.find(
          (searchItem) => searchItem.id === parseInt(item.id)
        );
        const price = dbItemInfo ? dbItemInfo.price : 0;
        return acc + price * item.quantity;
      }, 0);
  };

  render() {
    const { searchResults, shippingAddress, redirectToHomePage } = this.state;
    return (
      <PageContainer>
        {redirectToHomePage ? <Redirect to="/" /> : ""}
        {this.props.isLoggedIn ? (
          <>
            <CartCol>
              {searchResults.map((coin) => (
                <CartItem
                  key={coin.id}
                  id={coin.id}
                  name={coin.name}
                  shortDesc={coin.desc_short}
                  quantity={this.getQuantityFromCart(coin.id)}
                  price={coin.price}
                />
              ))}
            </CartCol>
            <BuyCol>
              <p>Total price:</p>
              <h2>{this.getTotalPrice()} $</h2>

              <div className="buy-details-container">
                <InputLabel>Shipping address</InputLabel>
                <TextArea
                  value={shippingAddress}
                  onChange={this.handleShipAddrChange}
                />
                <ButtonPrimary
                  style={{ marginTop: 5 }}
                  onClick={this.handleBuy}
                  disabled={
                    !this.checkFormValidity(this.props.cart, shippingAddress)
                  }
                >
                  Buy now
                </ButtonPrimary>
              </div>
            </BuyCol>
          </>
        ) : (
          <p>Please, log in to make a purchase</p>
        )}
      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    token: state.auth.token,
    isLoggedIn: state.auth.token !== "" && state.auth.token !== null,
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = { addToCart, removeFromCart, emptyCart };

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);

import React, { Component } from "react";
import IncDecCounter from "../IncDecCounter";
import Basket from "../img/basket.svg";
import { connect } from "react-redux";
import { addToCart } from "../../../redux/cart/actions";
import { PlaqueContainer, AddButton } from "./AddToCart_style";

class AddToCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      loggedIn: false,
    };
  }
  componentDidMount() {
    this.setState({ loggedIn: this.props.loggedIn });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loggedIn !== this.props.loggedIn)
      this.setState({ loggedIn: this.props.loggedIn });
  }
  updateCount = (count) => this.setState({ count });
  handleAddToCart = () => {
    const id = this.props.itemId;
    const price = this.props.itemPrice;
    const quantity = this.state.count;
    if (quantity > 0) this.props.addToCart(id, quantity, price);
  };
  render() {
    return (
      <PlaqueContainer>
        {this.state.loggedIn ? (
          <>
            {" "}
            <IncDecCounter onChange={this.updateCount} />
            <AddButton onClick={this.handleAddToCart}>
              <img src={Basket} alt="" />
              <p className="add-to-cart">Add to cart</p>
            </AddButton>
          </>
        ) : (
          <p>
            Please, log in
            <br /> to make purchases
          </p>
        )}
      </PlaqueContainer>
    );
  }
}
const mapStateToProps = (state) => {
  return { loggedIn: state.auth.token !== "" && state.auth.token !== null };
};
const mapDispatchToProps = { addToCart };

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);

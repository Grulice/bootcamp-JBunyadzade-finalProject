import React, { Component } from "react";

import { RowContainer } from "./OrderItemArticle_style";

class OrderItemArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, price, quantity } = this.props;
    return (
      <RowContainer>
        <td>{name}</td>
        <td> x {quantity}</td>
        <td className="total-price">
          <b> = {quantity * price} $</b>
        </td>
      </RowContainer>
    );
  }
}

export default OrderItemArticle;

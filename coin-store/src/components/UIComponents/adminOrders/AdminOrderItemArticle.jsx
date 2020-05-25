import React, { Component } from "react";

import { RowContainer } from "./AdminOrderItemArticle_style";

class OrderItemArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { id, name, price, quantity } = this.props;
    return (
      <RowContainer>
        <td>
          ({id}) {name}
        </td>
        <td> x&nbsp;{quantity}</td>
        <td className="total-price">
          <b> = {quantity * price} $</b>
        </td>
      </RowContainer>
    );
  }
}

export default OrderItemArticle;

import React, { Component } from "react";
import { PageContainer, OrdersContainer } from "./AdminOrders_style";
import { connect } from "react-redux";
import * as fetcher from "../../../fetcher";
import AdminOrderItem from "../../UIComponents/adminOrders/AdminOrderItem";

class AdminOrders extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: [] };
  }

  componentDidMount() {
    const { token } = this.props;
    fetcher
      .getAllOrders(token)
      .then((orders) =>
        this.setState({ orders: orders.reverse() }, () =>
          console.log(this.state)
        )
      );
  }

  render() {
    const { username } = this.props;
    const { orders } = this.state;
    return (
      <PageContainer>
        {username === "admin" ? (
          <OrdersContainer>
            {orders.map((order) => (
              <AdminOrderItem key={order.id} {...order} />
            ))}
          </OrdersContainer>
        ) : (
          ""
        )}
      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return { username: state.auth.username, token: state.auth.token };
};

export default connect(mapStateToProps)(AdminOrders);

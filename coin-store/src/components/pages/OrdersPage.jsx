import React, { Component } from "react";
import { connect } from "react-redux";
import * as fetcher from "../../fetcher";
import { PageContainer, OrdersContainer } from "./OrdersPage_style";
import OrderItem from "../UIComponents/orders/OrderItem";

class OrdersPage extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: [] };
  }

  componentDidMount() {
    const { username, token } = this.props;
    fetcher
      .getOrders(username, token)
      .then((orders) => this.setState({ orders }));
  }

  render() {
    const { token } = this.props;
    const { orders } = this.state;
    return (
      <PageContainer>
        {token ? (
          <OrdersContainer>
            {orders.length > 0 ? (
              orders.map((order) => <OrderItem key={order.id} {...order} />)
            ) : (
              <p style={{ textAlign: "center" }}>
                You have no orders :( Perhaps you'd like to buy something?
              </p>
            )}
          </OrdersContainer>
        ) : (
          <p>Please, log-in to view your orders</p>
        )}
      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return { username: state.auth.username, token: state.auth.token };
};

export default connect(mapStateToProps)(OrdersPage);

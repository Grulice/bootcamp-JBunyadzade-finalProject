import React, { Component } from "react";
import { connect } from "react-redux";
import { removeFromCart, changeCartItem } from "../../../redux/cart/actions";
import { ItemContainer, FinalRow } from "./OrderItem_style";
import * as fetcher from "../../../fetcher";
import OrderItemArticle from "./OrderItemArticle";

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    const { order_contents } = this.props;
    const articles = JSON.parse(order_contents) || [];

    if (articles.length > 0) {
      // get article names by their ids
      const idList = articles.map((item) => item.id);
      fetcher.getMultipleCoinInfo(idList).then((coins) => {
        coins.forEach((coin) => {
          const targetIdx = articles.findIndex(
            (article) => parseInt(article.id) === coin.id
          );

          articles[targetIdx] = { ...articles[targetIdx], name: coin.name };
        });
        this.setState({ articles: articles });
      });
    }
  }

  parseOrder = (orderString) => JSON.parse(orderString);
  getOrderTotal = (articles) =>
    articles.reduce(
      (acc, article) => acc + article.price * article.quantity,
      0
    );

  render() {
    const { id, order_date, shipping_address, status } = this.props;
    const { articles } = this.state;
    return (
      <ItemContainer>
        <div className="order-number-container">#{id}</div>
        <div className="date-container">
          <p>{order_date.substring(0, 10)}</p>
          <p>{order_date.substring(11, 19)}</p>
        </div>
        <div className="order-contents-container">
          <table className="order-contents-table">
            <tbody>
              {articles.map((article, idx) => (
                <OrderItemArticle key={idx} {...article} />
              ))}
              <FinalRow style={{ borderTop: "0.5px solid black" }}>
                <td colSpan="2" style={{ textAlign: "right" }}>
                  Total:{" "}
                </td>
                <td style={{ textAlign: "right" }}>
                  <b>{this.getOrderTotal(articles)} $</b>
                </td>
              </FinalRow>
            </tbody>
          </table>
        </div>
        <div className="ship-addr-container">{shipping_address}</div>
        <div className="status-container">{status}</div>
      </ItemContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = { changeCartItem, removeFromCart };

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);

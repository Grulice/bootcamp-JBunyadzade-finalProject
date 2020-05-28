import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { ButtonPrimary } from "../../../commonElements";
import { ItemContainer, FinalRow } from "./AdminOrderItem_style";
import * as fetcher from "../../../fetcher";
import AdminOrderItemArticle from "./AdminOrderItemArticle";

const selectStatusContents = [
  { value: "Ordered", label: "Ordered" },
  { value: "Packing", label: "Packing" },
  { value: "Shipped", label: "Shipped" },
  { value: "Delivered", label: "Delivered" },
];

class AdminOrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      status: this.props.status,
      updateSuccess: false,
    };

    this.btnTimeoutId = 0;
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

  componentWillUnmount() {
    clearInterval(this.btnTimeoutId);
  }

  handleStatusChange = (selected) => this.setState({ status: selected.value });
  handleSave = () => {
    const { token, id } = this.props;
    const { status } = this.state;
    fetcher.putOrderStatus(token, id, status).then((success) => {
      if (success) {
        this.setState({ updateSuccess: true }, () => {
          this.btnTimeoutId = setTimeout(() => {
            this.setState({ updateSuccess: false });
          }, 2000);
        });
      } else {
        alert("Something went wrong...");
      }
    });
  };

  parseOrder = (orderString) => JSON.parse(orderString);
  getOrderTotal = (articles) =>
    articles.reduce(
      (acc, article) => acc + article.price * article.quantity,
      0
    );

  render() {
    const { id, username, order_date, shipping_address } = this.props;
    const { articles, status, updateSuccess } = this.state;
    return (
      <ItemContainer>
        <div className="order-number-container">#{id}</div>
        <div className="date-container">
          <p>{order_date.substring(0, 10)}</p>
          <p>{order_date.substring(11, 19)}</p>
        </div>
        <div className="ordered-by-container">{username}</div>
        <div className="order-contents-container">
          <table className="order-contents-table">
            <tbody>
              {articles.map((article) => (
                <AdminOrderItemArticle key={article.id} {...article} />
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
        <div className="status-container">
          <Select
            options={selectStatusContents}
            value={selectStatusContents.find(
              (select) => select.value === status
            )}
            onChange={this.handleStatusChange}
          />
        </div>
        <div className="save-btn-container">
          <ButtonPrimary onClick={this.handleSave}>
            {updateSuccess ? "Success!" : "Save"}
          </ButtonPrimary>
        </div>
      </ItemContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return { token: state.auth.token };
};

export default connect(mapStateToProps)(AdminOrderItem);

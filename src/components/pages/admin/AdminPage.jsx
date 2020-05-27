import React, { Component } from "react";
import AdminCoinList from "./AdminCoinList";
import AdminOrders from "./AdminOrders";
import AdminDicts from "./AdminDicts";
import AdminEditCoin from "./AdminEditCoin";
import { Route, Link, withRouter } from "react-router-dom";
import { NavButton } from "../../../commonElements";
import { PageContainer, NavBar } from "./AdminPage_style";

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = { active: "" };
  }

  componentDidMount() {
    this.getActiveTab();
  }

  getActiveTab = () => {
    let curPath = this.props.location.pathname;
    this.setState({ active: curPath.split("/").pop() });
  };

  render() {
    const { active } = this.state;
    return (
      <PageContainer>
        <NavBar>
          <ul>
            <li>
              <Link to="/admin/coinlist">
                <NavButton
                  active={active === "coinlist"}
                  onClick={() => this.setState({ active: "coinlist" })}
                >
                  Coin List
                </NavButton>
              </Link>
            </li>
            <li>
              <Link to="/admin/dicts">
                <NavButton
                  active={active === "dicts"}
                  onClick={() => this.setState({ active: "dicts" })}
                >
                  Dictionaries
                </NavButton>
              </Link>
            </li>
            <li>
              <Link to="/admin/orders">
                <NavButton
                  active={active === "orders"}
                  onClick={() => this.setState({ active: "orders" })}
                >
                  Orders
                </NavButton>
              </Link>
            </li>
          </ul>
        </NavBar>
        <Route path="/admin/coinlist">
          <AdminCoinList />
        </Route>
        <Route path="/admin/dicts">
          <AdminDicts />
        </Route>
        <Route path="/admin/orders">
          <AdminOrders />
        </Route>
        <Route path="/admin/editcoin/:id" component={AdminEditCoin} />
      </PageContainer>
    );
  }
}

export default withRouter(AdminPage);

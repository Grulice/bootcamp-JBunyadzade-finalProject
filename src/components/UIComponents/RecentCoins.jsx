import React, { Component } from "react";
import { connect } from "react-redux";
import * as fetcher from "../../fetcher";
import { Link } from "react-router-dom";
import { ButtonTextSmall } from "../../commonElements";
import {
  IconContainer,
  RecentsBox,
  Wrapper,
  RecentsList,
} from "./RecentCoins_style";

import Clock from "./img/clock.svg";

const SERVER_BASEURL = `http://localhost:3001`;

class RecentCoins extends Component {
  constructor(props) {
    super(props);
    this.state = { showRecents: false, recents: [] };
  }

  componentDidMount() {
    this.getRecents();
  }
  toggleRecents = () => {
    if (!this.state.showRecents) this.getRecents();
    this.setState({ showRecents: !this.state.showRecents });
  };

  getRecents = () => {
    const { username, token } = this.props;
    fetcher.getHistoryViews(username, token).then((result) => {
      this.setState({ recents: result });
    });
  };
  render() {
    const { showRecents, recents } = this.state;
    return (
      <Wrapper>
        <IconContainer onClick={this.toggleRecents}>
          <img src={Clock} alt="" />
        </IconContainer>
        <RecentsBox visible={showRecents}>
          <RecentsList>
            {recents.length > 0
              ? recents.map((item) => (
                  <li key={item.id}>
                    <Link to={`/coin/${item.coin_id}`}>
                      <img
                        src={`/api/image/${item.coin_id}.png`}
                        alt={item.name}
                      />
                      <ButtonTextSmall>{item.name}</ButtonTextSmall>
                    </Link>
                  </li>
                ))
              : "Nothing here yet. Try browsing some coins!"}
          </RecentsList>
        </RecentsBox>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(RecentCoins);

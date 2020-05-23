import React, { Component } from "react";
import { connect } from "react-redux";
import * as fetcher from "../../fetcher";
import {
  PlaqueContainer,
  ImageContainer,
  DescContainer,
  CoinLink,
  CoinDesc,
  EditControls,
  EditButton,
} from "./AdminSearchResultPlaque_style";

const SERVER_BASEURL = "http://localhost:3001";

class AdminSearchResultPlaque extends Component {
  constructor(props) {
    super(props);
    this.state = { deleted: false };
  }

  handleEdit = () => {
    const { redirectCB, coinId } = this.props;
    redirectCB(coinId);
  };
  handleDelete = () => {
    const { coinId, token } = this.props;
    fetcher.deleteCoin(coinId, token).then((success) => {
      if (success) this.setState({ deleted: true });
    });
  };
  render() {
    const { coinId, name, shortDesc } = this.props;
    return (
      <PlaqueContainer removed={this.state.deleted}>
        <ImageContainer>
          <img src={`${SERVER_BASEURL}/image/${coinId}.png`} alt="" />{" "}
        </ImageContainer>
        <DescContainer>
          <CoinLink to={`/coin/${coinId}`}>{name}</CoinLink>
          <CoinDesc>{shortDesc}</CoinDesc>
        </DescContainer>
        <EditControls>
          <EditButton onClick={this.handleEdit}>Edit</EditButton>
          <EditButton onClick={this.handleDelete}>Delete</EditButton>
        </EditControls>
      </PlaqueContainer>
    );
  }
}
const mapStateToProps = (state) => {
  return { token: state.auth.token };
};

export default connect(mapStateToProps)(AdminSearchResultPlaque);

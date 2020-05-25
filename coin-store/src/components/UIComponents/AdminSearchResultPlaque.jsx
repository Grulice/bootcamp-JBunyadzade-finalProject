import React, { Component } from "react";
import { connect } from "react-redux";
import * as fetcher from "../../fetcher";
import { Button, ButtonPrimary } from "../../commonElements";
import {
  PlaqueContainer,
  ImageContainer,
  DescContainer,
  CoinLink,
  CoinDesc,
  EditControls,
  EditButton,
  DeleteModalContainer,
} from "./AdminSearchResultPlaque_style";

import Eye from "./img/seen.webp";

const SERVER_BASEURL = "http://localhost:3001";

class AdminSearchResultPlaque extends Component {
  constructor(props) {
    super(props);
    this.state = { deleted: false, showModal: false };
  }

  handleEdit = () => {
    const { redirectCB, coinId } = this.props;
    redirectCB(coinId);
  };
  handleDelete = () => {
    this.setState({ showModal: true });
  };
  handleHideModal = () => {
    this.setState({ showModal: false });
  };

  deleteCoin = () => {
    const { coinId, token } = this.props;
    fetcher.deleteCoin(coinId, token).then((success) => {
      if (success) this.setState({ deleted: true });
    });
  };

  render() {
    const { coinId, name, shortDesc, views } = this.props;
    const { showModal, deleted } = this.state;
    return (
      <PlaqueContainer removed={deleted} deleteModalActive={showModal}>
        {showModal ? (
          <DeleteModalContainer>
            <div className="elements-container">
              Are you sure?
              <div className="buttons-container">
                <ButtonPrimary onClick={this.deleteCoin}>Yes</ButtonPrimary>
                <Button onClick={this.handleHideModal}>No</Button>
              </div>
            </div>
          </DeleteModalContainer>
        ) : (
          ""
        )}

        <ImageContainer>
          <img src={`${SERVER_BASEURL}/image/${coinId}.png`} alt="" />{" "}
        </ImageContainer>
        <DescContainer>
          <div className="header-container">
            <CoinLink to={`/coin/${coinId}`}>{name}</CoinLink>
            <p className="views-container">
              <img className="eye-icon" src={Eye} alt="" /> {views}
            </p>
          </div>
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
